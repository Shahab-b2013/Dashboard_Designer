function CommandText() {
  //   let div =
  //     '<div class="form-group">' +
  //     '<textarea class="form-control" id="commandText" rows="3"></textarea>' +
  //     "</div>";

  //   $("#myModal").append(div);
  let div =
    '<div id="myModalCommand" class="modal" style="padding-top: 150px;">' +
    '<div id="commandModal" class="modal-content">' +
    '<div id="contentCommand" class="row col-md-12" style=""></div>' +
    "</div>" +
    "</div>";
  $("#myModal").append(div);

  $("#myModalCommand").css("display", "block");
  $("#commandModal").css("width", "50%");

  let textArea =
    '<div ><textarea id="textArea" style="width:600px;height:200px;"></textarea></div>';
  $("#commandModal").append(textArea);

  //btnsubmit
  let btnSubmit = document.createElement("button");
  btnSubmit.className = "btn btn-primary";
  btnSubmit.style.margin = "0px 5px 0px 5px";
  btnSubmit.style.display = "inline";
  btnSubmit.style.float = "right";
  btnSubmit.innerText = "ذخیره";
  btnSubmit.onclick = () => {
    $("#item-2").val($("#textArea").val());
    $("#myModalCommand").remove();
  };
  $("#commandModal").append(btnSubmit);

  //btn exit
  let btnExit = document.createElement("button");
  btnExit.className = "btn btn-light";
  btnExit.style.display = "inline";
  btnExit.style.float = "right";
  btnExit.innerText = "لغو";
  btnExit.onclick = function () {
    $("#myModalCommand").remove();
  };
  $("#commandModal").append(btnExit);
}
