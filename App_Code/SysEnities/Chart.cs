using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Chart
/// </summary>
public class Chart
{
    private string id;
    public string ID { get { return id; } set { id = value; } }

    private int rowID;
    public int RowID { get { return rowID; } set { rowID = value; } }

    private int columnIndex;
    public int ColumnIndex { get { return columnIndex; } set { columnIndex = value; } }

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

    private string internalID;
    public string InternalID { get { return internalID; } set { internalID = value; } }

    private Series[] series;
    public Series[] Series { get { return series; } set { series = value; } }
}