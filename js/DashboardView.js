"use strict";

function DashboardView(_json) {
  var _chartGroup = _json;
  var content;
  var bodyID = "#geContent";

  //#region Render Form Items Layout & Grouping

  $.each(_chartGroup.rowBoxs, function (index, chartGroup) {
    content =
      '<div style="' +
      (chartGroup.Visibility == "DefaultHidden" ? "display:none" : "") +
      '" id="form-group-' +
      chartGroup.rowID +
      '" class="row form-group-box " rowIndex="' +
      chartGroup.rowIndex +
      '" ondragleave="onMouseOut(event)">';
    var columnWidth = chartGroup.ColumnWidth;
    if (chartGroup.columnLayout == "OnceColumn") {
      if (columnWidth == "default") {
        columnWidth = "col-lg-12";
      }
      content +=
        '<div class="' +
        columnWidth +
        ' col-sm-12 col-xs-12 form-group-body" ondrop="drop(event)" ondragover="allowDrop(event)" columnIndex="0" id="form-group-body-' +
        chartGroup.rowID +
        '-0" ></div>';
    }

    if (chartGroup.columnLayout == "TwoColumn") {
      columnWidth = "col-md-6";

      content +=
        '<div class="' +
        columnWidth +
        " form-group-body" +
        '"' +
        'ondrop="drop(event)" ondragover="allowDrop(event)"' +
        ' columnIndex="0" id="form-group-body-' +
        chartGroup.rowID +
        '-0"></div><div class="' +
        columnWidth +
        " form-group-body" +
        '"' +
        'ondrop="drop(event)" columnIndex="1" ondragover="allowDrop(event)"' +
        ' id="form-group-body-' +
        chartGroup.rowID +
        '-1" ></div>';
    }

    if (chartGroup.columnLayout == "ThreeColumn") {
      if (chartGroup.groupDisplayMode == "GroupWithBox") {
        columnWidth = "col-md-4";
      } else {
        columnWidth = "col-md-4";
      }

      content +=
        '<div class="' +
        columnWidth +
        " form-group-body" +
        '"ondrop="drop(event)" ondragover="allowDrop(event)" columnIndex="0" id="form-group-body-' +
        chartGroup.rowID +
        '-0" ></div><div class="' +
        columnWidth +
        " form-group-body" +
        '"ondrop="drop(event)" ondragover="allowDrop(event)" columnIndex="1" id="form-group-body-' +
        chartGroup.rowID +
        '-1" > </div><div class="' +
        columnWidth +
        " form-group-body" +
        '"ondrop="drop(event)" ondragover="allowDrop(event)" columnIndex="2" id="form-group-body-' +
        chartGroup.rowID +
        '-2" ></div>';
    }

    //btn json default
    content += Group_Btn(chartGroup.rowID);

    content += "</div>";

    $(bodyID).append(content);
  });

  //#endregion

  //#region Render Form Items

  var parentID = "";
  var itemsGrouping = _chartGroup.itemsGrouping;
  $.each(CHARTS, function (index, chartItem) {
    if (itemsGrouping) {
      parentID =
        "form-group-body-" + chartItem.rowID + "-" + chartItem.columnIndex;
    } else {
      parentID =
        "form-group-mbody-" +
        chartItem.dashboardID +
        "-" +
        chartItem.columnIndex;
    }
    createImgChart(null, parentID, chartItem, chartItem.type);
  });
}
