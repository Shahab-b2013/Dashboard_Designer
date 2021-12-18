// Code File(Amnpardaz Software Co. Copyright 2021 - All Right Reserved)
// Release Ferdos.WebAppDesk 3.0.0.0
using System;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using System.IO;

[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[ScriptService]
public class Dashboard : System.Web.Services.WebService
{
    [WebMethod(EnableSession = true)]
    public string EditDesign()
    {
        int id = Convert.ToInt32(HttpContext.Current.Request.Form["id"]);

        JavaScriptSerializer js = new JavaScriptSerializer();

        // activiyParams = js.Deserialize<ActivityParam[]>(HttpContext.Current.Request.Form["design"]);



        StreamWriter sw = File.CreateText(Server.MapPath("/") + "/model.json");

        sw.Write(HttpContext.Current.Request.Form["design"]);
        sw.Close();

        return null;
    }
}

