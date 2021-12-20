using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


/// <summary>
/// Summary description for Dashborad
/// </summary>

internal class Dashboard
{

    private int dashboardID;
    public int DashboardID { get { return dashboardID; } set { dashboardID = value; } }

    private string name;
    public string Name { get { return name; } set { name = value; } }

    private bool itemsGrouping;
    public bool ItemsGrouping { get { return itemsGrouping; } set { itemsGrouping = value; } }

    private string pageTemplateId;
    public string PageTemplateId { get { return pageTemplateId; } set { pageTemplateId = value; } }

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

    private Charts[] charts;
    public Charts[] Charts { get { return charts; } set { charts = value; } }

    private string sqlFilters;
    public string SqlFilters { get { return sqlFilters; } set { sqlFilters = value; } }

    private AccessRoles[] accessRoles;
    public AccessRoles[] AccessRoles { get { return accessRoles; } set { accessRoles = value; } }

    private AccessGroups[] accessGroups;
    public AccessGroups[] AccessGroups { get { return accessGroups; } set { accessGroups = value; } }


}

internal class AccessGroups
{
    private int id;
    public int ID { get { return id; } set { id = value; } }

    private string label;
    public string Label { get { return label; } set { label = value; } }


}

internal class AccessRoles
{
    private int id;
    public int ID { get { return id; } set { id = value; } }

    private string label;
    public string Label { get { return label; } set { label = value; } }

}

internal class Charts
{
    private int rowID;
    public int RowID { get { return rowID; } set { rowID = value; } }

    private int columnIndex;
    public int ColumnIndex { get { return columnIndex; } set { columnIndex = value; } }

    private string iD;
    public string ID { get { return iD; } set { iD = value; } }

    private string name;
    public string Name { get { return name; } set { name = value; } }

    private string text;
    public string Text { get { return text; } set { text = value; } }

    private string type;
    public string Type { get { return type; } set { type = value; } }

    private string categoryLabel;
    public string CategoryLabel { get { return categoryLabel; } set { categoryLabel = value; } }

    private string valueLabel;
    public string ValueLabel { get { return valueLabel; } set { valueLabel = value; } }

    private string categoryName;
    public string CategoryName { get { return categoryName; } set { categoryName = value; } }

    private string categoryExpressionwID;
    public string CategoryExpressionwID { get { return categoryExpressionwID; } set { categoryExpressionwID = value; } }

    private string seriesType;
    public string SeriesType { get { return seriesType; } set { seriesType = value; } }

    private string version;
    public string Version { get { return version; } set { version = value; } }


    private Series[] series;
    public Series[] Series { get { return series; } set { series = value; } }


}

internal class Series
{
    private string text;
    public string Text { get { return text; } set { text = value; } }

    private string name;
    public string Name { get { return name; } set { name = value; } }

    private string dataExpression;
    public string DataExpression { get { return dataExpression; } set { dataExpression = value; } }

    private string plotType;
    public string PlotType { get { return plotType; } set { plotType = value; } }

    private string styleColor;
    public string StyleColor { get { return styleColor; } set { styleColor = value; } }

}

internal class RowBox
{
    private int rowID;
    public int RowID { get { return rowID; } set { rowID = value; } }

    private int internalID;
    public int InternalID { get { return internalID; } set { internalID = value; } }

    
    private int rowIndex;
    public int RowIndex { get { return rowIndex; } set { rowIndex = value; } }

    private string rowDisplayMode;
    public string RowDisplayMode { get { return rowDisplayMode; } set { rowDisplayMode = value; } }

    private string columnLayout;
    public string ColumnLayout { get { return columnLayout; } set { columnLayout = value; } }

    private string columnWidth;
    public string ColumnWidth { get { return columnWidth; } set { columnWidth = value; } }

}





