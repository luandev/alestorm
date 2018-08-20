namespace TPBAPI
{
    public class PirateItem
    {
        public string title { get; private set; }
        public string desc { get; private set; }
        public string link { get; private set; }
        public int? se { get; private set; }
        public int? le { get; private set; }

        public PirateItem(string title, string desc, string link, int? le, int? se)
        {
            this.title = title;
            this.desc = desc;
            this.link = link;
            this.se = se;
            this.le = le;

        }
    }
}
