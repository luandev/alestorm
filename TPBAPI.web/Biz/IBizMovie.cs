using System.Collections.Generic;
using System.Threading.Tasks;
using TMDbLib.Objects.Movies;
using TMDbLib.Objects.Search;

namespace TPBAPI.web.Biz
{
    public interface IBizMovie
    {
        Task<Movie> get(int id);
        Task<IEnumerable<SearchMovie>> search(string query = null);
    }
}