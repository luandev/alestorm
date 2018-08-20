using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TPBAPI;

namespace TPBAPIView
{
    class Program
    {
        static void Main(string[] args)
        {
            var movies = new List<string>() {
 

            };
            PirateApi api = new PirateApi();

            movies.ForEach(x => doIt(x));


            void doIt(string x)
            {
                try {
                    var links = api.Search(x, PirateCategory.Video_HDMovies).Result.ToList();
                    var better = links.OrderByDescending(z => z.se).FirstOrDefault();
                    File.AppendAllText("C:\\Users\\Luan\\Desktop\\movie.txt", $"add -p /pirate/Movies {better.link.Replace('"', ' ')} &&" );
                }
                catch {
                    doIt(x);
                }
            }

            
            
        }
    }
}
