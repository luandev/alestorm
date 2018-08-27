using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using TMDbLib.Client;
using TMDbLib.Objects.Movies;
using TMDbLib.Objects.Search;
using TPBAPI.api;

namespace TPBAPI.web.Biz
{
    public class BizMovie : IBizMovie
    {
        private static TMDbClient client;
        private readonly IPirateApi Api;
        private readonly ILogger<BizMovie> logger;

        public BizMovie(IConfiguration config, IPirateApi api, ILogger<BizMovie> logger)
        {
            if (client == null)
                client = new TMDbClient(config["TMDB:apiKey"]);

            Api = api;
            this.logger = logger;
        }

        public async Task<IEnumerable<SearchMovie>> search(string query = null)
        {
            logger.LogInformation(nameof(search), $"Searching {query}");
            try {
                if (query != null) {
                    var termSerch = await Collections.SearchTerms.Find(x => x.search == query).FirstOrDefaultAsync();
                    if (termSerch != null) {
                        var filter = BsonDocument.Parse($"{{ _id: {{ $in: [{string.Join(",", termSerch.results)}] }} }}");
                        var dbSearch = await Collections.SearchMovie.Find(filter).Limit(20).ToListAsync();
                        if (dbSearch.Count > 1)
                            return dbSearch;
                    }
                }

                var search = (query == null) ?
                    await client.GetMoviePopularListAsync() :
                    await client.SearchMovieAsync(query, includeAdult: true);

                await Collections.SearchTerms.ReplaceOneAsync(
                    x => x.search == query,
                    new Models.SearchTerms() { search = query, results = search.Results.Select(x => x.Id) },
                    new UpdateOptions() { IsUpsert = true });

                try {
                    await Collections.SearchMovie.InsertManyAsync(search.Results, new InsertManyOptions() { IsOrdered = false });
                }
                catch {
                    // Ignore
                }
                return search.Results;
            }
            catch(Exception ex) {
                logger.LogInformation(nameof(search), ex);
                throw;
            }

        }

        public async Task<Movie> get(int id)
        {
            logger.LogInformation(nameof(search), $"Searching {id}");
            try {
                var db = await Collections.TMDBMovie.Find(x => x.Id == id).FirstOrDefaultAsync();
                if (db != null)
                    return db;

                var movieAPi = await client.GetMovieAsync(id, MovieMethods.Videos | MovieMethods.Recommendations | MovieMethods.Similar);
                await Collections.TMDBMovie.ReplaceOneAsync(x => x.Id == id, movieAPi, new UpdateOptions { IsUpsert = true });
                return movieAPi;
            }
            catch (Exception ex) {
                logger.LogInformation(nameof(search), ex);
                throw;
            }

        }
    }
}
