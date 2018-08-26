using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hangfire;
using Hangfire.Console;
using Hangfire.Mongo;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Redouble.AspNet.Webpack;
using TPBAPI.api;

namespace TPBAPI.web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            /* Hangfire */
            services.AddHangfire(x => {
                x.UseMongoStorage("mongodb://127.0.0.1:27017", "Hangfire");
                x.UseConsole();
            });


            ///* Webpack */
            services.AddWebpack(
                configFile: "FrontConfig/webpack.config.dev.js",    // relative to project directory
                publicPath: "./",                                   // should match output.publicPath in your webpack config
                webRoot: "./wwwroot",                               // relative to project directory
                envParam: null                                      // the 'env' param passed to webpack.config.js,
                                                                    // if not set the current environment name is passed
             );

            services.Configure<CookiePolicyOptions>(options => {
                //options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddMvc();
            services.AddSingleton<IPirateApi, PirateApi>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {


            app.UseHangfireServer();
            app.UseHangfireDashboard();

            app.UseWebpackDevServer();
            app.UseWebpackHotReload();

            RecurringJob.AddOrUpdate(nameof(Biz.IMDB.CreateDB), () => Biz.IMDB.CreateDB(null), Cron.Daily);

            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //    app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
            //        HotModuleReplacement = true,
            //        ReactHotModuleReplacement = true
            //    });
            //}
            //else
            //{
            //    app.UseExceptionHandler("/Home/Error");
            //}

            app.UseStaticFiles();

            // here you can see we make sure it doesn't start with /api, if it does, it'll 404 within .NET if it can't be found
            app.MapWhen(x => !x.Request.Path.Value.StartsWith("/api"), builder => {
                builder.UseMvc(routes => {
                    routes.MapSpaFallbackRoute(
                        name: "spa-fallback",
                        defaults: new { controller = "Home", action = "Index" });
                });
            });

            //app.UseMvc(routes => {
            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller=Home}/{action=Index}/{id?}");

            //    routes.MapSpaFallbackRoute(
            //        name: "spa-fallback",
            //        defaults: new { controller = "Home", action = "Index" });
            //});
        }
    }
}
