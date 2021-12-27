"use strict";

function chartEdit(e) {
  var chartSvg;
  /*
    Get img
    */
  const rowbtnId = $("#" + e.target.id).parent()[0].id;
  let imgid = rowbtnId.replaceAll("rowbtn-img-", "");

  let getchartType = $("#" + imgid).attr("type");
  //create modal form
  ModalConstractor("85%", "geContent");
  let div2 =
    '<div id="div2" class="col-lg-9 col-md-9 col-sm-12 " style="">' +
    '<div id="containers" style="height:550px"></div></figure></div>';
  $("#contentM").append(div2);
  let div1 =
    '<div id="div1" class="row col-lg-3 col-md-3 col-sm-12 " style=""></div>';
  $("#contentM").append(div1);

  //div1 Add Items
  //load chart and items
  const ArrLbl = [
    "Text",
    "Name",
    "CommandText",
    "CategoryLabel",
    "ValueLabel",
    "CategoryName",
    "CatExpression",
    "Operators",
    "DataExpression",
    "Series",
    "StlyeColor",
  ];
  let ArrItems = [];
  let findChart = CHARTS.find((Element) => Element.ID == imgid);
  if (findChart) {
    ArrItems = [
      findChart.Text,
      findChart.Name,
      findChart.CommandText,
      findChart.CategoryLabel,
      findChart.ValueLabel,
      findChart.CategoryName,
      REFCOLUMNS,
      ["sum", "avg", "count", "min", "max"],
      findChart.Series[0].DataExpression,
      // findChart.Series[0].Text,
      findChart.Series[0].Name,
      findChart.Series[0].StyleColor,
    ];
  } else {
    ArrItems = [
      "",
      "",
      "",
      "",
      "",
      "",
      REFCOLUMNS,
      ["sum", "avg", "count", "min", "max"],
      "",
      "",
      "",
    ];
  }
  //create items and value
  for (let i = 0; i < ArrLbl.length; i++) {
    divItems(i);
    label(i, ArrLbl[i]);
    //REFCOLUMNS
    if (i == 2) {
      textBox(i, ArrItems[i]);
      $("#div1Items-" + i).append(
        '<span id="CommandTextBtn" onclick="CommandText(event)" class="btn btn-light glyphicon glyphicon-option-vertical"></span>'
      );
    } else if (i == 6) {
      selectList(i, ArrItems[i], findChart ? findChart.CategoryExpression : "");
    } else if (i == 7) {
      selectList(i, ArrItems[i], findChart ? findChart.Operator : "");
    } else if (i == 9) {
      textBox(i, ArrItems[i]);
      $("#div1Items-" + i).append(
        '<span id="SeriesBtn" onclick="Series(event)" class="btn btn-light glyphicon glyphicon-option-vertical"></span>'
      );
    } else if (i == 10) {
      inputColor(i, ArrItems[i]);
    } else {
      textBox(i, ArrItems[i]);
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

    textBox.value = value;
    $("#div1Items-" + i).append(textBox);
  }

  //select box
  function selectList(i, value, defaultVal) {
    let Select_List =
      '<select onchange="operator(event)" class="selectBox" id="item-' +
      i +
      '" style="float: right;margin-right: 20px;">';
    for (let j = 0; j < value.length; j++) {
      //REFCOLUMNS
      i == 6
        ? value[j].Data == defaultVal
          ? (Select_List += "<option selected>" + value[j].Data + "</option>")
          : (Select_List += "<option>" + value[j].Data + "</option>")
        : value[j] == defaultVal
        ? (Select_List += "<option selected>" + value[j] + "</option>")
        : (Select_List += "<option>" + value[j] + "</option>");
    }
    Select_List += "</select>";
    $("#div1Items-" + i).append(Select_List);
  }

  //colorInput
  function inputColor(i, value) {
    let color = document.createElement("input");
    color.type = "color";
    color.setAttribute("id", "item-" + i);
    color.style.width = "150px";
    color.style.marginRight = "20px";
    color.style.float = "right";
    color.value = value;
    color.addEventListener("input", () => {
      showChart(getchartType);
    });
    $("#div1Items-" + i).append(color);
  }

  document.getElementById("item-0").addEventListener("change", (e) => {
    _TitleOptions.text = $("#item-0").val();
    showChart(getchartType);
  });

  document.getElementById("item-3").addEventListener("change", (e) => {
    _YAxisOptions.title.text = $("#item-3").val();
    showChart(getchartType);
  });

  //===============================show Chart ============================

  //create chart
  function showChart(chartType) {
    let _cat, _series, _name;

    //create chart function
    function chartItems(_series, _cat, chartType) {
      _TitleOptions.text = "";
      _GeneralOptions.type = chartType;
      _ColumnPlotOptions.color = $("#item-10").val();
      _YAxisOptions.title.text = $("#item-3").val();
      _XAxisOptions.categories = _cat;

      if (chartType == "pie") {
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
        legend: _LegendOptions,
        title: _TitleOptions,
        xAxis: _XAxisOptions,
        yAxis: _YAxisOptions,
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

    //column
    if (chartType == "column") {
      _cat = [
        "تجهیرات کاربری",
        "سیستم ها",
        "شبکه",
        "سرور",
        "اتاق سرور",
        "رمز کننده",
      ];
      _name = "سرورها";
      _series = [
        {
          name: _name,
          data: [1075, 1058, 720, 360, 126, 57],
        },
      ];

      chartItems(_series, _cat, chartType);
    }
    //pie
    if (chartType == "pie") {
      _cat = "";
      _name = "";
      _series = [
        {
          name: _name,
          data: [
            ["value1", 8],
            ["value2", 7],
            ["value3", 2],
            ["value4", 1],
            ["value5", 5],
          ],
        },
      ];

      chartItems(_series, _cat, chartType);
    }

    // bar
    else if (chartType == "bar") {
      _cat = ["Africa", "America", "Asia", "Europe", "Oceania"];
      _name = $("#catSelect").val();
      _series = [
        {
          name: _name,
          data: [
            ["value1", 8],
            ["value2", 7],
            ["value3", 2],
            ["value4", 1],
            ["value5", 5],
          ],
        },
      ];

      chartItems(_series, _cat, chartType);
    }

    //line
    else if (chartType == "line") {
      _cat = [
        "value1",
        "value2",
        "value3",
        "value4",
        "value5",
        "value6",
        "value7",
        "value8",
        "value9",
      ];
      _name = "";
      _series = [
        {
          name: _name,
          data: [2, 1, 1, 1, 1, 5, 3, 3, 1],
        },
      ];

      chartItems(_series, _cat, chartType);
    }

    // //area
    // else if (chartType == "area") {
    //   _cat = [
    //     "value1",
    //     "value2",
    //     "value3",
    //     "value4",
    //     "value5",
    //     "value6",
    //     "value7",
    //   ];
    //   _name = "";

    //   _series = [
    //     {
    //       name: _name,
    //       data: [1, 2, 1, 2, 1, 1, 1],
    //     },
    //   ];
    //   chartItems(_series, _cat, chartType);
    // }

    //areaspline
    else if (chartType == "areaspline") {
      _cat = [
        "value1",
        "value2",
        "value3",
        "value4",
        "value5",
        "value6",
        "value7",
      ];
      _name = "";

      _series = [
        {
          name: _name,
          data: [1, 2, 1, 2, 1, 1, 1],
        },
      ];
      chartItems(_series, _cat, chartType);
    }
  }

  //============================btn=====================
  // create btn

  //btn preview
  //   let btnShow = document.createElement("button");
  //   btnShow.className = "btn btn-primary";
  //   btnShow.style.backgroundColor = "#134C96";
  //   btnShow.style.display = "inline";
  //   btnShow.style.float = "right";
  //   btnShow.style.marginRight = "10px";
  //   btnShow.innerHTML = "پیش نمایش";
  //   btnShow.onclick = () => showChart(getchartType);
  //   $("#chartModal").append(btnShow);

  //btnsubmit
  let btnSubmit = document.createElement("button");
  btnSubmit.className = "btn btn-primary";
  btnSubmit.style.margin = "0px 5px 0px 5px";
  btnSubmit.style.display = "inline";
  btnSubmit.style.float = "right";
  btnSubmit.innerText = "ذخیره";
  btnSubmit.onclick = () => {
    //get svg
    var svg_xml = chartSvg.getSVG();
    const index = svg_xml.indexOf("</div>") + 6;
    svg_xml = svg_xml.slice(index, 9e9);

    //get items
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(svg_xml, "text/xml");
    const _id = xmlDoc.getElementsByTagName("clipPath")[0].getAttribute("id");

    const _RowID = $("#" + imgid)
      .parent()
      .parent()[0]
      .id.replaceAll("form-group-", "");
    const _ColumnIndex = $("#" + imgid)
      .parent()[0]
      .id.replaceAll("form-group-body-", "")
      .split("-")[1];
    var _name = $("#item-1").val();

    //get base64
    const _svg_Base64 = Base64.encode(svg_xml, false);

    //remove oldItem by id
    if (findChart) {
      CHARTS.splice(
        CHARTS.findIndex((Element) => Element.ID == imgid),
        1
      );
    }

    CHARTS.push({
      RowID: +_RowID,
      ColumnIndex: +_ColumnIndex,
      ID: _id,
      Name: _name,
      CommandText: $("#item-2").val(),
      Text: $("#item-0").val(),
      Type: getchartType,
      CategoryLabel: $("#item-3").val(),
      ValueLabel: $("#item-4").val(),
      CategoryName: $("#item-5").val(),
      CategoryExpression: $("#item-6 option:selected").val(),
      Operator: $("#item-7 option:selected").val(),
      Series: [
        {
          // Text: $("#item-9").val(),
          // Name: $("#item-10").val(),
          DataExpression: $("#item-8").val(),
          PlotType: getchartType,
          StyleColor: $("#item-11").val(),
        },
      ],
      ImgBs64: _svg_Base64,
    });

    //update chart to form
    $("#" + imgid).attr("src", "data:image/svg+xml;base64," + _svg_Base64);
    $("#" + imgid).attr("id", _id);
    $("#rowbtn-img-" + imgid).attr("id", "rowbtn-img-" + _id);
    HideModal();
  };
  $("#chartModal").append(btnSubmit);

  //btn exit
  let btnExit = document.createElement("button");
  btnExit.className = "btn btn-light";
  btnExit.style.display = "inline";
  btnExit.style.float = "right";
  btnExit.innerText = "لغو";
  btnExit.onclick = function () {
    HideModal();
  };
  $("#chartModal").append(btnExit);

  //close rowbtn
  const hideRowBtn = $("#" + e.target.id).parent()[0].id;
  $("#" + hideRowBtn).css("display", "none");

  //=================================onload Chart==========================

  showChart(getchartType);
}
function operator(e) {
  $("#item-8").val($("#item-7").val() + "(" + $("#item-6").val() + ")");
}
