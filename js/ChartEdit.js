function chartEdit(e) {
  /*
  Get img
  */
  let getchartType;
  let imgid = e.target.id.replaceAll("spanEdit", "");

  //if img == default
  if (e.target.id.indexOf("highchart") != -1) {
    //get base64 from img
    let bs64 = $("#" + imgid)
      .attr("src")
      .replaceAll("data:image/svg+xml;base64,", "");
    //new img
    let newImg = Base64.decode(bs64, false);
    //parser new img because get id for getTypeChart
    let docSvg = new DOMParser().parseFromString(newImg, "text/xml");
    let getTag = docSvg.getElementsByClassName("highcharts-data-labels")[0];
    getchartType = getTag.getAttribute("class").split(" ")[2].slice(11, -7);
  } else {
    getchartType = $("#" + e.target.id).attr("type");
  }

  //create modal form
  ChartConstractor("85%", "geContent");
  let div1 =
    '<div id="div1" class="row col-lg-3 col-md-12 col-sm-12 " style=""></div>';
  $("#contentM").append(div1);

  let div2 =
    '<div id="div2" class="col-lg-9 col-md-12 col-xs-12 " style="">' +
    '<div id="containers" style="margin:80px 0;"></div></figure></div>';
  $("#contentM").append(div2);

  //div1 Add Items
  const ArrLbl = [
    "Text",
    "Name",
    "chartType",
    "categoryLabel",
    "valueLabel",
    "categoryName",
    "catExpression",
    "Operators",
    "dataExpression",
    "seriesText",
    "seriesName",
    "seriesType",
    "StlyeColor",
    "version",
  ];
  for (let i = 0; i < ArrLbl.length; i++) {
    let div1Items =
      '<div id="div1Items-' +
      i +
      '" class=" col-lg-12 col-md-12 " style="margin:5px"></div>';
    $("#div1").append(div1Items);

    let lbl = document.createElement("label");
    lbl.innerText = ArrLbl[i] + ":";
    lbl.className = "lbl ";
    // lbl.style.float = "left";
    lbl.style.margin = "10px 0px 10px 10px";
    $("#div1Items-" + i).append(lbl);

    if (i == 2 || i == 6 || i == 7) {
      //dropDown
      let List = document.createElement("select");
      List.className = "selectBox ";
      List.setAttribute("id", "select-" + i);
      List.style.left = "0px";
      List.style.position = "absolute";
      $("#div1Items-" + i).append(List);
    } else if (i == 12) {
      //colorInput
      let color = document.createElement("input");
      color.type = "color";
      color.setAttribute("id", "color-" + i);
      color.style.width = "150px";
      color.style.left = "0px";
      color.style.position = "absolute";
      $("#div1Items-" + i).append(color);
    } else {
      //textBox
      let textBox = document.createElement("input");
      textBox.type = "text";
      textBox.setAttribute("id", "text-" + i);
      textBox.style.border = "1px solid #ccc";
      textBox.style.height = "30px";
      textBox.style.width = "200px";
      textBox.style.left = "0px";
      textBox.style.position = "absolute";
      $("#div1Items-" + i).append(textBox);
    }
  }

  //============================btn=====================
  // create btn
  let rowbtn = document.createElement("div");
  rowbtn.style.margin = "0px 10px";
  $("#chartModal").append(rowbtn);

  //btn preview
  let btnShow = document.createElement("button");
  btnShow.className = "btn btn-primary";
  btnShow.style.backgroundColor = "#134C96";
  btnShow.style.borderRadius = "4px";
  btnShow.innerHTML = "پیش نمایش";
  // btnShow.onclick = () => showChart($("#selectType").val());
  btnShow.onclick = () => showChart("pie");
  rowbtn.appendChild(btnShow);

  //btnsubmit
  let btnSubmit = document.createElement("button");
  btnSubmit.className = "btn btn-primary";
  btnSubmit.style.borderRadius = "4px";
  btnSubmit.style.margin = "10px 10px 10px 10px";
  btnSubmit.innerText = "ذخیره";
  btnSubmit.onclick = (e) => {
    //get svgid
    var svg_xml = chartSvg.getSVG();
    const index = svg_xml.indexOf("</div>") + 6;
    svg_xml = svg_xml.slice(index, 9e9);

    //base64
    let svg_Base64 = Base64.encode(svg_xml, false);

    //update chart
    $("#" + imgid).attr("src", "data:image/svg+xml;base64," + svg_Base64);
    $("#myModal").remove();
  };
  rowbtn.appendChild(btnSubmit);

  //btn exit
  let btnExit = document.createElement("button");
  btnExit.className = "btn btn-light";
  btnExit.style.borderRadius = "4px";
  btnExit.innerText = "لغو";
  btnExit.onclick = function () {
    $("#myModal").remove();
  };
  rowbtn.appendChild(btnExit);

  //close rowbtn
  const hideRowBtn = $("#" + e.target.id).parent()[0].id;
  $("#" + hideRowBtn).css("display", "none");

  //=================================onload Chart==========================

  showChart(getchartType);
}

//===============================show Chart ============================

//create chart
function showChart(chartType) {
  let _cat, _series, _name;

  //create chart function

  function chartItems(_series, _cat, chartType) {
    _TitleOptions.text = "";
    _GeneralOptions.type = chartType;
    _YAxisOptions.title.text = "";
    _XAxisOptions.categories = _cat;
    _SeriesPlotOptions.color = "";

    if (chartType == "pie") {
      _GeneralOptions.options3d.enabled = true;
      _LegendOptions.enabled = true;
    } else {
      _GeneralOptions.options3d.enabled = false;
      _LegendOptions.enabled = false;
    }

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
    _cat = "";
    _name = "fdd";
    _series = [
      {
        name: _name,
        data: [8, 5, 2, 4, 5, 2, 1],
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
