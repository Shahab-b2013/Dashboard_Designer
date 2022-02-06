"use strict";
let chartSvg;
function chartEdit(e) {
  // Get img
  SERIES = [];
  const rowbtnId = $("#" + e.target.id).parent()[0].id;
  let imgid = rowbtnId.replaceAll("rowbtn-img-", "");

  CHARTTYPE = $("#" + imgid).attr("type");

  //create modal form
  CHARTTYPE == "table"
    ? ModalConstractor("50%", "geContent")
    : ModalConstractor("85%", "geContent");
  let div1 =
    '<div id="div1" class="row col-lg-3 col-md-3 col-sm-12" style=""></div>';
  $("#contentM").append(div1);
  let div2 =
    '<div id="div2" class="col-lg-9 col-md-9 col-sm-12" style="">' +
    '<div id="containers"></div></figure></div>';
  $("#contentM").append(div2);

  //load chart and items
  const ArrLbl = [
    "عنوان چارت",
    "جدول داده",
    "عنوان سطر",
    "عنوان ستون",
    "فیلد دسته بندی ",
    "نوع سری",
    "سری داده",
  ];

  let findChart = CHARTS.find((Element) => Element.ID == imgid);
  let ArrItems = [];
  if (findChart) {
    for (let i = 0; i < findChart.Series.length; i++)
      SERIES.push(findChart.Series[i]);

    ArrItems = [
      findChart.Text,
      findChart.CommandText,
      findChart.CategoryLabel,
      findChart.ValueLabel,
      findChart.CategoryExpression,
      findChart.SeriesType,
      findChart.Series,
    ];
  } else {
    ArrItems = ["", "", "", "", "", "", "", ""];
  }
  //create items and value
  let count = CHARTTYPE == "table" ? 2 : ArrLbl.length;
  for (let i = 0; i < count; i++) {
    if (CHARTTYPE == "pie" || CHARTTYPE == "polar") {
      if (i != 2 && i != 3) {
        divItems(i);
        label(i, ArrLbl[i]);
      }
    } else {
      divItems(i);
      label(i, ArrLbl[i]);
    }

    if (i == 1) {
      divItems(i);
      textBox(i, ArrItems[i]);
      $("#div1Items-" + i).append(
        '<span id="CommandTextBtn" onclick="CommandText(event)" class="btn btn-light glyphicon glyphicon-option-vertical"></span>'
      );
    } else if (i == 5) {
      divItems(i);
      selectList(i, ArrItems[i]);
    } else if (i == 6) {
      divItems(i);
      textBox(i, "");
      //serie Data Name
      let seriesName = "";
      if (SERIES.length > 0) {
        seriesName = SERIES[0].Text;
        for (let i = 1; i < SERIES.length; i++)
          seriesName += " , " + SERIES[i].Text;
      }
      $("#item-6").val(seriesName);
      $("#div1Items-" + i).append(
        '<span id="SeriesBtn" class="btn btn-light glyphicon glyphicon-option-vertical" onclick="SeriesFn(id)"></span>'
      );
    } else {
      if (CHARTTYPE == "pie" || CHARTTYPE == "polar") {
        if (i != 2 && i != 3) {
          textBox(i, ArrItems[i]);
        }
      } else {
        textBox(i, ArrItems[i]);
      }
    }
  }
  //row
  function divItems(i) {
    let div1Items =
      '<div id="div1Items-' +
      i +
      '" class="divItems_ChartEdit" style=""></div>';
    $("#div1").append(div1Items);
  }

  //label
  function label(i, value) {
    let lbl = document.createElement("label");
    lbl.innerText = value + ":";
    lbl.className = "lbl ";
    lbl.style.margin = "5px 0px 10px 10px";
    $("#div1Items-" + i).append(lbl);
  }

  //text Box
  function textBox(i, value) {
    let textBox = document.createElement("input");
    textBox.type = "text";
    textBox.className = "TextboxEditChart";
    textBox.setAttribute("id", "item-" + i);

    if (i == 1) {
      textBox.setAttribute("Disabled", "Disabled");
    } else if (i == 6) {
      textBox.setAttribute("Disabled", "Disabled");
    }
    textBox.value = value;
    $("#div1Items-" + i).append(textBox);
  }

  //select box
  function selectList(i, selected) {
    let Select_List =
      '<select class="selectBox" id="item-' +
      i +
      '" style="float: left;margin-left: 20px;direction: ltr;">';
    if (CHARTTYPE == "pie" || CHARTTYPE == "polar") {
      Select_List += '<option value="Simple">Simple</option>';
    } else {
      Select_List +=
        '<option value="Simple">Simple</option>' +
        '<option value="ColumnGroup">ColumnGroup</option>' +
        '<option value="Stack">Stack</option>' +
        "</select>";
    }
    $("#div1Items-" + i).append(Select_List);

    selected ? $("#item-" + i).val(selected) : $("#item-" + i).val("Simple");
  }

  if (CHARTTYPE == "table") {
    document.getElementById("item-0").addEventListener("input", (e) => {
      $("#table_head").html($("#item-0").val());
    });
  } else {
    document.getElementById("item-0").addEventListener("change", (e) => {
      _TitleOptions.text = $("#item-0").val();
      showChart(CHARTTYPE);
    });
  }

  if (CHARTTYPE != "pie" && CHARTTYPE != "table" && CHARTTYPE != "polar") {
    document.getElementById("item-3").addEventListener("change", () => {
      _YAxisOptions.title.text = $("#item-3").val();
      showChart(CHARTTYPE);
    });

    document.getElementById("item-2").addEventListener("change", () => {
      _XAxisOptions.title.text = $("#item-2").val();
      showChart(CHARTTYPE);
    });

    document.getElementById("item-5").addEventListener("input", (e) => {
      if ($("#" + e.target.id).val() == "Stack") {
        _ColumnPlotOptions.dataLabels.formatter = function () {
          return this.point.percentage.toFixed(0) + "%";
        };

        _ColumnPlotOptions.dataLabels.format = "%" + "{y}";

        _ColumnPlotOptions.stacking = "percent";
      } else {
        _ColumnPlotOptions.dataLabels.format = "{y}";

        _ColumnPlotOptions.stacking = "";
      }
      showChart(CHARTTYPE);
    });
    //for load
    _YAxisOptions.title.text = $("#item-3").val();
    _XAxisOptions.title.text = $("#item-2").val();
    _TitleOptions.text = $("#item-0").val();
  }

  CHARTTYPE == "table" ? showTable() : showChart(CHARTTYPE);
  //============================btn=====================
  // create btn

  //btnsubmit
  let Submit = btnSubmit("#chartModal", "ذخیره");
  Submit.onclick = () => {
    let _RowID, _ColumnIndex, _id, _Base64, myPromise;

    if (CHARTTYPE != "table") {
      //  get svg
      let svg_xml = chartSvg.getSVG();
      const index = svg_xml.indexOf("</div>") + 6;
      svg_xml = svg_xml.slice(index, 9e9);

      //get items
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(svg_xml, "text/xml");
      _id = xmlDoc.getElementsByTagName("clipPath")[0].getAttribute("id");
      _RowID = $("#" + imgid)
        .parent()
        .parent()[0]
        .id.replaceAll("form-group-", "");
      
      //تغییر
        let par = $("#" + imgid)
          .parent()[0]
          .id;
      _ColumnIndex = $("#" + par).attr('ColumnIndex')
      //  _ColumnIndex = $("#" + imgid)
      //   .parent()[0]
      //   .id.replaceAll("form-group-body-", "")
      //   .split("-")[1];
      


      //get base64
      myPromise = new Promise(function (myResolve, myReject) {
        _Base64 = Base64.encode(svg_xml, false);
        if (_Base64 != "") {
          myResolve(_Base64);
        } else {
          myReject("error");
        }
      });
    } else if (CHARTTYPE == "table") {
      _RowID = $("#" + imgid)
        .parent()
        .parent()[0]
        .id.replaceAll("form-group-", "");

      _id = imgid.replaceAll("chart-defaultId-", "table-");

       //تغییر
        let par = $("#" + imgid)
          .parent()[0]
          .id;
      _ColumnIndex = $("#" + par).attr('ColumnIndex')

      //  _ColumnIndex = $("#" + imgid)
      //   .parent()[0]
      //   .id.replaceAll("form-group-body-", "")
      //   .split("-")[1];

      myPromise = new Promise(function (myResolve, myReject) {
        $("#div2").css("border", "0px");
        html2canvas($("#div2"), {
          onrendered: function (canvas2) {
            _Base64 = canvas2.toDataURL();
            if (_Base64 != "") {
              myResolve(_Base64);
            } else {
              myReject("error");
            }
          },
        });
      });
    }

    //remove oldItem by id
    if (findChart) {
      CHARTS.splice(
        CHARTS.findIndex((Element) => Element.ID == imgid),
        1
      );
    }
    myPromise.then(
      function (value) {
        _Base64 = value;
        CHARTS.push({
          RowID: +_RowID,
          ColumnIndex: +_ColumnIndex,
          ID: _id,
          Name: $("#item-0").val(),
          CommandText: $("#item-1").val(),
          Text: $("#item-0").val(),
          Type: CHARTTYPE,
          CategoryLabel: $("#item-2").val(),
          ValueLabel: $("#item-3").val(),
          CategoryName: $("#item-4").val(),
          CategoryExpression: $("#item-4").val(),
          SeriesType: $("#item-5 option:selected").val(),
          Series: SERIES,
          ImgBs64: _Base64,
        });
        _YAxisOptions.title.text = "";
        _XAxisOptions.title.text = "";
        _TitleOptions.text = "";
        //update chart to form
        CHARTTYPE != "table"
          ? $("#" + imgid).attr("src", "data:image/svg+xml;base64," + _Base64)
          : $("#" + imgid).attr("src", _Base64);
        $("#" + imgid).attr("id", _id);
        $("#rowbtn-img-" + imgid).attr("id", "rowbtn-img-" + _id);
        HideModal();
      },
      function (error) {
        alert(error);
      }
    );
  };

  //btn exit
  let Exit = btnExit("#chartModal");
  Exit.onclick = () => HideModal();

  //close rowbtn
  const hideRowBtn = $("#" + e.target.id).parent()[0].id;
  $("#" + hideRowBtn).css("display", "none");
}

//===============================show Chart ============================

//create chart
function showChart(chartType) {
  switch (chartType) {
    case "column":
      chartItems(series(), chartType);
      break;
    case "pie":
      chartItems(series(), chartType);
      break;
    case "bar":
      chartItems(series(), chartType);
      break;
    case "line":
      chartItems(series(), chartType);
      break;
    case "areaspline":
      chartItems(series(), chartType);
      break;
    case "polar":
      chartItems(series(), chartType);
      break;
  }

  //create chart function
  function chartItems(_series, chartType) {
    _GeneralOptions.type = chartType;

    //for spiderWeb
    if (_GeneralOptions.type == "polar") {
      _GeneralOptions.polar = true;
    } else {
      _GeneralOptions.polar = false;
    }

    if (_GeneralOptions.type == "pie") {
      _GeneralOptions.options3d.enabled = true;
      _LegendOptions.enabled = true;
    } else {
      _GeneralOptions.options3d.enabled = false;
      _LegendOptions.enabled = false;
    }

    _TitleOptions.text = $("#item-0").val();
    chartSvg = Highcharts.chart("containers", {
      chart: _GeneralOptions,

      colors: _ColorsOptions,

      credits: _CreditsOptions,

      exporting: _ExportingOptions,

      legend: _LegendOptions,

      title: _TitleOptions,

      tooltip: _TooltipOptions,

      xAxis: _XAxisOptions,

      yAxis: _YAxisOptions,

      // lang: _LangOptions,
      plotOptions: {
        series: _SeriesPlotOptions,
        areaspline: _AreaPlotOptions,
        bar: _BarPlotOptions,
        column: _ColumnPlotOptions,
        line: _LinePlotOptions,

        pie: _PiePlotOptions,
      },
      series: _series,
    });
  }

  function series() {
    let _series = [];
    if (SERIES.length > 0) {
      for (let i = 0; i < SERIES.length; i++) {
        _series.push({
          name: SERIES[i].Text,
          data: [
            {
              name: "Value 1",
              y: 5,
            },
            {
              name: "Value 2",
              y: 8,
            },
            {
              name: "Value 3",
              y: 9,
            },
            {
              name: "Value 4",
              y: 7,
            },
            {
              name: "Value 5",
              y: 2,
            },
            {
              name: "Value 6",
              y: 1,
            },
          ],
          color: SERIES[i].StyleColor,
          type: CHARTTYPE == "polar" ? "area" : SERIES[i].PlotType,
        });
      }
    } else {
      _series.push({
        name: "Default",
        data: [
          {
            name: "Value 1",
            y: 5,
          },
          {
            name: "Value 2",
            y: 8,
          },
          {
            name: "Value 3",
            y: 9,
          },
          {
            name: "Value 4",
            y: 7,
          },
          {
            name: "Value 5",
            y: 2,
          },
          {
            name: "Value 6",
            y: 1,
          },
        ],
        color: "#1344d8",
        type: CHARTTYPE == "polar" ? "area" : CHARTTYPE,
      });
    }
    return _series;
  }
}

//===============================show Table ============================
function showTable() {
  let divGrid =
    '<div class="" style="height:300px !important;border-bottom:1px solid #ccc;margin-bottom:10px;display:contents;"><span style="top: 30px;position:absolute;top:1px;font: 14px var(--mainFont);" id="table_head">' +
    $("#item-0").val() +
    "</span>" +
    '<table  class="table  table-bordered">' +
    "<thead>" +
    "<tr>" +
    '<th scope="col">column1</th>' +
    '<th scope="col">column2</th>' +
    '<th scope="col">column3</th>' +
    "</tr>" +
    '</thead><tbody id="series_tbody" >';
  for (let i = 0; i < 8; i++) {
    divGrid +=
      "<tr>" +
      "<td>" +
      i +
      "</td>" +
      "<td>columnData" +
      i +
      "</td>" +
      "<td>value" +
      i +
      "</td>" +
      "</tr>";
  }

  divGrid += "</tbody></table ></div>";
  $("#containers").append(divGrid);

  $("#div2").attr("class", "col-md-8");
  $("#div1").attr("class", "col-md-4");
  $("#item-0").css("width", "");
  $("#containers").css("margin-top", "5px");
}
