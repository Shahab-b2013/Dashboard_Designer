function SeriesFn() {
  let div =
    '<div id="myModalSeries" class="modal" style="padding-top: 150px;">' +
    '<div id="seriesModal" class="modal-content">' +
    '<div id="contentSeries" class="row col-md-12" style=""></div>' +
    "</div>" +
    "</div>";
  $("#myModal").append(div);

  $("#myModalSeries").css("display", "block");
  $("#seriesModal").css("width", "60%");

  let divGrid =
    '<div class="" style="height:300px !important;border-bottom:1px solid #ccc;margin-bottom:10px;display:contents;"><button id="btnAddTolist" class="btn btn-success" style="margin-bottom:15px;padding:5px;width:70px;height:34px;"' +
    'onclick="Form_Add_Series(id)">افزودن<i class="glyphicon glyphicon-plus-sign" style="margin:5px;"></i></button><table  class="table  table-bordered">' +
    "<thead>" +
    "<tr>" +
    '<th scope="col">ردیف</th>' +
    '<th scope="col">' +
    "عنوان" +
    "</th>" +
    //فعلا نمایش داده نشود
    // '<th scope="col">' +
    // "نام" +
    // "</th>" +
    '<th scope="col">' +
    "فیلد داده" +
    "</th>" +
    '<th scope="col">' +
    "رنگ" +
    "</th>" +
    '<th scope="col">' +
    "نوع" +
    "</th>" +
    '<th scope="col">' +
    "عملیات" +
    "</th>" +
    "</tr>" +
    '</thead><tbody id="series_tbody" ></tbody></table></div>';
  $("#seriesModal").append(divGrid);

  //onload list
  if (SERIES.length > 0) {
    let serrieID = 0;
    $.each(SERIES, function (index, item) {
      item.ID == undefined ? serrieID++ : (serrieID = item.ID);

      let tbody =
        "<tr>" +
        '<td scope="row">' +
        serrieID +
        "</td>" +
        '<td scope="row">' +
        item.Text +
        "</td>" +
        // '<td scope="row">' +
        // item.Name +
        // "</td>" +
        '<td scope="row">' +
        item.DataExpression +
        "</td>" +
        '<td scope="row">' +
        item.StyleColor +
        "</td>" +
        '<td scope="row">' +
        item.PlotType +
        "</td>" +
        '<td scope="row">' +
        '<span id="Series_Delete_' +
        item.ID +
        '" class="btn btn-danger glyphicon glyphicon-trash span" onclick="Series_Deleted(id)"><i>حذف</i></span>' +
        '<span id="Series_Edit_' +
        item.ID +
        '" class="btn btn-info glyphicon glyphicon-edit span" onclick="Series_Edited(id)"><i>ویرایش</i></span>' +
        "</td>" +
        "</tr>";

      $("#series_tbody").append(tbody);
    });
    if (CHARTTYPE == "pie") {
      if ($("table tr").length - 1 == 1)
        $("#btnAddTolist").attr("disabled", "disabled");
    }
  }

  //btnsubmit
  let Submit = btnSubmit("#seriesModal", "تایید");
  Submit.style.marginTop = "-10px";
  Submit.onclick = () => {
    //Save
    $("table tr").each(function (index, item) {
      if (index == 0) {
        SERIES_Clear();
      } else {
        let dataExpress = $(this).find("td").eq(2).html().split(",");
        let data = [];
        for (let i = 0; i < dataExpress.length; i++) {
          data.push(parseInt(dataExpress[i]));
        }

        SERIES.push({
          ID: +$(this).find("td").eq(0).html(),
          Text: $(this).find("td").eq(1).html(),
          Name: $(this).find("td").eq(2).html(),
          DataExpression: data,
          StyleColor: $(this).find("td").eq(3).html(),
          PlotType: $(this).find("td").eq(4).html(),
        });
      }
    });
    if (SERIES.length > 0) {
      //serie name1,name2,...
      let name = "";
      name = SERIES[0].Text;
      if (SERIES.length > 1)
        for (let i = 1; i < SERIES.length; i++) name += " , " + SERIES[i].Text;
      $("#item-7").val(name);

      //set color charts
      _LinePlotOptions.color = SERIES[0].StyleColor;
      //setting areaspline
      _AreaPlotOptions.color = SERIES[0].StyleColor;
      //setting bar
      _BarPlotOptions.color = SERIES[0].StyleColor;
      //setting column
      _ColumnPlotOptions.color = SERIES[0].StyleColor;
      //setting line
      _LinePlotOptions.color = SERIES[0].StyleColor;
      showChart(CHARTTYPE);
    } else {
      $("#item-7").val("");
    }
    //close modal
    $("#myModalSeries").remove();
  };

  //btn exit
  let Exit = btnExit("#seriesModal");
  Exit.style.marginTop = "-10px";
  Exit.onclick = () => {
    $("#myModalSeries").remove();
    sessionStorage.clear();
  };
}
function Form_Add_Series(Text, id) {
  let div =
    '<div id="Add_Series" class="modal" style="padding-top: 190px;">' +
    '<div id="Add_seriesModal" class="modal-content">' +
    '<div id="Add_contentSeries" class="row col-md-12" style=""></div>' +
    "</div>" +
    "</div>";
  $("#myModalSeries").append(div);

  $("#Add_Series").css("display", "block");
  $("#Add_seriesModal").css("width", "25%");
  let form =
    '<div class="" style="direction:rtl;border-bottom:1px solid #CCC;padding-bottom:10px;">' +
    '<label class="lblSeries">عنوان :<input type="text" id="text1" class="TextboxSeries"></label><br>' +
    // '<label class="lblSeries">نام :<input type="text" id="text2" class="TextboxSeries" ></label><br>' +//فعلا نمایش داده نشود
    '<label class="lblSeries">فیلد داده :<input type="text" id="text3" class="TextboxSeries" ></label><br>' +
    '<label class="lblSeries">رنگ :<input type="color" id="inputColor"></label><br>' +
    '<label class="lblSeries">نوع :<select id="PlotType" class="selectBox" style="width: 250px;margin: 0px;left: 20px;position: absolute;direction: ltr;">';
  if (CHARTTYPE == "pie") {
    form += '<option  value="pie">pie</option>';
  } else if (CHARTTYPE == "bar") {
    form += '<option  value="bar">bar</option>';
  } else {
    form +=
      '<option  value="column">column</option>' +
      '<option  value="line">line</option>' +
      '<option  value="areaspline">areaspline</option>';
  }

  form += "</select ></label><br>" + "</div>";
  $("#Add_seriesModal").append(form);
  $("#PlotType").val(CHARTTYPE);

  //btnsubmit
  let Submit = btnSubmit("#Add_seriesModal", "ثبت ");
  Text == "edit" ? (Submit.innerHTML = "ویرایش") : (Submit.innerHTML = "ثبت");
  Submit.onclick = () => {
    if (Text == "edit") {
      //put table
      let tr = $("#" + id)
        .parent()
        .parent();
      let rowID = tr.children().eq(0).html();

      sessionStorage.removeItem("putID");
      sessionStorage.removeItem("_id");
      sessionStorage.setItem("putID", rowID);
      sessionStorage.setItem("_id", id);
      tr.children().eq(1).html($("#text1").val());
      //فعلا نمایش داده نشود
      // tr.children().eq(2).html($("#text2").val());

      //check rows count for pie

      tr.children().eq(2).html($("#text3").val());
      tr.children().eq(3).html($("#inputColor").val());
      tr.children().eq(4).html($("#PlotType option:selected").val());

      //close
      $("#Add_Series").remove();
    } else {
      let _ID =
        $("table tr").length == 1
          ? 1
          : +$("table tr:last").children().eq(0).html() + 1;
      //Add to tbody in table

      let tbody =
        "<tr>" +
        '<td scope="row">' +
        _ID +
        "</td>" +
        '<td scope="row">' +
        $("#text1").val() +
        "</td>" +
        //فعلا نمایش داده نشود
        // '<td scope="row">' +
        // $("#text2").val() +
        // "</td>" +
        '<td scope="row">' +
        $("#text3").val() +
        "</td>" +
        '<td scope="row">' +
        $("#inputColor").val() +
        "</td>" +
        '<td scope="row">' +
        $("#PlotType option:selected").val() +
        "</td>" +
        '<td scope="row">' +
        '<span id="Series_Delete_' +
        _ID +
        '" class="btn btn-danger glyphicon glyphicon-trash span" onclick="Series_Deleted(id)"><i style="top:5px">حذف</i></span>' +
        '<span id="Series_Edit_' +
        _ID +
        '" class="btn btn-info glyphicon glyphicon-edit span" onclick="Series_Edited(id)"><i>ویرایش</i></span>' +
        "</td>" +
        "</tr>";

      $("#series_tbody").append(tbody);

      //close
      $("#Add_Series").remove();
      if (CHARTTYPE == "pie") {
        if ($("table tr").length - 1 == 1)
          $("#btnAddTolist").attr("disabled", "disabled");
      }
    }
  };
  //btn exit
  let Exit = btnExit("#Add_seriesModal");
  Exit.onclick = () => {
    $("#Add_Series").remove();
    sessionStorage.clear();
  };
}

function Series_Deleted(id) {
  let tr = $("#" + id)
    .parent()
    .parent();

  // remove from list
  tr.remove();

  //set session rowID for remove array
  let rowID = tr.children().eq(0).html();
  sessionStorage.removeItem("deleteID");
  sessionStorage.setItem("deleteID", rowID);
  if ($("table tr").length - 1 < 1) $("#btnAddTolist").removeAttr("disabled");
}
function Series_Edited(id) {
  let tr = $("#" + id)
    .parent()
    .parent();
  Form_Add_Series("edit", id);

  //set Form_Add_Series Items
  $("#text1").val(tr.children().eq(1).html());
  $("#text3").val(tr.children().eq(2).html());
  $("#inputColor").val(tr.children().eq(3).html());
  $("#PlotType").val(tr.children().eq(4).html());
}

function SERIES_Clear() {
  SERIES = [];
}
