using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace TPBAPI.web.Models
{
    public class SearchTerms
    {
        [BsonId]
        public string search { get; set; }
        public IEnumerable<int> results { get; set; }
    }
}
