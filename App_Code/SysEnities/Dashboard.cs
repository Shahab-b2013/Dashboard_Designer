using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


public class Dashboard
{

    private int dashboardID;
    public int DashboardID { get { return dashboardID; } set { dashboardID = value; } }

    private int moduleID;
    public int ModuleID { get { return moduleID; } set { moduleID = value; } }

    private int entityID;
    public int EntityID { get { return entityID; } set { entityID = value; } }

    private string name;
    public string Name { get { return name; } set { name = value; } }

    private bool itemsGrouping;
    public bool ItemsGrouping { get { return itemsGrouping; } set { itemsGrouping = value; } }

    private string pageTemplateID;
    public string PageTemplateID { get { return pageTemplateID; } set { pageTemplateID = value; } }

    private string label;
    public string Label { get { return label; } set { label = value; } }

    private string type;
    public string Type { get { return type; } set { type = value; } }

    private bool headerVisible;
    public bool HeaderVisible { get { return headerVisible; } set { headerVisible = value; } }

    private string version;
    public string Version { get { return version; } set { version = value; } }

    private string desc;
    public string Desc { get { return desc; } set { desc = value; } }

    private RowBox[] rowBoxs;
    public RowBox[] RowBoxs { get { return rowBoxs; } set { rowBoxs = value; } }

    private Chart[] charts;
    public Chart[] Charts { get { return charts; } set { charts = value; } }

    private string sqlFilters;
    public string SqlFilters { get { return sqlFilters; } set { sqlFilters = value; } }

    private AccessRoles[] accessRoles;
    public AccessRoles[] AccessRoles { get { return accessRoles; } set { accessRoles = value; } }

    private AccessGroups[] accessGroups;
    public AccessGroups[] AccessGroups { get { return accessGroups; } set { accessGroups = value; } }

}







