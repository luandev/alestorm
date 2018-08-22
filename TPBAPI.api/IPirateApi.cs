using System.Collections.Generic;
using System.Threading.Tasks;

namespace TPBAPI.api
{
    public interface IPirateApi
    {
        Task<IEnumerable<PirateItem>> Search(string query, PirateCategory? category);
    }
}