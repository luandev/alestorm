using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TPBAPI.web.Models
{
    public class Movies: IMongoModel
    {
        public string _id { get; set; }
        public string titleId { get; set; }
        public int? ordering { get; set; }
        public string title { get; set; }
        public string region { get; set; }
        public string language { get; set; }
        public string types { get; set; }
        public string attributes { get; set; }
        public int? isOriginalTitle { get; set; }
    }
}
