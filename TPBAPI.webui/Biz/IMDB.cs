using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using TPBAPI.webui.Models;

namespace TPBAPI.webui.Biz
{
    public class IMDB
    {
        public async static Task CreateDB()
        {
            var _base = AppDomain.CurrentDomain.BaseDirectory + "downloads/" + DateTime.Now.ToString("ddMMyy");
            var actors = _base + "/name.basics.tsv.gz";
            var movies = _base + "/title.akas.tsv.gz";

            await Task.WhenAll(new Task[] {
                Task.Run(async () => await getDownload<Movies>("https://datasets.imdbws.com/title.akas.tsv.gz", movies) ),
                Task.Run(async () => await getDownload<Actors>("https://datasets.imdbws.com/name.basics.tsv.gz", actors) )
            });

            async Task getDownload<T>(string url, string path)
            {

                var bag = new ConcurrentQueue<Task>();
                if (!File.Exists(path)) {

                    Directory.CreateDirectory(_base);

                    using (var wc = new System.Net.WebClient())
                        wc.DownloadFile(url, path);
                }

                var file = Decompress(path);


                using (StreamReader sr = new StreamReader(file)) {
                    var header = sr.ReadLine()?.Replace("\\N", "").Split("\t") ?? new string[] { };
                    while (sr.Peek() >= 0) {
                        try {
                            var l = sr.ReadLine();
                            var props = l.Replace("\\N", "").Split("\t");

                            var obj = $"{{ {string.Join(", ", header.Select((h, i) => $"{h}: \"{ props[i]}\""))} }}";
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
                            Console.WriteLine(e);
                        }
                    }
                }

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

        //private static void DoAndInsert<T>(string[] props, T obj, IMongoCollection<T> col)
        //{
        //    try {
        //        int c = 0;
        //        typeof(T).GetProperties().ToList().ForEach(x => {
        //            if (x.Name != "_id") {
        //                x.SetValue(obj, convert(props[c], x.PropertyType));
        //                c++;
        //            }
        //            else {
        //                x.SetValue(obj, new BsonObjectId(ObjectId.GenerateNewId()).ToString());

        //            }

        //        });

        //        col.InsertOne(obj);
        //        //col.ReplaceOne(BsonDocument.Parse($"{{ $or: [ {{ \"titleId\": \"{props[0]}\" }}, {{ \"nconst\": \"{props[0]}\" }} ] }}"), obj, new UpdateOptions() { IsUpsert = true });

        //    }
        //    catch (Exception E) {
        //        Console.WriteLine($"Error deserializing: {string.Join(", ", props)}");
        //    }

        //    object convert(string input, Type Tout)
        //    {
        //        try {
        //            return Convert.ChangeType(input, Tout);
        //        }
        //        catch {
        //            return null;
        //        }

        //    }
        //}


    }
}
