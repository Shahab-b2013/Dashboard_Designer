
// function Chart(chartType){
//   let pngChart = '_pie'//chartType
//   if (
//     pngChart === _pie ||
//     pngChart === _column ||
//     pngChart === _bar ||
//     pngChart === _line ||
//     pngChart === _area ||
//       )
  
  //   var chartSvg;
  //   let container = document.createElement("div");
  //   container.className = "containerside";
  //   this.container = container;

  //   let divRow = document.createElement("div");
  //   divRow.setAttribute("id", "divRow");
  //   divRow.style.marginTop = "0px";
  //   container.appendChild(divRow);

  //   let div0 = document.createElement("div");
  //   div0.style.border = "1px solid #E6E6E6";
  //   div0.style.width = "24%";
  //   div0.style.height = "620px";
  //   div0.style.paddingTop = "20px";
  //   div0.style.direction = "rtl";
  //   div0.style.float = "right";
  //   divRow.appendChild(div0);

  //   let div1 = document.createElement("div");
  //   div1.style.border = "1px solid #E6E6E6";
  //   div1.style.borderRadius = "4px";
  //   div1.setAttribute("id", "div1");
  //   div1.style.width = "75%";
  //   div1.style.height = "620px";
  //   div1.style.float = "left";
  //   divRow.appendChild(div1);

  //   let div2 = document.createElement("div");
  //   div2.style.marginBottom = "0px";
  //   container.appendChild(div2);

  //   //figure Tag
  //   let figure = document.createElement("figure");
  //   figure.setAttribute("id", "figure");
  //   figure.className = "highcharts-figure";
  //   div1.appendChild(figure);

  //   let divchart = document.createElement("div");
  //   divchart.setAttribute("id", "containers");
  //   figure.appendChild(divchart);

  //   //create TextBox/Label function
  //   function Textbox(innerHtml, id) {
  //     let row = document.createElement("div");
  //     row.className = "row";
  //     div0.appendChild(row);

  //     let text = document.createElement("input");
  //     text.className = "texthead";
  //     text.setAttribute("id", id);
  //     row.appendChild(text);

  //     let lbl = document.createElement("label");
  //     lbl.setAttribute("id", "chartLbl");
  //     lbl.style.cursor = "default";
  //     lbl.innerHTML = innerHtml + ":";
  //     row.appendChild(lbl);
  //   }

  //   // text
  //   let textRow = document.createElement("div");
  //   textRow.style.height = "30px";
  //   textRow.style.width = "100%";
  //   textRow.style.margin = "15px 0px 15px 10px";
  //   textRow.style.paddingLeft = "40px";
  //   div0.appendChild(textRow);

  //   let text = document.createElement("input");
  //   text.className = "texthead";
  //   text.setAttribute("id", "textid");
  //   text.addEventListener("input", function () {
  //     if (this.value.length > 20) {
  //       this.style.width = this.value.length * 8 + "px";
  //     }
  //   });
  //   textRow.appendChild(text);

  //   let lbl = document.createElement("label");
  //   lbl.setAttribute("id", "chartLbl");
  //   lbl.style.cursor = "default";
  //   lbl.innerHTML = "Text" + ":";
  //   textRow.appendChild(lbl);

  //   // name
  //   Textbox("Name", "name");

  //   //typeChart
  //   let row = document.createElement("div");
  //   row.className = "row";
  //   div0.appendChild(row);

  //   let type = document.createElement("select");
  //   type.className = "selecthead";
  //   type.setAttribute("id", "selectType");
  //   type.style.width = "167px";
  //   row.appendChild(type);

  //   let typeArray = ["line", "areaspline", "column", "bar", "pie"];
  //   typeArray.map((x) => {
  //     let opt = document.createElement("option");
  //     opt.text = x;
  //     type.appendChild(opt);
  //   });

  //   //
  //   let typeLbl = document.createElement("label");
  //   typeLbl.innerHTML = " chartType:";
  //   typeLbl.setAttribute("id", "chartLbl");
  //   typeLbl.style.cursor = "default";
  //   row.appendChild(typeLbl);

  //   // categoryLabel
  //   Textbox("categoryLabel", "categoryLabel");

  //   // valueLabel
  //   Textbox("valueLabel", "valueLabel");

  //   // categoryName
  //   Textbox("categoryName", "categoryName");

  //   // categoryExpression
  //   let row1 = document.createElement("div");
  //   row1.className = "row";
  //   div0.appendChild(row1);

  //   let json = sessionStorage.getItem("subjson");
  //   json = JSON.parse(json);
  //   let cols = json.poolDetails.table.columns;
  //   let catData = document.createElement("select");
  //   catData.setAttribute("id", "catSelect");
  //   catData.style.width = "167px";
  //   catData.className = "selecthead";
  //   catData.onclick = () => Operators.onclick();
  //   row1.appendChild(catData);
  //   for (let i in cols) {
  //     let opt = document.createElement("option");
  //     opt.text = cols[i].data;
  //     catData.appendChild(opt);
  //   }
  //   //
  //   let catDataLbl = document.createElement("label");
  //   catDataLbl.innerHTML = " catExpression:";
  //   catDataLbl.setAttribute("id", "chartLbl");
  //   catDataLbl.style.cursor = "default";
  //   row1.appendChild(catDataLbl);

  //   // 'Operators '
  //   let row2 = document.createElement("div");
  //   row2.className = "row";
  //   div0.appendChild(row2);
  //   //

  //   let Operators = document.createElement("select");
  //   Operators.setAttribute("id", "oprSelect");
  //   Operators.style.width = "167px";
  //   Operators.className = "selecthead";
  //   Operators.onclick = () => {
  //     $("#dataExpression").val(
  //       Operators.value + "(" + catData.options[catData.selectedIndex].value + ")"
  //     );
  //   };
  //   row2.appendChild(Operators);

  //   let operator = ["Sum", "Avg", "Count", "Max", "Min"];
  //   operator.map((x) => {
  //     let opt = document.createElement("option");
  //     opt.text = x;
  //     Operators.appendChild(opt);
  //   });

  //   //
  //   let OperatorsLbl = document.createElement("label");
  //   OperatorsLbl.innerHTML = " Operators:";
  //   OperatorsLbl.setAttribute("id", "chartLbl");
  //   OperatorsLbl.style.cursor = "default";
  //   row2.appendChild(OperatorsLbl);

  //   // dataExpression
  //   Textbox("dataExpression", "dataExpression");

  //   // serieText
  //   Textbox("seriesText", "seriesText");

  //   // serieName
  //   Textbox("seriesName", "seriesName");

  //   // seriesType
  //   Textbox("seriesType", "seriesType");

  //   // StlyeColor
  //   let row3 = document.createElement("div");
  //   row3.className = "row";
  //   row3.style.paddingLeft = "169px";
  //   div0.appendChild(row3);

  //   let inpuColor = document.createElement("input");
  //   inpuColor.className = "texthead";
  //   inpuColor.type = "color";
  //   inpuColor.style.width = "70px";
  //   inpuColor.style.marginLeft = "10px";
  //   inpuColor.value = "#8eb4f1";
  //   inpuColor.setAttribute("id", "StlyeColor");
  //   row3.appendChild(inpuColor);

  //   let lblColor = document.createElement("label");
  //   lblColor.setAttribute("id", "chartLbl");
  //   lblColor.innerHTML = "StlyeColor" + ":";
  //   row3.appendChild(lblColor);

  //   // version
  //   Textbox("version", "version");

  //   //set DataChart
  //   function showChart(chartType) {
  //     chart(chartType);
  //   }

  //   //create chart
  //   function chart(chartType) {
  //     let _cat, _series, _name;

  //     //create chart function

  //     function chartItems(_series, _cat) {
  //       _TitleOptions.text = $("#textid").val();
  //       _GeneralOptions.type = chartType;
  //       _YAxisOptions.title.text = $("#valueLabel").val();
  //       _XAxisOptions.categories = _cat;
  //       _SeriesPlotOptions.color = $("#StlyeColor").val();

  //       if (chartType == "pie") {
  //         _GeneralOptions.options3d.enabled = true;
  //         _LegendOptions.enabled = true;
  //       } else {
  //         _GeneralOptions.options3d.enabled = false;
  //         _LegendOptions.enabled = false;
  //       }

  //       chartSvg = Highcharts.chart("containers", {
  //         chart: _GeneralOptions,
  //         colors: _ColorsOptions,
  //         credits: _CreditsOptions,
  //         legend: _LegendOptions,
  //         title: _TitleOptions,
  //         xAxis: _XAxisOptions,
  //         yAxis: _YAxisOptions,
  //         plotOptions: {
  //           series: _SeriesPlotOptions,
  //           areaspline: _AreaPlotOptions,
  //           bar: _BarPlotOptions,
  //           column: _ColumnPlotOptions,
  //           line: _LinePlotOptions,
  //           pie: _PiePlotOptions,
  //         },
  //         series: _series,
  //       });
  //     }

  //     //pie
  //     if (chartType == "pie") {
  //       _cat = "";
  //       _name = $("#catSelect").val();
  //       _series = [
  //         {
  //           name: _name,
  //           data: [
  //             ["value1", 8],
  //             ["value2", 7],
  //             ["value3", 2],
  //             ["value4", 1],
  //             ["value5", 5],
  //           ],
  //         },
  //       ];

  //       chartItems(_series, _cat);
  //     }

  //     // bar
  //     else if (chartType == "bar") {
  //       _cat = ["Africa", "America", "Asia", "Europe", "Oceania"];
  //       _name = $("#catSelect").val();
  //       _series = [
  //         {
  //           name: _name,
  //           data: [
  //             ["value1", 8],
  //             ["value2", 7],
  //             ["value3", 2],
  //             ["value4", 1],
  //             ["value5", 5],
  //           ],
  //         },
  //       ];

  //       chartItems(_series, _cat);
  //     }

  //     //line
  //     else if (chartType == "line") {
  //       _cat = [
  //         "value1",
  //         "value2",
  //         "value3",
  //         "value4",
  //         "value5",
  //         "value6",
  //         "value7",
  //         "value8",
  //         "value9",
  //       ];
  //       _name = $("#catSelect").val();
  //       _series = [
  //         {
  //           name: _name,
  //           data: [2, 1, 1, 1, 1, 5, 3, 3, 1],
  //         },
  //       ];

  //       chartItems(_series, _cat);
  //     }

  //     //areaspline
  //     else if (chartType == "areaspline") {
  //       _cat = [
  //         "value1",
  //         "value2",
  //         "value3",
  //         "value4",
  //         "value5",
  //         "value6",
  //         "value7",
  //       ];
  //       _name = $("#catSelect").val();

  //       _series = [
  //         {
  //           name: _name,
  //           data: [1, 2, 1, 2, 1, 1, 1],
  //         },
  //       ];
  //       chartItems(_series, _cat);
  //     }
  //   }

  //   //onload chart

  //   if (svgChart !== -1) {
  //     //get id in svg
  //     let oldSvg = Action.AttribVal("base64", oldChart);
  //     oldSvg = Base64.decode(oldSvg, false);
  //     let parser = new DOMParser();
  //     parser = parser.parseFromString(oldSvg, "text/xml");
  //     let docSvg = parser;
  //     let getTag = docSvg.getElementsByTagName("clipPath")[0];
  //     let getId = getTag.getAttribute("id");
  //     var oldId = getId;

  //     //search id in sessionKey
  //     for (let i = 0; i < sessionStorage.length; i++) {
  //       if (sessionStorage.key(i) === getId) {
  //         //set items
  //         let session = sessionStorage.getItem(sessionStorage.key(i));
  //         var oldtext = Action.AttribVal(";text", session);
  //         var oldname = Action.AttribVal(";name", session);
  //         var oldchartType = Action.AttribVal(";type", session);
  //         var oldcategoryLabel = Action.AttribVal(";categoryLabel", session);
  //         var oldvalueLabel = Action.AttribVal(";valueLabel", session);
  //         var oldcategoryName = Action.AttribVal(";categoryName", session);
  //         var olddataExpression = Action.AttribVal(";dataExpression", session);
  //         var operation = olddataExpression.split("(")[0];
  //         var dataName = olddataExpression.split("(")[1];
  //         dataName = dataName.substring(0, dataName.length - 1);
  //         var oldseriesText = Action.AttribVal(";seriesText", session);
  //         var oldseriesName = Action.AttribVal(";seriesName", session);
  //         var oldseriesType = Action.AttribVal(";seriesType", session);
  //         var oldStlyeColor = Action.AttribVal(";StlyeColor", session);
  //         var oldversion = Action.AttribVal(";version", session);
  //       }

  //       //show select and textbox
  //       setTimeout(() => {
  //         $("#textid ").val(oldtext);
  //         $("#name ").val(oldname);
  //         $("#selectType").val(oldchartType);
  //         $("#categoryLabel").val(oldcategoryLabel);
  //         $("#valueLabel").val(oldvalueLabel);
  //         $("#categoryName").val(oldcategoryName);
  //         $("#dataExpression").val(olddataExpression);
  //         $("#catSelect").val(dataName);
  //         $("#oprSelect").val(operation);
  //         $("#seriesText").val(oldseriesText);
  //         $("#seriesName").val(oldseriesName);
  //         $("#seriesType").val(oldseriesType);
  //         $("#StlyeColor").val(oldStlyeColor);
  //         $("#version").val(oldversion);
  //       }, 1);

  //       //show function chart
  //       setTimeout((div1.onload = () => showChart(oldchartType)), 30);
  //     }
  //   }

  //   //************************btn****************************

  //   //rowbtn
  //   let rowbtn = document.createElement("div");
  //   rowbtn.style.margin = "10px 0px 10px 10px";
  //   div2.appendChild(rowbtn);

  //   //btnShow
  //   let btnShow = document.createElement("button");
  //   btnShow.className = "btn btn-primary";
  //   btnShow.style.backgroundColor = "#134C96";
  //   btnShow.style.width = "100px";
  //   btnShow.style.borderRadius = "4px";
  //   btnShow.innerHTML = "پیش نمایش";
  //   btnShow.onclick = () => showChart($("#selectType").val());
  //   rowbtn.appendChild(btnShow);

  //   //btnsubmit
  //   let btnSubmit = document.createElement("button");
  //   btnSubmit.className = "btn btn-primary";
  //   btnSubmit.style.borderRadius = "4px";
  //   btnSubmit.style.margin = "10px 10px 10px 10px";
  //   btnSubmit.innerText = "ذخیره";
  //   btnSubmit.onclick = function () {
  //     //old Id remove by sessionStorage
  //     sessionStorage.removeItem(oldId);

  //     //get svgid
  //     var svg_xml = chartSvg.getSVG();
  //     let parser = new DOMParser();
  //     let docSvg = parser.parseFromString(svg_xml, "text/xml");
  //     let getTag = docSvg.getElementsByTagName("clipPath")[0];
  //     let getId = getTag.getAttribute("id");
  //     svg_xml = '<?xml version="1.0" standalone="no"?>' + svg_xml;
  //     let svg_Base64 = Base64.encode(svg_xml, false);

  //     // setItem svgBase64 to sesseionStorage

  //     let series =
  //       "seriesName:" +
  //       $("#seriesName").val() +
  //       ";" +
  //       "seriesText:" +
  //       $("#seriesText").val() +
  //       ";" +
  //       "dataExpression:" +
  //       $("#dataExpression").val() +
  //       ";" +
  //       "plotType:" +
  //       $("#selectType").val() +
  //       ";" +
  //       "StlyeColor:" +
  //       $("#StlyeColor").val() +
  //       ";";

  //     sessionStorage.setItem(
  //       "oldChart",
  //       "image;html=1;image=data:image/svg+xml," + svg_Base64
  //     );
  //     sessionStorage.setItem(
  //       getId,
  //       "image;html=1;image=data:image/svg+xml," +
  //       svg_Base64 +
  //       ";" +
  //       "id:" +
  //       getId +
  //       ";" +
  //       "name:" +
  //       $("#name").val() +
  //       ";" +
  //       "text:" +
  //       $("#textid").val() +
  //       ";" +
  //       "type:" +
  //       $("#selectType").val() +
  //       ";" +
  //       "categoryLabel:" +
  //       $("#categoryLabel").val() +
  //       ";" +
  //       "valueLabel:" +
  //       $("#valueLabel").val() +
  //       ";" +
  //       "categoryName:" +
  //       $("#categoryName").val() +
  //       ";" +
  //       "categoryExpression:" +
  //       $("#catSelect").val() +
  //       ";" +
  //       "seriesType:" +
  //       $("#seriesType").val() +
  //       ";" +
  //       "version:" +
  //       $("#version").val() +
  //       ";" +
  //       series
  //     );

  //     //load chart
  //     Action.loadChart("data:image/svg+xml," + svg_Base64);

  //     //exit
  //     editorUi.hideDialog();
  //   };
  //   rowbtn.appendChild(btnSubmit);

  //   //btn exit
  //   let btnExit = document.createElement("button");
  //   btnExit.className = "btn btn-light";
  //   btnExit.style.borderRadius = "4px";
  //   btnExit.style.float = "right";
  //   btnExit.innerText = "لغو";
  //   btnExit.onclick = function () {
  //     editorUi.hideDialog();
  //   };
  //   rowbtn.appendChild(btnExit);
  // } else {
  //   Action.Image();
  // }
// }

