using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Series
/// </summary>
public class Series
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