"use strict";
<<<<<<< HEAD
let chartSvg;
=======
var chartSvg;
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
function chartEdit(e) {
  /*
      Get img
      */
  SERIES = [];
  const rowbtnId = $("#" + e.target.id).parent()[0].id;
  let imgid = rowbtnId.replaceAll("rowbtn-img-", "");

  CHARTTYPE = $("#" + imgid).attr("type");
<<<<<<< HEAD

  //create modal form
  CHARTTYPE == "table"
    ? ModalConstractor("50%", "geContent")
    : ModalConstractor("85%", "geContent");
=======
  //create modal form
  ModalConstractor("85%", "geContent");
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
  let div1 =
    '<div id="div1" class="row col-lg-3 col-md-3 col-sm-12" style=""></div>';
  $("#contentM").append(div1);
  let div2 =
    '<div id="div2" class="col-lg-9 col-md-9 col-sm-12" style="">' +
    '<div id="containers"></div></figure></div>';
  $("#contentM").append(div2);

  //div1 Add Items
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
<<<<<<< HEAD
  let count = CHARTTYPE == "table" ? 2 : ArrLbl.length;
  for (let i = 0; i < count; i++) {
    if (CHARTTYPE == "pie" || CHARTTYPE == "polar") {
=======
  for (let i = 0; i < ArrLbl.length; i++) {
    if (CHARTTYPE == "pie") {
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
      if (i != 2 && i != 3) {
        divItems(i);
        label(i, ArrLbl[i]);
      }
    } else {
      divItems(i);
      label(i, ArrLbl[i]);
    }
<<<<<<< HEAD

=======
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
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
<<<<<<< HEAD
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
=======
    } else if (CHARTTYPE == "pie") {
      if (i != 2 && i != 3) {
        divItems(i);
        textBox(i, ArrItems[i]);
      }
    } else {
      divItems(i);
      textBox(i, ArrItems[i]);
    }
  }

>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
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
<<<<<<< HEAD
    if (CHARTTYPE == "pie" || CHARTTYPE == "polar") {
=======
    if (CHARTTYPE == "pie") {
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
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

<<<<<<< HEAD
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
=======
  document.getElementById("item-0").addEventListener("change", (e) => {
    _TitleOptions.text = $("#item-0").val();
    showChart(CHARTTYPE);
  });
  if (CHARTTYPE != "pie") {
    document.getElementById("item-3").addEventListener("change", (e) => {
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
      _YAxisOptions.title.text = $("#item-3").val();
      showChart(CHARTTYPE);
    });

<<<<<<< HEAD
    document.getElementById("item-2").addEventListener("change", () => {
=======
    document.getElementById("item-2").addEventListener("change", (e) => {
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
      _XAxisOptions.title.text = $("#item-2").val();
      showChart(CHARTTYPE);
    });

<<<<<<< HEAD
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
=======
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
    //for load
    _YAxisOptions.title.text = $("#item-3").val();
    _XAxisOptions.title.text = $("#item-2").val();
    _TitleOptions.text = $("#item-0").val();
  }

<<<<<<< HEAD
  CHARTTYPE == "table" ? showTable() : showChart(CHARTTYPE);
=======
  showChart(CHARTTYPE);

>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
  //============================btn=====================
  // create btn

  //btnsubmit
  let Submit = btnSubmit("#chartModal", "ذخیره");
  Submit.onclick = () => {
<<<<<<< HEAD
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
      // let svg_Dom = xmlDoc.getElementsByTagName("svg")[0];
      // svg_Dom.setAttribute("width", "1500");
      // svg_Dom.setAttribute("viewBox", "0 0 1500 400");
      // console.log(svg_Dom);
      _RowID = $("#" + imgid)
        .parent()
        .parent()[0]
        .id.replaceAll("form-group-", "");
      _ColumnIndex = $("#" + imgid)
        .parent()[0]
        .id.replaceAll("form-group-body-", "")
        .split("-")[1];

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

      _ColumnIndex = $("#" + imgid)
        .parent()[0]
        .id.replaceAll("form-group-body-", "")
        .split("-")[1];

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
=======
    //get svg
    let svg_xml = chartSvg.getSVG();

    const index = svg_xml.indexOf("</div>") + 6;
    svg_xml = svg_xml.slice(index, 9e9);

    //get items
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(svg_xml, "text/xml");
    const _id = xmlDoc.getElementsByTagName("clipPath")[0].getAttribute("id");
    // let svg_Dom = xmlDoc.getElementsByTagName("svg")[0];
    // svg_Dom.setAttribute("width", "1500");
    // svg_Dom.setAttribute("viewBox", "0 0 1500 400");
    // console.log(svg_Dom);
    const _RowID = $("#" + imgid)
      .parent()
      .parent()[0]
      .id.replaceAll("form-group-", "");
    const _ColumnIndex = $("#" + imgid)
      .parent()[0]
      .id.replaceAll("form-group-body-", "")
      .split("-")[1];

    //get base64
    const _svg_Base64 = Base64.encode(svg_xml, false);
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada

    //remove oldItem by id
    if (findChart) {
      CHARTS.splice(
        CHARTS.findIndex((Element) => Element.ID == imgid),
        1
      );
    }

<<<<<<< HEAD
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
=======
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
      ImgBs64: _svg_Base64,
    });

    _YAxisOptions.title.text = "";
    _XAxisOptions.title.text = "";
    _TitleOptions.text = "";

    //update chart to form
    $("#" + imgid).attr("src", "data:image/svg+xml;base64," + _svg_Base64);
    $("#" + imgid).attr("id", _id);
    $("#rowbtn-img-" + imgid).attr("id", "rowbtn-img-" + _id);
    HideModal();
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
  };

  //btn exit
  let Exit = btnExit("#chartModal");
  Exit.onclick = () => HideModal();

  //close rowbtn
  const hideRowBtn = $("#" + e.target.id).parent()[0].id;
  $("#" + hideRowBtn).css("display", "none");
<<<<<<< HEAD
=======

  showChart(CHARTTYPE);
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
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
<<<<<<< HEAD
    case "polar":
      chartItems(series(), chartType);
      break;
=======
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
  }

  //create chart function
  function chartItems(_series, chartType) {
    _GeneralOptions.type = chartType;

<<<<<<< HEAD
    //for spiderWeb
    if (_GeneralOptions.type == "polar") {
      _GeneralOptions.polar = true;
    } else {
      _GeneralOptions.polar = false;
    }

    if (_GeneralOptions.type == "pie") {
=======
    if (chartType == "pie") {
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
      _GeneralOptions.options3d.enabled = true;
      _LegendOptions.enabled = true;
    } else {
      _GeneralOptions.options3d.enabled = false;
      _LegendOptions.enabled = false;
    }

    _TitleOptions.text = $("#item-0").val();
    chartSvg = Highcharts.chart("containers", {
      chart: _GeneralOptions,
<<<<<<< HEAD

      colors: _ColorsOptions,

      credits: _CreditsOptions,

      exporting: _ExportingOptions,

      legend: _LegendOptions,

      title: _TitleOptions,

      tooltip: _TooltipOptions,

      xAxis: _XAxisOptions,

      yAxis: _YAxisOptions,

      // lang: _LangOptions,
=======
      colors: _ColorsOptions,
      credits: _CreditsOptions,
      legend: _LegendOptions,
      title: _TitleOptions,
      xAxis: _XAxisOptions,
      yAxis: _YAxisOptions,
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
      plotOptions: {
        series: _SeriesPlotOptions,
        areaspline: _AreaPlotOptions,
        bar: _BarPlotOptions,
        column: _ColumnPlotOptions,
        line: _LinePlotOptions,
<<<<<<< HEAD

=======
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
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
<<<<<<< HEAD
              y: 5,
=======
              y: 1,
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
            },
            {
              name: "Value 2",
              y: 8,
            },
            {
              name: "Value 3",
<<<<<<< HEAD
              y: 9,
=======
              y: 3,
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
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
<<<<<<< HEAD
              y: 1,
            },
          ],
          color: SERIES[i].StyleColor,
          type: CHARTTYPE == "polar" ? "area" : SERIES[i].PlotType,
=======
              y: 9,
            },
          ],
          color: SERIES[i].StyleColor,
          type: SERIES[i].PlotType,
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
        });
      }
    } else {
      _series.push({
        name: "Default",
        data: [
          {
            name: "Value 1",
<<<<<<< HEAD
            y: 5,
=======
            y: 1,
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
          },
          {
            name: "Value 2",
            y: 8,
          },
          {
            name: "Value 3",
<<<<<<< HEAD
            y: 9,
=======
            y: 3,
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
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
<<<<<<< HEAD
            y: 1,
          },
        ],
        color: "#1344d8",
        type: CHARTTYPE == "polar" ? "area" : CHARTTYPE,
=======
            y: 9,
          },
        ],
        color: "#1344d8",
        type: CHARTTYPE,
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
      });
    }
    return _series;
  }
}
<<<<<<< HEAD

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
=======
>>>>>>> 9f52a9c2bccad69b660f06563668d21057872ada
