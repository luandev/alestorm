using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace TPBAPI.webui.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["StaticCSS"] = getMain("css");
            ViewData["StaticJS"] = getMain("js");

            return View();
        }

        public IActionResult Error()
        {
            ViewData["StaticCSS"] = getMain("css");
            ViewData["StaticJS"] = getMain("js");

            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        private string getMain(string type)
        {
            var file = (new DirectoryInfo("./wwwroot/static/")).GetFiles($"main*.{type}", SearchOption.AllDirectories).FirstOrDefault();
            return $"/static/{type}/{file.Name}";
        }
    }
}
