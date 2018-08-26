using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TPBAPI.web.Models
{
    public class Actors: IMongoModel
    {
        public string _id { get; set; }
        public string nconst { get; set; }
        public string primaryName { get; set; }
        public string birthYear { get; set; }
        public string deathYear { get; set; }
        public string primaryProfession { get; set; }
        public string knownForTitles { get; set; }
    }
}
