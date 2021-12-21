using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for RowBox
/// </summary>
public class RowBox
{
    private int rowID;
    public int RowID { get { return rowID; } set { rowID = value; } }

    private string internalID;
    public string InternalID { get { return internalID; } set { internalID = value; } }

    private int rowIndex;
    public int RowIndex { get { return rowIndex; } set { rowIndex = value; } }

    private string rowDisplayMode;
    public string RowDisplayMode { get { return rowDisplayMode; } set { rowDisplayMode = value; } }

    private string columnLayout;
    public string ColumnLayout { get { return columnLayout; } set { columnLayout = value; } }

    private string columnWidth;
    public string ColumnWidth { get { return columnWidth; } set { columnWidth = value; } }

}