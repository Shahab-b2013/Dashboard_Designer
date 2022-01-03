"use strict";

function chartEdit(e) {
  var chartSvg;
  /*
      Get img
      */
  SERIES_Clear();
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
    "نام چارت",
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
      findChart.Name,
      findChart.CommandText,
      findChart.CategoryLabel,
      findChart.CategoryName,
      findChart.ValueLabel,
      findChart.CategoryExpression,
      findChart.SeriesType,
      findChart.Series,
    ];
  } else {
    ArrItems = ["", "", "", "", "", "", "", "", ""];
  }
  //create items and value
  for (let i = 0; i < ArrLbl.length; i++) {
    if (i != 4) {
      //فعلا نمایش داده نشود
      divItems(i);
      label(i, ArrLbl[i]);
    }

    if (i == 2) {
      textBox(i, ArrItems[i], ArrLbl[i]);
      $("#div1Items-" + i).append(
        '<span id="CommandTextBtn" onclick="CommandText(event)" class="btn btn-light glyphicon glyphicon-option-vertical"></span>'
      );
    } else if (i == 4) {
      //فعلا نمایش داده نشود
    } else if (i == 7) {
      selectList(i, ArrItems[i]);
    } else if (i == 8) {
      textBox(i, "", ArrLbl[i]);
      let textVal = "";
      if (SERIES.length > 0) {
        textVal = SERIES[0].Text;
        for (let i = 1; i < SERIES.length; i++)
          textVal += " , " + SERIES[i].Text;
      }

      $("#item-8").val(textVal);

      $("#div1Items-" + i).append(
        '<span id="SeriesBtn" class="btn btn-light glyphicon glyphicon-option-vertical" onclick="SeriesFn(id)"></span>'
      );
    } else {
      textBox(i, ArrItems[i], ArrLbl[i]);
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
  function textBox(i, value, Placeholder) {
    let textBox = document.createElement("input");
    textBox.type = "text";
    textBox.className = "TextboxEditChart";
    textBox.setAttribute("id", "item-" + i);
    if (i == 1) {
      Placeholder = "chartName";
    } else if (i == 2) {
      textBox.setAttribute("Disabled", "Disabled");
    } else if (i == 4) {
      //فعلا نمایش داده نشه
      // Placeholder = "categoryName";
    } else if (i == 6) {
      Placeholder = "categoryField";
    } else if (i == 8) {
      textBox.setAttribute("Disabled", "Disabled");
    }
    textBox.placeholder = Placeholder;

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

  document.getElementById("item-5").addEventListener("change", (e) => {
    _YAxisOptions.title.text = $("#item-5").val();
    showChart(CHARTTYPE);
  });

  document.getElementById("item-3").addEventListener("change", (e) => {
    _XAxisOptions.title.text = $("#item-3").val();
    showChart(CHARTTYPE);
  });

  showChart(CHARTTYPE);

  //===============================show Chart ============================

  //create chart
  function showChart(chartType) {
    let _cat, _series, _name;

    //create chart function
    function chartItems(_series, _cat, chartType) {
      // _TitleOptions.text = "";
      _GeneralOptions.type = chartType;
      // _ColumnPlotOptions.color = $("#item-10").val();
      // _YAxisOptions.title.text = $("#item-3").val();
      // _XAxisOptions.categories = _cat;

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
  //   btnShow.onclick = () => showChart(CHARTTYPE);
  //   $("#chartModal").append(btnShow);

  //btnsubmit
  let Submit = btnSubmit("#chartModal", "ذخیره");
  Submit.onclick = () => {
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
      Type: CHARTTYPE,
      CategoryLabel: $("#item-3").val(),
      ValueLabel: $("#item-5").val(),
      CategoryName: $("#item-6").val(),
      CategoryExpression: $("#item-6").val(),
      SeriesType: $("#item-7 option:selected").val(),
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
