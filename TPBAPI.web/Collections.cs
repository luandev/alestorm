using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using TMDbLib.Objects.Movies;
using TMDbLib.Objects.Search;
using TPBAPI.web.Models;

namespace TPBAPI
{
    public class Collections
    {
        private static IMongoDatabase _db;
        private static IMongoDatabase db
        {
            get
            {
                if (_db == null)
                    _db = (new MongoClient("mongodb://127.0.0.1:27017/")).GetDatabase("IMDB");

                return _db;
            }
        }

        public static IMongoCollection<Actors> Actors { get => db.GetCollection<Actors>("name.basics"); }
        public static IMongoCollection<Movies> Movies { get => db.GetCollection<Movies>("title.akas"); }
        public static IMongoCollection<SearchTerms> SearchTerms { get => db.GetCollection<SearchTerms>("TMDB.SearchTerms"); }
        public static IMongoCollection<Movie> TMDBMovie { get => db.GetCollection<Movie>("TMDB.Movie"); }
        public static IMongoCollection<SearchMovie> SearchMovie { get => db.GetCollection<SearchMovie>("TMDB.SearchMovie"); }
    }
}

