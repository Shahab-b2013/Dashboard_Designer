function chartEdit(e) {
  const chartType = "pie";
  console.log(chartType);

  //create modal form
  ConstractorForm("85%");
  let div1 =
    '<div id="div1" class="row col-lg-3 col-md-8 col-xs-12" style="border-radius:4px; border:1px solid #ccc; padding:10px 5px 10px 25px; margin-left:10px"></div>';
  $("#contentM").append(div1);

  let div2 =
    '<div id="div2" class="col-lg-9 col-md-8 col-xs-12 " style="border-radius:4px;border:1px solid #ccc; padding:0px"><figure class="highcharts-figure">' +
    '<div id="container"></div></figure></div>';
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

  //============================btn=====================
  //create btn
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
  rowbtn.appendChild(btnShow);

  //btnsubmit
  let btnSubmit = document.createElement("button");
  btnSubmit.className = "btn btn-primary";
  btnSubmit.style.borderRadius = "4px";
  btnSubmit.style.margin = "10px 10px 10px 10px";
  btnSubmit.innerText = "ذخیره";
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

  if (chartType == "pie") {
    let chart = Highcharts.chart("container", {
      chart: {
        type: "pie",
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      },
      title: {
        text: "Browser market shares at a specific website, 2014",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          depth: 35,
          dataLabels: {
            enabled: true,
            format: "{point.name}",
          },
        },
      },
      series: [
        {
          type: "pie",
          name: "Browser share",
          data: [
            ["Firefox", 45.0],
            ["IE", 26.8],
            {
              name: "Chrome",
              y: 12.8,
              sliced: true,
              selected: true,
            },
            ["Safari", 8.5],
            ["Opera", 6.2],
            ["Others", 0.7],
          ],
        },
      ],
    });

    $("#div2").append(chart);
  }
}
