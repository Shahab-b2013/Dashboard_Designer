"use strict";

function DashboardView(_json) {
    var _chartGroup = _json;
    var content;
    var bodyID = "#geContent";

    //#region Render Form Items Layout & Grouping
    if (_json.ItemsGrouping) {
        $.each(_chartGroup.RowBoxs, function (index, chartGroup) {

            content =
                '<div style="' +
                '" id="form-group-' +
                chartGroup.RowID +
                '" class="row form-group-box " RowIndex="' +
                chartGroup.RowIndex +
                '" ondragleave="onMouseOut(event)">';
            var ColumnWidth = chartGroup.ColumnWidth;
            if (chartGroup.ColumnLayout == "OnceColumn") {
                if (ColumnWidth == "default") {
                    ColumnWidth = "col-lg-12";
                }
                content +=
                    '<div class="' +
                    ColumnWidth +
                    ' col-sm-12 col-xs-12 form-group-body" ondrop="drop(event)" ondragover="allowDrop(event)" ColumnIndex="0" id="form-group-body-' +
                    chartGroup.RowID +
                    '-0" ></div>';
            }

            if (chartGroup.ColumnLayout == "TwoColumn") {
                ColumnWidth = "col-md-6";

                content +=
                    '<div class="' +
                    ColumnWidth +
                    " form-group-body" +
                    '"' +
                    'ondrop="drop(event)" ondragover="allowDrop(event)"' +
                    ' ColumnIndex="0" id="form-group-body-' +
                    chartGroup.RowID +
                    '-0"></div><div class="' +
                    ColumnWidth +
                    " form-group-body" +
                    '"' +
                    'ondrop="drop(event)" ColumnIndex="1" ondragover="allowDrop(event)"' +
                    ' id="form-group-body-' +
                    chartGroup.RowID +
                    '-1" ></div>';
            }

            if (chartGroup.ColumnLayout == "ThreeColumn") {
                if (chartGroup.RowDisplayMode == "GroupWithBox") {
                    ColumnWidth = "col-md-4";
                } else {
                    ColumnWidth = "col-md-4";
                }

                content +=
                    '<div class="' +
                    ColumnWidth +
                    " form-group-body" +
                    '"ondrop="drop(event)" ondragover="allowDrop(event)" ColumnIndex="0" id="form-group-body-' +
                    chartGroup.RowID +
                    '-0" ></div><div class="' +
                    ColumnWidth +
                    " form-group-body" +
                    '"ondrop="drop(event)" ondragover="allowDrop(event)" ColumnIndex="1" id="form-group-body-' +
                    chartGroup.RowID +
                    '-1" > </div><div class="' +
                    ColumnWidth +
                    " form-group-body" +
                    '"ondrop="drop(event)" ondragover="allowDrop(event)" ColumnIndex="2" id="form-group-body-' +
                    chartGroup.RowID +
                    '-2" ></div>';
            }

            //btn json default
            content += Group_Btn(chartGroup.RowID);

            content += "</div>";

            $(bodyID).append(content);
        });

        //#endregion

        //#region Render Form Items

        var parentID = "";
        $.each(CHARTS, function (index, chartItem) {
            if (_chartGroup.ItemsGrouping) {
                parentID =
                    "form-group-body-" + chartItem.RowID + "-" + chartItem.ColumnIndex;
            } else {
                parentID =
                    "form-group-mbody-" +
                    chartItem.DashboardID +
                    "-" +
                    chartItem.ColumnIndex;
            }
            createImgChart(null, parentID, chartItem, chartItem.Type);

        });
    }
   
}
