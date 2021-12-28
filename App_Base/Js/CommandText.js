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
  let Submit = btnSubmit("#commandModal");
  Submit.onclick = () => {
    $("#item-2").val($("#textArea").val());
    $("#myModalCommand").remove();
  };

  //btn exit
  let Exit = btnExit("#commandModal");
  Exit.onclick = () => $("#myModalCommand").remove();
}
