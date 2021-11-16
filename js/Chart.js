function chartEdit(e) {
  let imgid = $("#" + e.target.id).parent()[0].id;
  imgid = imgid.replaceAll("rowbtn-img-", "img-");

  const chartType = "pie";

  //create modal form
  FormConstractor("85%", "geContent");
  let div1 =
    '<div id="div1" class="row col-lg-3 col-md-8 col-xs-12" style="border-radius:4px; border:1px solid #ccc; padding:10px 5px 10px 25px; margin-left:10px"></div>';
  $("#contentM").append(div1);

  let div2 =
    '<div id="div2" class="col-lg-9 col-md-8 col-xs-12 " style="border-radius:4px;border:1px solid #ccc; padding:0px"><figure class="highcharts-figure">' +
    '<div id="containers"></div></figure></div>';
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
  for (let i = 0; i < 14; i++) {
    let div1Items =
      '<div id="div1Items-' +
      i +
      '" class=" col-lg-12 col-md-8 col-xs-12" style="margin:10px 0px 10px 0px;"></div>';
    $("#div1").append(div1Items);

    let lbl = document.createElement("label");
    lbl.innerText = ArrLbl[i] + ":";
    lbl.className = "lbl";
    lbl.style.float = "left";
    lbl.style.margin = "2px 0px 0px 200px";
    $("#div1Items-" + i).append(lbl);

    if (i == 2 || i == 6 || i == 7) {
      //dropDown
      let List = document.createElement("select");
      List.className = "selectBox";
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
      textBox.setAttribute("id", "text-" + i);
      textBox.style.border = "1px solid #ccc";
      textBox.style.left = "0px";
      textBox.style.position = "absolute";
      $("#div1Items-" + i).append(textBox);
    }
  }

  //===============================show chart ============================



  //create chart
  function showChart(chartType) {
    let _cat, _series, _name;

    //create chart function

    function chartItems(_series, _cat) {
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

      chartItems(_series, _cat);
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

      chartItems(_series, _cat);
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

      chartItems(_series, _cat);
    }

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
      chartItems(_series, _cat);
    }
  }

  //============================btn=====================
  // create btn
  let rowbtn = document.createElement("div");
  rowbtn.style.margin = "0px 10px";
  $("#chartModal").append(rowbtn);

  //btnShow
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

    //Dom
    const parser = new DOMParser();
    const docSvg = parser.parseFromString(svg_xml, "text/xml");

    // //get id
    // let getTag = docSvg.getElementsByTagName("clipPath")[0];
    // const getId = getTag.getAttribute("id");

    // //get svgTag
    // const svgTag = docSvg.getElementsByTagName("svg")[0];

    //base64
    let svg_Base64 = Base64.encode(svg_xml, false);

    //update chart
    $("#" + imgid).attr("src", "data:image/svg+xml;base64," + svg_Base64);
    localStorage.setItem("oldChart", svg_Base64);
    $("#myModal").remove();
    $("#" + imgid);
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
}
