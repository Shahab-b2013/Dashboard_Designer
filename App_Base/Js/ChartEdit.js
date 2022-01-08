"use strict";
var chartSvg;
function chartEdit(e) {
  /*
      Get img
      */
  SERIES = [];
  const rowbtnId = $("#" + e.target.id).parent()[0].id;
  let imgid = rowbtnId.replaceAll("rowbtn-img-", "");

  CHARTTYPE = $("#" + imgid).attr("type");
  //create modal form
  ModalConstractor("85%", "geContent");
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
    "عنوان دسته بندی",
    "نام دسته بندی",
    "مقدار دسته بندی",
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
      findChart.CategoryName,
      findChart.ValueLabel,
      findChart.CategoryExpression,
      findChart.SeriesType,
      findChart.Series,
    ];
  } else {
    ArrItems = ["", "", "", "", "", "", "", ""];
  }
  //create items and value
  for (let i = 0; i < ArrLbl.length; i++) {
    if (CHARTTYPE == "pie") {
      if (i != 2 && i != 4) {
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
    } else if (i == 6) {
      divItems(i);
      selectList(i, ArrItems[i]);
    } else if (i == 7) {
      divItems(i);
      textBox(i, "");
      let textVal = "";
      if (SERIES.length > 0) {
        textVal = SERIES[0].Text;
        for (let i = 1; i < SERIES.length; i++)
          textVal += " , " + SERIES[i].Text;
      }
      $("#item-7").val(textVal);
      $("#div1Items-" + i).append(
        '<span id="SeriesBtn" class="btn btn-light glyphicon glyphicon-option-vertical" onclick="SeriesFn(id)"></span>'
      );
    } else if (CHARTTYPE == "pie") {
      if (i != 2 && i != 4) {
        divItems(i);
        textBox(i, ArrItems[i]);
      }
    } else {
      divItems(i);
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

    if (i == 1) {
      textBox.setAttribute("Disabled", "Disabled");
    } else if (i == 7) {
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
      '" style="float: left;margin-left: 20px;direction: ltr;">' +
      '<option value="Simple">Simple</option>' +
      '<option value="ColumnGroup">ColumnGroup</option>' +
      '<option value="Stack">Stack</option>' +
      "</select>";
    $("#div1Items-" + i).append(Select_List);
    selected ? $("#item-" + i).val(selected) : $("#item-" + i).val("Simple");
  }

  document.getElementById("item-0").addEventListener("change", (e) => {
    _TitleOptions.text = $("#item-0").val();
    showChart(CHARTTYPE);
  });
  if (CHARTTYPE != "pie") {
    document.getElementById("item-4").addEventListener("change", (e) => {
      _YAxisOptions.title.text = $("#item-4").val();
      showChart(CHARTTYPE);
    });

    document.getElementById("item-2").addEventListener("change", (e) => {
      _XAxisOptions.title.text = $("#item-2").val();
      showChart(CHARTTYPE);
    });
  }
  showChart(CHARTTYPE);

  //============================btn=====================
  // create btn

  //btnsubmit
  let Submit = btnSubmit("#chartModal", "ذخیره");
  Submit.onclick = () => {
    //get svg
    let svg_xml = chartSvg.getSVG();
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
      // Name: _name,
      CommandText: $("#item-1").val(),
      Text: $("#item-0").val(),
      Type: CHARTTYPE,
      CategoryLabel: $("#item-2").val(),
      ValueLabel: $("#item-4").val(),
      CategoryName: $("#item-5").val(),
      CategoryExpression: $("#item-5").val(),
      SeriesType: $("#item-6 option:selected").val(),
      Series: SERIES,
      ImgBs64: _svg_Base64,
    });

    //update chart to form
    $("#" + imgid).attr("src", "data:image/svg+xml;base64," + _svg_Base64);
    $("#" + imgid).attr("id", _id);
    $("#rowbtn-img-" + imgid).attr("id", "rowbtn-img-" + _id);
    HideModal();
  };

  //btn exit
  let Exit = btnExit("#chartModal");
  Exit.onclick = () => HideModal();

  //close rowbtn
  const hideRowBtn = $("#" + e.target.id).parent()[0].id;
  $("#" + hideRowBtn).css("display", "none");

  showChart(CHARTTYPE);
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
  }

  //create chart function
  function chartItems(_series, chartType) {
    _GeneralOptions.type = chartType;

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

  function series() {
    let _series = [];
    if (SERIES.length > 0) {
      for (let i = 0; i < SERIES.length; i++) {
        _series.push({
          name: SERIES[i].Text,
          data: [
            {
              name: "Value 1",
              y: 1,
            },
            {
              name: "Value 2",
              y: 8,
            },
            {
              name: "Value 3",
              y: 3,
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
              y: 9,
            },
          ],
          color: SERIES[i].StyleColor,
          type: SERIES[i].PlotType,
        });
      }
    } else {
      _series.push({
        name: "Default",
        data: [
          {
            name: "Value 1",
            y: 1,
          },
          {
            name: "Value 2",
            y: 8,
          },
          {
            name: "Value 3",
            y: 3,
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
            y: 9,
          },
        ],
        color: "#1344d8",
        type: CHARTTYPE,
      });
    }
    return _series;
  }
}
