using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Hangfire.Console;
using Hangfire.Server;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using TPBAPI.webui.Models;

namespace TPBAPI.webui.Biz
{
    public class IMDB
    {
        public async static Task CreateDB(PerformContext context)
        {
            var total = 0;
            var done = 0;
            var progress = context.WriteProgressBar();
            var _baseSys = AppDomain.CurrentDomain.BaseDirectory + "downloads/";
            var _base    = _baseSys + DateTime.Now.ToString("ddMMyy");

            var actors = _base + "/name.basics.tsv.gz";
            var movies = _base + "/title.akas.tsv.gz";

            await Task.WhenAll(new Task[] {
                Task.Run(async () => await getDownload<Movies>("https://datasets.imdbws.com/title.akas.tsv.gz", movies, nameof(Movies)) ),
                Task.Run(async () => await getDownload<Actors>("https://datasets.imdbws.com/name.basics.tsv.gz", actors, nameof(Actors)) )
            });

           
            async Task getDownload<T>(string url, string path, string id)
            {
                log("Preparing folder");
                Directory.CreateDirectory(_base);

                foreach (var x in Directory.GetDirectories(_baseSys).Where(x => x != _base))
                    Directory.Delete(x, true);


                log("Cheking files");
                if (!isGoodDownload(url, path)) {

                    log("Dowloading...");
                    using (var wc = new System.Net.WebClient())
                        wc.DownloadFile(url, path);
                    log("Done");

                }

                log("Deompressing");
                var decompressed = Decompress(path);

                log("Counting lines");
                total += countLines(decompressed);

                using (StreamReader sr = new StreamReader(decompressed)) {
                    var header = sr.ReadLine()?.Replace("\\N", "").Split("\t") ?? new string[] { };

                    log("Start DB insertions (this can take some time!)");
                    while (sr.Peek() >= 0) {
                        var l = sr.ReadLine();
                        try {
                            var props = l.Replace("\\N", "").Split("\t");

                            var obj = $"{{ {string.Join(", ", header.Select((h, i) => $"{h}: \"{ Regex.Escape(props[i]) }\""))} }}";
                            var tObj = JsonConvert.DeserializeObject<T>(obj);


                            switch (typeof(T).Name) {
                                case nameof(Movies):
                                    var m = tObj as Movies;
                                    m._id = m.ordering + m.titleId;
                                    await Collections.Movies.ReplaceOneAsync(x => x._id == m._id, m, new UpdateOptions() { IsUpsert = true });

                                    break;
                                case nameof(Actors):
                                    var a = tObj as Actors;
                                    a._id = a.nconst + a.birthYear;
                                    await Collections.Actors.ReplaceOneAsync(x => x.nconst == a.nconst, a, new UpdateOptions() { IsUpsert = true });
                                    break;
                            }
                        }
                        catch (Exception e) {
                            error(l+Environment.NewLine+e.Message);
                        }
                        finally {
                            Interlocked.Increment(ref done);
                            progressbar();
                        }
                    }
                }

                File.Delete(decompressed);




                void error(string err)
                {
                    context.SetTextColor(ConsoleTextColor.Red);
                    context.WriteLine(id + err);
                    context.ResetTextColor();
                }

                void log(string msg)
                {
                    context.SetTextColor(ConsoleTextColor.White);
                    context.WriteLine(id + " - " + msg);
                    context.ResetTextColor();
                }

                
                void progressbar()
                {
                    progress.SetValue(done * 100 / total);
                }
            }


        }

        private static int countLines(string decompressed)
        {
            var counter = 0;
            using (var file = new StreamReader(decompressed)) {
                while (file.ReadLine() != null) {
                    counter++;
                }
            }

            return counter;
        }

        private static bool isGoodDownload(string url, string path)
        {
            if (!File.Exists(path))
                return false;

            using (var client = new WebClient()) {
                client.OpenRead(url);
                var total = Convert.ToInt64(client.ResponseHeaders["Content-Length"]);

                return total == new FileInfo(path).Length;
            }

        }

        public static string Decompress(string path)
        {
            var fileToDecompress = new FileInfo(path);
            string currentFileName = fileToDecompress.FullName;
            string newFileName = currentFileName.Remove(currentFileName.Length - fileToDecompress.Extension.Length);

            if (!File.Exists(newFileName)) {

                using (FileStream originalFileStream = fileToDecompress.OpenRead()) {


                    using (FileStream decompressedFileStream = File.Create(newFileName)) {
                        using (GZipStream decompressionStream = new GZipStream(originalFileStream, CompressionMode.Decompress)) {
                            decompressionStream.CopyTo(decompressedFileStream);
                            Console.WriteLine("Decompressed: {0}", fileToDecompress.Name);
                        }
                    }
                }
            }

            return newFileName;
        }
    }
}
