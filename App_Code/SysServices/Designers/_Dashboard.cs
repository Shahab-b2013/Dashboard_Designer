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
public class _Dashboard : System.Web.Services.WebService
{
    [WebMethod(EnableSession = true)]
    public string EditDesign()
    {
        int id = Convert.ToInt32(HttpContext.Current.Request.Form["id"]);

        JavaScriptSerializer js = new JavaScriptSerializer();

        Dashboard design = js.Deserialize<Dashboard>(HttpContext.Current.Request.Form["design"]);

       // resp.WriteLine(design);

        StreamWriter sw = File.CreateText(Server.MapPath("/") + "/model.json");

        sw.Write(HttpContext.Current.Request.Form["design"]);
        sw.Close();

        return null;
    }

    public static void CreatePage(int pageId, string pageTemplateId, string name, string label, string type, bool headerVisible, string version, string desc)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Gui_Pages(PageID, PageTemplateID, Type, Name, Label, HeaderVisible, Enabled, Version, Description) VALUES({0}, {1}, N'{2}', N'{3}', N'{4}', N'{5}',1, N'{6}', N'{7}')", pageId, (pageTemplateId != null ? pageTemplateId.ToString() : "NULL"), type, name, label, headerVisible, version, desc));
    }
}

