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
        try
        {

            //JSON Serializer
            int id = Convert.ToInt32(HttpContext.Current.Request.Form["id"]);
            JavaScriptSerializer js = new JavaScriptSerializer();
            Dashboard design = js.Deserialize<Dashboard>(HttpContext.Current.Request.Form["design"]);
            StreamWriter sw = File.CreateText(Server.MapPath("/") + "/model.json");
            sw.Write(HttpContext.Current.Request.Form["design"]);
            sw.Close();

            //SET ACTIVITYID
            int activityID = (design.ModuleID * 100) + 50;

            //CLEAR TABLES
            ClearTables(activityID, design.Charts);

            //CREATE PAGE
            CreatePage(design.DashboardID, design.PageTemplateID, design.Name, design.Label, design.Type, design.HeaderVisible, design.Version, design.Desc);

            //CREATE PAGE CONTEXT
            CreatePageContext(design.DashboardID, "@TabContext", 10000000, "GadgetView", design.Version);

            //CREATE PAGE ACCESS
            CreatePageAccess(design.DashboardID, design.AccessID, design.Version);

            //CREATE PAGE NAVIGATIONS
            int Nav = 1000;
            for (int i = 0; i < 5; i++) CreatePageNavigations(design.DashboardID, Nav++, design.Version);

            //CREATE ROWS
            for (int i = 0; i < design.RowBoxs.Length; i++)
            {

                //INTERNALID GENERATOR
                design.RowBoxs[i].InternalID = design.DashboardID.ToString() + design.RowBoxs[i].RowIndex.ToString();
                RowBox row = design.RowBoxs[i];
                CreatePageElement(row.InternalID, design.DashboardID, "0", null, "Row", null, false, false, null, false, design.Version);


                string style = "";
                switch (design.RowBoxs[i].ColumnLayout)
                {
                    case "OnceColumn":
                        style = "col-md-12";
                        break;
                    case "TwoColumn":
                        style = "col-md-6"; ;
                        break;
                    case "ThreeColumn":
                        style = "col-md-4"; ;
                        break;
                }


                foreach (Chart chart in design.Charts)
                {
                    if (chart.RowID == row.RowID)
                    {
                        chart.InternalID = row.InternalID + chart.ColumnIndex.ToString();

                        //CREATE CHARTS
                        CreatePageElement(chart.InternalID, design.DashboardID, row.InternalID, null, "Cell", style, false, false, null, false, design.Version);

                        //CREATE ACTIVITY
                        CreateActivity(activityID.ToString(), design.ModuleID, chart.Name, chart.Text, design.Version, null, design.EntityID,chart.CommandText, "SelectQuery", "عملیات با موفقیت انجام شد.", "عملیات با خطا مواجهه شد.", null, null, 100, "DataList");

                        //CREATE ACTIVITY CONTEXT
                        CreateActivityContext(activityID, chart.Name, chart.Text, "ChartView", null, design.Version, null);

                        //CREATE ACTIVITY BOX
                        CreatePageElement(chart.InternalID + "0", design.DashboardID, chart.InternalID, activityID.ToString(), "ActivityBox", "solid", false, false, null, false, design.Version);

                        //CREATE ACCESS ACTIVITIES
                        CreateAccessActivities(design.AccessID, activityID, design.Version);

                        //CHART VIEWS
                        CreateChartViews(activityID, activityID, chart.Type, chart.Text, "", chart.CategoryLabel, chart.ValueLabel, chart.CategoryName, chart.CategoryExpression, "simple", "", "", 0, 0, "");

                        //CHART Series
                        foreach (var series in chart.Series)
                            CreateChartSeries(Int32.Parse((activityID.ToString()) + "0"), activityID, series.Name, series.Text, series.DataExpression, 0, series.PlotType, series.StyleColor, 1, chart.Version, "", "", null, null);

                        activityID++;
                    }

                }
            }

            //ACCESS ROLES
            for (int i = 0; i < design.AccessRoles.Length; i++)
            {
                Create_UserRole_Accesses(design.AccessRoles[i].ID, design.AccessID, "All", "NULL");
            }

            //ACCESS GROUPS
            for (int i = 0; i < design.AccessGroups.Length; i++)
            {
                Create_UserGroup_Accessess(design.AccessGroups[i].ID, design.AccessID, "All", "NULL");
            }

        }
        catch (Exception e)
        {
            StreamWriter x = File.CreateText(Server.MapPath("/") + "/err.txt");
            x.Write(e.Message);
            x.Close();

        }

        return null;
    }



    public static void ClearTables(int activityID, Array charts)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("DELETE FROM Sys_Gui_ChartSeries WHERE ChartID = 1501050;" +
            "DELETE FROM Sys_Gui_ChartSeries WHERE ChartID = 1501051;" +
            "DELETE FROM Sys_Gui_ChartSeries WHERE ChartID = 1501052;" +
            "DELETE FROM Sys_Gui_ChartSeries WHERE ChartID = 1501053;" +
            "DELETE FROM Sys_Gui_ChartSeries WHERE ChartID = 1501054;" +
             "DELETE FROM Sys_Gui_ChartSeries WHERE ChartID = 1501055;" +
              "DELETE FROM Sys_Gui_ChartSeries WHERE ChartID = 1501056;" +
               "DELETE FROM Sys_Gui_ChartSeries WHERE ChartID = 1501057;" +
                "DELETE FROM Sys_Gui_ChartSeries WHERE ChartID = 1501058;" +

            "DELETE FROM Sys_Gui_ChartViews WHERE ChartID = 1501050;" +
            "DELETE FROM Sys_Gui_ChartViews WHERE ChartID = 1501051;" +
            "DELETE FROM Sys_Gui_ChartViews WHERE ChartID = 1501052;" +
            "DELETE FROM Sys_Gui_ChartViews WHERE ChartID = 1501053;" +
            "DELETE FROM Sys_Gui_ChartViews WHERE ChartID = 1501054;" +
             "DELETE FROM Sys_Gui_ChartViews WHERE ChartID = 1501055;" +
              "DELETE FROM Sys_Gui_ChartViews WHERE ChartID = 1501056;" +
               "DELETE FROM Sys_Gui_ChartViews WHERE ChartID = 1501057;" +
                "DELETE FROM Sys_Gui_ChartViews WHERE ChartID = 1501058;" +

                "DELETE FROM Sys_UserRole_Accesses WHERE AccessID=150101" +
                "DELETE FROM Sys_UserGroup_Accesses WHERE AccessID=150101" +

            "DELETE FROM Sys_Gui_PageLayouts WHERE PageID = 1000010;" +
            "DELETE FROM Sys_Dev_Activities WHERE ActivityID in (select ActivityID FROM[Sys_Activities] WHERE ModuleID = 15010);" +
            "DELETE FROM Sys_Gui_Page_Accesses WHERE PageID = 1000010;" +
            "DELETE FROM Sys_Access_Activities WHERE AccessID = 150101;" +
            "DELETE FROM dbo.Sys_Access_Activities WHERE ActivityID in (select ActivityID FROM[Sys_Activities] WHERE ModuleID = 15010);" +
            "DELETE FROM Sys_Gui_ActivityContexts WHERE ActivityID in (select ActivityID FROM[Sys_Activities] WHERE ModuleID = 15010) ;" +
            "DELETE FROM Sys_Gui_Page_Contexts WHERE PageID = 1000010;" +
            "DELETE FROM Sys_Gui_Page_Navigations WHERE PageID = 1000010;" +
            "DELETE FROM Sys_Activities WHERE ModuleID = 15010;" +
            "DELETE FROM Sys_Gui_Pages WHERE PageID = 1000010;"
                     ));

    }

    public static void CreatePage(int pageId, string PageTemplateID, string name, string label, string type, bool headerVisible, string version, string desc)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Gui_Pages(PageID, PageTemplateID, Type, Name, Label, HeaderVisible, Enabled, Version, Description) VALUES({0}, {1}, N'{2}', N'{3}', N'{4}', N'{5}',1, N'{6}', N'{7}')", pageId, (PageTemplateID != null ? PageTemplateID.ToString() : "NULL"), type, name, label, headerVisible, version, desc));
    }

    public static void CreatePageElement(string elementId, int pageId, string parentElementId, string activityContextId, string type, string style, bool headerVisible, bool footerVisible, string defaultVisibility, bool hasRenderCondition, string version)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Gui_PageLayouts(ElementID, PageID, ParentElementID, ActivityContextID, Type, Style, HeaderVisible, FooterVisible, DefaultVisibility, HasRenderCondition, Enabled, Version) VALUES({0}, {1}, {2}, {3}, '{4}', {5}, '{6}', '{7}', '{8}','{9}', 1, '{10}')", elementId, pageId, parentElementId == "0" ? "NULL" : parentElementId.ToString(), (activityContextId != null ? activityContextId : "NULL"), type, (style != null ? "'" + style + "'" : "NULL"), headerVisible, footerVisible, defaultVisibility, hasRenderCondition, version));

    }

    public static int CreateActivity(string activityId, int moduleId, string name, string label, string version, string desc,
                                     int entityId, string commandText, string commandType, string successedMessage, string failedMessage, string alertMessage, string complexityTags,
                                     int maxRowAffected, string dataTypeAffected)
    {

        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Activities(ActivityID, ModuleID, Name, Label, Enabled, Version, Description) VALUES({0}, {1}, N'{2}', N'{3}', 1, N'{4}', N'{5}')", activityId, moduleId, name.Replace(" ", "_"), label, version, desc));

        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Dev_Activities(ActivityID, EntityID, CommandText, CommandType, SuccessedMessage, FailedMessage, AlertMessage, ComplexityTags, MaxRowAffected, DataTypeAffected, IsAsynchronous) VALUES({0}, {1}, N'{2}', N'{3}', N'{4}', N'{5}', N'{6}', N'{7}', N'{8}', N'{9}', N'{10}')", activityId, (entityId == 0 ? "NULL" : entityId.ToString()), commandText, commandType, successedMessage, failedMessage, alertMessage, complexityTags, maxRowAffected, dataTypeAffected, 0));

        return Convert.ToInt32(activityId);
    }

    public static void CreateActivityContext(int id, string name, string label, string contextType, string icon, string version, string desc)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Gui_ActivityContexts(ActivityContextID, ActivityID, ContextType, Name, Label, Icon, Enabled, Version, Description) VALUES({0}, {1}, N'{2}', N'{3}', N'{4}', N'{5}',1, N'{6}', N'{7}')", id, (id.ToString().Length > 7 ? "NULL" : id.ToString()), contextType, name, label, icon, version, desc));
    }

    public static void CreatePageContext(int pageID, string contextTemplateName, int contextID, string contextTemplateType, string version)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Gui_Page_Contexts(PageID,ContextTemplateName,ContextID,ContextTemplateType,Version) VALUES({0}, N'{1}', {2}, N'{3}', N'{4}')", pageID, contextTemplateName, contextID, contextTemplateType, version));
    }

    public static void CreatePageAccess(int pageID, int AccessID, string version)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Gui_Page_Accesses(pageID,AccessID,version) VALUES({0},{1},N'{2}')", pageID, AccessID, version));
    }

    public static void CreateAccessActivities(int AccessID, int ActivityID, string version)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Access_Activities(AccessID,ActivityID,version) VALUES({0},{1},N'{2}')", AccessID, ActivityID, version));
    }

    public static void CreatePageNavigations(int pageID, int NavigationID, string version)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Gui_Page_Navigations(pageID,NavigationID,version) VALUES({0},{1},N'{2}')", pageID, NavigationID, version));
    }

    public static void CreateChartViews(int ChartID, int ActivityContextID, string ChartType, string Title, string SubTitle, string CategoryLabel, string ValueLabel, string CategoryName, string CategoryExpression, string SeriesType, string GroupingExpression, string TimePrioiedType, int TimePrioiedStart, int TimePrioiedDuration, string TimePrioiedSeriesFormat)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Gui_ChartViews(ChartID,ActivityContextID,ChartType,Title,SubTitle,CategoryLabel,ValueLabel,CategoryName,CategoryExpression,SeriesType,GroupingExpression,TimePrioiedType,TimePrioiedStart,TimePrioiedDuration,TimePrioiedSeriesFormat) VALUES({0},{1},N'{2}',N'{3}',N'{4}',N'{5}',N'{6}',N'{7}',N'{8}',N'{9}',N'{10}',N'{11}',{12},{13},N'{14}')", ChartID, ActivityContextID, ChartType, Title, SubTitle, CategoryLabel, ValueLabel, CategoryName, CategoryExpression, SeriesType, GroupingExpression, TimePrioiedType, TimePrioiedStart, TimePrioiedDuration, TimePrioiedSeriesFormat));
    }

    public static void CreateChartSeries(int ChartSeriesID, int ChartID, string Name, string Label, string DataExpression, int SeriesIndex, string PlotType, string StyleColor, int Enabled, string Version, string Description, string ActionOnClick, string LanchedContextID, string LanchedPageID)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_Gui_ChartSeries(ChartSeriesID,ChartID,Name,Label,DataExpression,SeriesIndex,PlotType,StyleColor,Enabled,Version,Description,ActionOnClick,LanchedContextID,LanchedPageID) VALUES({0},{1},N'{2}',N'{3}',N'{4}',N'{5}',N'{6}',N'{7}',{8},N'{9}',N'{10}',N'{11}',{12},{13})", ChartSeriesID, ChartID, Name, Label, DataExpression, SeriesIndex, PlotType, StyleColor, Enabled, Version, Description, ActionOnClick, (LanchedPageID == null ? "NULL" : LanchedContextID), (LanchedPageID == null ? "NULL" : LanchedPageID)));
    }

    public static void Create_UserRole_Accesses(int UserRoleID, int AccessID, string AccessRuleCriteria, string ActivityParamName)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_UserRole_Accesses(UserRoleID,AccessID,AccessRuleCriteria,ActivityParamName) VALUES({0},{1},N'{2}',N'{3}')", UserRoleID, AccessID, AccessRuleCriteria, ActivityParamName));
    }

    public static void Create_UserGroup_Accessess(int UserGroupID, int AccessID, string AccessRuleCriteria, string ActivityParamName)
    {
        SqlDataProvider.ExecuteNoneQuery(string.Format("INSERT INTO Sys_UserGroup_Accesses(UserGroupID,AccessID,AccessRuleCriteria,ActivityParamName) VALUES({0},{1},N'{2}',N'{3}')", UserGroupID, AccessID, AccessRuleCriteria, ActivityParamName));
    }
}

