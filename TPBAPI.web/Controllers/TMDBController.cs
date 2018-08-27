using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using TMDbLib.Client;
using TMDbLib.Objects.Movies;
using TMDbLib.Objects.Search;
using TPBAPI.web.Biz;

namespace TPBAPI.web.Controllers
{
    [Route("api/[controller]")]
    public class TMDBController : Controller
    {
        private readonly IMemoryCache memoryCache;
        private readonly IBizMovie bizMovie;

        public TMDBController(IMemoryCache memoryCache, IBizMovie bizMovie)
        {
            this.memoryCache = memoryCache;
            this.bizMovie = bizMovie;
        }

        [HttpPost]
        public async Task<IEnumerable<SearchMovie>> search(string query = null) =>
            await memoryCache.GetOrCreateAsync(nameof(search) + query, x => bizMovie.search(query));


        //[HttpGet("[action]")]
        //public async Task<Movie> getMovie(int id)
        //{
        //    return await client.GetMovieAsync(id);
        //}

        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}