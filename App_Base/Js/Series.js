function Series() {
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
    '<div class="" style="height:300px !important;border-bottom:1px solid #ccc;margin-bottom:10px;display:contents;"><button id="btnAddTolist" class="btn btn-success" style="margin-bottom:15px;padding:5px;width:70px;height:34px;" onclick="Form_Add_Series()">افزودن<i class="glyphicon glyphicon-plus-sign" style="margin:5px;"></i></button><table  class="table  table-bordered">' +
    "<thead>" +
    "<tr>" +
    '<th scope="col">ردیف</th>' +
    '<th scope="col">' +
    "عنوان" +
    "</th>" +
    '<th scope="col">' +
    "نام" +
    "</th>" +
    '<th scope="col">' +
    "فیلد داده ای" +
    "</th>" +
    '<th scope="col">' +
    "رنگ" +
    "</th>" +
    "</th>" +
    '<th scope="col">' +
    "عملیات" +
    "</th>" +
    "</tr>" +
    '</thead><tbody id="series_tbody" ></tbody></table></div>';
  $("#seriesModal").append(divGrid);

  //onload list
  $.each(SERIES, function (index, item) {
    let tbody =
      "<tr>" +
      '<td scope="row">' +
      item.ID +
      "</td>" +
      '<td scope="row">' +
      item.Label +
      "</td>" +
      '<td scope="row">' +
      item.Name +
      "</td>" +
      '<td scope="row">' +
      item.DataExpresstion +
      "</td>" +
      '<td scope="row">' +
      item.Color +
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

  //btnsubmit
  let Submit = btnSubmit("#seriesModal");
  Submit.onclick = () => {
    $("#myModalSeries").remove();
  };

  //btn exit
  let Exit = btnExit("#seriesModal");
  Exit.onclick = () => $("#myModalSeries").remove();
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
  $("#Add_seriesModal").css("width", "20%");

  let form =
    '<div class="" style="direction:rtl;margin-bottom:10px;border-bottom:1px solid #CCC;padding-bottom:10px;">' +
    '<label class="lblSeries">عنوان:<input type="text" id="text1" class="TextboxSeries"></label><br>' +
    '<label class="lblSeries">نام:<input type="text" id="text2" class="TextboxSeries" ></label><br>' +
    '<label class="lblSeries">فیلد داده ای:<input type="text" id="text3" class="TextboxSeries" ></label><br>' +
    '<label class="lblSeries">رنگ:<input type="color" id="text4"></label><br>' +
    "</div>";
  $("#Add_seriesModal").append(form);

  //btnsubmit
  let Submit = btnSubmit("#Add_seriesModal");
  Text == "edit" ? (Submit.innerHTML = "ویرایش") : (Submit.innerHTML = "ذخیره");
  Submit.onclick = () => {
    if (Text == "edit") {
      //put SERIES
      let tr = $("#" + id)
        .parent()
        .parent();
      let rowID = tr.children().eq(0).html();
      let Element = SERIES.find((Element) => Element.ID == rowID);
      Element.Label = $("#text1").val();
      Element.Name = $("#text2").val();
      Element.DataExpresstion = $("#text3").val();
      Element.Color = $("#text4").val();

      //put table
      tr.children().eq(1).html($("#text1").val());
      tr.children().eq(2).html($("#text2").val());
      tr.children().eq(3).html($("#text3").val());
      tr.children().eq(4).html($("#text4").val());

      //close
      $("#Add_Series").remove();
    } else {
      //set ID
      let _ID = SERIES.length > 0 ? +SERIES[SERIES.length - 1].ID + 1 : 1;

      //Add to tbody in table
      let tbody =
        "<tr>" +
        '<td scope="row">' +
        _ID +
        "</td>" +
        '<td scope="row">' +
        $("#text1").val() +
        "</td>" +
        '<td scope="row">' +
        $("#text2").val() +
        "</td>" +
        '<td scope="row">' +
        $("#text3").val() +
        "</td>" +
        '<td scope="row">' +
        $("#text4").val() +
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

      //set SERIES
      const ID = _ID;
      const Label = $("#text1").val();
      const Name = $("#text2").val();
      const DataExpresstion = $("#text3").val();
      const Color = $("#text4").val();
      SERIES.push({
        ID,
        Label,
        Name,
        DataExpresstion,
        Color,
      });

      //close
      $("#Add_Series").remove();
    }
  };
  //btn exit
  let Exit = btnExit("#Add_seriesModal");
  Exit.onclick = () => $("#Add_Series").remove();
}

function Series_Deleted(id) {
  let tr = $("#" + id)
    .parent()
    .parent();

  // remove from list
  tr.remove();

  //remove form array
  let rowID = tr.children().eq(0).html();
  SERIES.splice(
    SERIES.findIndex((Element) => Element.ID == rowID),
    1
  );
}
function Series_Edited(id) {
  let tr = $("#" + id)
    .parent()
    .parent();
  let rowID = tr.children().eq(0).html();

  Form_Add_Series("edit", id);

  //set Form_Add_Series Items
  let items = SERIES.find((Element) => Element.ID == rowID);
  $("#text1").val(items.Label);
  $("#text2").val(items.Name);
  $("#text3").val(items.DataExpresstion);
  $("#text4").val(items.Color);
}
