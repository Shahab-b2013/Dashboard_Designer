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
    '<div class="" style="height:300px;border-bottom:1px solid #ccc;margin-bottom:10px"><button class="Add_series btn btn-success" onclick="Add_SeriesList()">افزودن<i class="glyphicon glyphicon-plus-sign" style="margin-right:5px;"></i></button><table  class="table">' +
    "<thead>" +
    "<tr>" +
    '<th scope="col">ردیف</th>' +
    '<th scope="col">' +
    "نام سری" +
    "</th>" +
    '<th scope="col">' +
    "متن سری" +
    "</th>" +
    '<th scope="col">' +
    "توضیحات" +
    "</th>" +
    "</tr>" +
    '</thead><tbody id="series_tbody" style="text-align: center;"></tbody></table></div>';
  $("#seriesModal").append(divGrid);

  //btnsubmit
  let btnSubmit = document.createElement("button");
  btnSubmit.className = "btn btn-primary";
  btnSubmit.style.margin = "0px 5px 0px 5px";
  btnSubmit.style.display = "inline";
  btnSubmit.style.float = "right";
  btnSubmit.innerText = "ذخیره";
  btnSubmit.onclick = () => {
    $("#item-9").val("Name1,Name2,...");
    $("#myModalSeries").remove();
  };
  $("#seriesModal").append(btnSubmit);

  //btn exit
  let btnExit = document.createElement("button");
  btnExit.className = "btn btn-light";
  btnExit.style.display = "inline";
  btnExit.style.float = "right";
  btnExit.innerText = "لغو";
  btnExit.onclick = function () {
    $("#myModalSeries").remove();
  };
  $("#seriesModal").append(btnExit);
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
    '<div class="" style="height:100px;"><label class="lbl">نام سری :</label><input type="text" id="text1" class="Textbox" style="right:100px;"></br><label class="lbl">متن سری :</label><input type="text" id="text2" class="Textbox" style="right:100px;"></div>';
  $("#Add_seriesModal").append(form);

  //btnsubmit
  let btnSubmit = document.createElement("button");
  btnSubmit.className = "btn btn-primary";
  btnSubmit.style.margin = "0px 5px 0px 5px";
  btnSubmit.style.display = "inline";
  btnSubmit.style.float = "right";
  btnSubmit.innerText = "ذخیره";
  btnSubmit.onclick = () => {
    let rowCount = $("#series_tbody tr").length + 1;

    let tbody =
      "<tr>" +
      '<th scope="row">' +
      rowCount +
      "</th>" +
      "<td>" +
      $("#text1").val() +
      "</td>" +
      "<td>" +
      $("#text1").val() +
      "</td>" +
      "</tr>";

    $("#series_tbody").append(tbody);
    $("#Add_Series").remove();
  };
  $("#Add_seriesModal").append(btnSubmit);

  //btn exit
  let btnExit = document.createElement("button");
  btnExit.className = "btn btn-light";
  btnExit.style.display = "inline";
  btnExit.style.float = "right";
  btnExit.innerText = "لغو";
  btnExit.onclick = function () {
    $("#Add_Series").remove();
  };
  $("#Add_seriesModal").append(btnExit);
}
