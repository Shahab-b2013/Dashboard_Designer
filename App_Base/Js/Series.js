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
    '<div class="" style="height:300px;border-bottom:1px solid #ccc;margin-bottom:10px"><button class="Add_series btn btn-success" style="margin-bottom:10px;" onclick="Add_SeriesList()">افزودن<i class="glyphicon glyphicon-plus-sign" style="margin-right:5px;"></i></button><table  class="table  table-bordered">' +
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
    '</thead><tbody id="series_tbody" style="text-align: center;"></tbody></table></div>';
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
      '" class="btn btn-info glyphicon glyphicon-edit span onclick="Series_Edited(id)"><i>ویرایش</i></span>' +
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

function Add_SeriesList() {
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
    '<div class="" style="direction:ltr;margin-bottom:10px;border-bottom:1px solid #CCC;padding-bottom:10px;">' +
    '<label class="lblSeries">Label:<input type="text" id="text1" class="TextboxSeries"></label><br>' +
    '<label class="lblSeries">Name:<input type="text" id="text2" class="TextboxSeries" ></label><br>' +
    '<label class="lblSeries">DataExpresstion:<input type="text" id="text3" class="TextboxSeries" ></label><br>' +
    '<label class="lblSeries">Color:<input type="color" id="text4"></label><br>' +
    "</div>";
  $("#Add_seriesModal").append(form);

  //btnsubmit
  let Submit = btnSubmit("#Add_seriesModal");
  Submit.onclick = () => {
    //set ID
    let _ID = 0;
    let lastRow;
    let rowCount = SERIES.length;
    if (rowCount > 0) {
      lastRow = +SERIES[rowCount - 1].ID;
      _ID = lastRow + 1;
    } else {
      _ID = 1;
    }

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
      '" class="btn btn-danger glyphicon glyphicon-trash span" onclick="Series_Deleted(id)"><i>حذف</i></span>' +
      '<span id="Series_Edit_' +
      _ID +
      '" class="btn btn-info glyphicon glyphicon-edit span onclick="Series_Edited(id)"><i>ویرایش</i></span>' +
      "</td>" +
      "</tr>";

    $("#series_tbody").append(tbody);

    //cleae SERIES
    while (SERIES.length) {
      SERIES.pop();
    }

    //get list set series array
    $("#series_tbody tr").each(function () {
      const ID = $(this).find("td").eq(0).html();
      const Label = $(this).find("td").eq(1).html();
      const Name = $(this).find("td").eq(2).html();
      const DataExpresstion = $(this).find("td").eq(3).html();
      const Color = $(this).find("td").eq(4).html();

      SERIES.push({
        ID,
        Label,
        Name,
        DataExpresstion,
        Color,
      });
    });

    $("#Add_Series").remove();
  };

  //btn exit
  let Exit = btnExit("#Add_seriesModal");
  Exit.onclick = function () {
    $("#Add_Series").remove();
  };
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
function Series_Edited(e) {}
