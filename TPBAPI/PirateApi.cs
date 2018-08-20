using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using HtmlAgilityPack;
using RestSharp;

namespace TPBAPI
{
    public class PirateApi : IPirateApi
    {
        private readonly RestClient client;

        public PirateApi(string url = "https://thepiratebay.org")
        {
            client = new RestClient(url);
        }


        public async Task<IEnumerable<PirateItem>> Search(string query, PirateCategory category)
        {
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(await getPage("/s/?q={query}&category={category}&page=0&orderby=99"));

            HtmlNode table = htmlDoc.DocumentNode.SelectSingleNode("//table[@id=\"searchResult\"]");

            return getTorrents(table.SelectNodes("tr"));

            IEnumerable<PirateItem> getTorrents(HtmlNodeCollection tables)
            {
                foreach (HtmlNode row in tables) {

                    string Title = null;
                    string Desc = null;
                    string Link = null;
                    int? Le = null;
                    int? Se = null;

                    try {
                        var tds = row.SelectNodes("td");
                        Link = Regex.Match(row.InnerHtml, "\\\"(magnet\\:\\?.+?)\\\"", RegexOptions.IgnoreCase).Value;
                        Desc = System.Web.HttpUtility.HtmlDecode(GetFloatElements(row, "detDesc", "font").InnerText);
                        Title = System.Web.HttpUtility.HtmlDecode(GetFloatElements(row, "detLink", "a").InnerText);
                        Le = Convert.ToInt32(tds.Last()?.InnerText);
                        Se = Convert.ToInt32(tds.Skip(tds.Count - 2).Take(1).FirstOrDefault()?.InnerText);

                    }
                    catch (Exception) {

                    }

                    if (Title != null && Link != null)
                        yield return new PirateItem(Title, Desc, Link, Le, Se);

                }
            }

            async Task<string> getPage(string url, int trys = 0)
            {
                var request = new RestRequest(url, Method.GET);
                request.AddUrlSegment("query", query);
                request.AddUrlSegment("query", 201);

                IRestResponse response = await client.ExecuteGetTaskAsync(request).ConfigureAwait(false);
                var content = response.Content;

                if (content.Contains("Database maintenance, please check back in 10 minutes. 13")) {
                    await Task.Delay(1000).ConfigureAwait(false);
                    if (trys < 4) {
                        return await getPage(url, trys++).ConfigureAwait(false);
                    }
                }
                else {
                    return content;
                }

                return null;
            }
        }

        private static HtmlNode GetFloatElements(HtmlNode doc, string _class, string el = "div")
        {

            return doc
                .Descendants()
                .Where(n => n.NodeType == HtmlNodeType.Element)
                .FirstOrDefault(e =>
                    e.Name == el &&
                        e.Attributes.Any(a =>
                            a.Name.ToLower().Trim() == "class" &&
                            a.Value == _class));
        }
    }
}
