function FormView() {
  var _reportID = +"125" >= 3000000 ? id : 5;

  var _objKeys = "";

  var _parObjType = -1;

  var _json = {
    FormID: 1010300,
    Name: "Create New User",
    ItemsGrouping: true,
    ColumnLayout: "OnceColumn",
    ColumnWidth: "default",
    Label: "داشبورد",
    Icon: "User.png",
    ActivityID: 1010300,
    DataActivityID: "",
    charts: [
      {
        FormItemID: 101030007,
        ActivityParamID: 101030007,
        ActionControlID: "",
        Label: "پست الکترونیکی",
        Type: "pie",
        FormID: 1010300,
        ColumnIndex: 0,
        ActivityID: 1010300,
        EntityAttributeID: 1010310,
        FormGroupBoxID: 10103000,

        id: "highcharts-5vfb926-165-",
        name: "",
        text: "",
        type: "pie",
        categoryLabel: "#empty",
        valueLabel: "#empty",
        categoryName: "",
        categoryExpression: "[data2]",
        seriesType: "",
        version: "",
        series: [
          {
            name: "",
            text: "",
            dataExpression: "Sum([data2])",
            plotType: "pie",
            StlyeColor: "#8eb4f1",
            version: "",
          },
        ],
        style: localStorage.getItem("oldChart"),
      },
      {
        FormItemID: 101030007,
        ActivityParamID: 101030007,
        ActionControlID: "",
        Label: "پست الکترونیکی",
        Type: "pie",
        FormID: 1010300,
        ColumnIndex: 1,
        ActivityID: 1010300,
        EntityAttributeID: 1010310,
        FormGroupBoxID: 10103000,

        id: "highcharts-5vfb926-165-",
        name: "",
        text: "",
        type: "pie",
        categoryLabel: "#empty",
        valueLabel: "#empty",
        categoryName: "",
        categoryExpression: "[data2]",
        seriesType: "",
        version: "",
        series: [
          {
            name: "",
            text: "",
            dataExpression: "Sum([data2])",
            plotType: "pie",
            StlyeColor: "#8eb4f1",
            version: "",
          },
        ],
        style: sessionStorage.getItem("oldChart"),
      },
      {
        FormItemID: 101030007,
        ActivityParamID: 101030007,
        ActionControlID: "",
        Label: "پست الکترونیکی",
        Type: "pie",
        FormID: 1010300,
        ColumnIndex: 0,
        ActivityID: 1010300,
        EntityAttributeID: 1010310,
        FormGroupBoxID: 10103001,

        id: "highcharts-5vfb926-165-",
        name: "",
        text: "",
        type: "pie",
        categoryLabel: "#empty",
        valueLabel: "#empty",
        categoryName: "",
        categoryExpression: "[data2]",
        seriesType: "",
        version: "",
        series: [
          {
            name: "",
            text: "",
            dataExpression: "Sum([data2])",
            plotType: "pie",
            StlyeColor: "#8eb4f1",
            version: "",
          },
        ],
        style: sessionStorage.getItem("oldChart"),
      },
      {
        FormItemID: 101030007,
        ActivityParamID: 101030007,
        ActionControlID: "",
        Label: "پست الکترونیکی",
        Type: "pie",
        FormID: 1010300,
        ColumnIndex: 1,
        ActivityID: 1010300,
        EntityAttributeID: 1010310,
        FormGroupBoxID: 10103001,

        id: "highcharts-5vfb926-165-",
        name: "",
        text: "",
        type: "pie",
        categoryLabel: "#empty",
        valueLabel: "#empty",
        categoryName: "",
        categoryExpression: "[data2]",
        seriesType: "",
        version: "",
        series: [
          {
            name: "",
            text: "",
            dataExpression: "Sum([data2])",
            plotType: "pie",
            StlyeColor: "#8eb4f1",
            version: "",
          },
        ],
        style: sessionStorage.getItem("oldChart"),
      },
    ],
    // {
    //   id: "highcharts-5vfb926-165-",
    //   name: "",
    //   text: "",
    //   type: "pie",
    //   categoryLabel: "#empty",
    //   valueLabel: "#empty",
    //   categoryName: "",
    //   categoryExpression: "[data2]",
    //   seriesType: "",
    //   version: "",
    //   series: [
    //     {
    //       name: "",
    //       text: "",
    //       dataExpression: "Sum([data2])",
    //       plotType: "pie",
    //       StlyeColor: "#8eb4f1",
    //       version: "",
    //     },
    //   ],
    //   style:

    //   },
    // {
    //       id: "highcharts-sltsk21-124-",
    //       name: "",
    //       text: "sef",
    //       type: "areaspline",
    //       categoryLabel: "#empty",
    //       valueLabel: "#empty",
    //       categoryName: "",
    //       categoryExpression: "[data2]",
    //       seriesType: "",
    //       version: "23",
    //       series: [
    //         {
    //           name: "",
    //           text: "",
    //           dataExpression: "Sum([data2])",
    //           plotType: "areaspline",
    //           StlyeColor: "#bbc2ce",
    //           version: "23",
    //         },
    //       ],
    //       style:
    //        ;;parent=35;x=910;y=0;width=460;height=400;",
    //     },
    //   ],

    FormGroupBoxs: [
      {
        FormGroupBoxID: 10103000,
        FormID: 1010300,
        Name: "Personal Info",
        Label: "",
        GroupIndex: 0,
        GroupDisplayMode: "GroupWithBox",
        ColumnLayout: "OnceColumn",
        ColumnWidth: "default",
        Visibility: "",
        Enabled: true,
        Version: "1.1.0.core",
        Description: "",
      },

      {
        FormGroupBoxID: 10103001,
        FormID: 1010300,
        Name: "Job Info",
        Label: "اطلاعات سازمانی",
        GroupIndex: 1,
        GroupDisplayMode: "GroupWithBox",
        ColumnLayout: "TwoColumn",
        ColumnWidth: "default",
        Visibility: "",
        Enabled: true,
        Version: "1.1.0.core",
        Description: "",
      },
      // {
      //   FormGroupBoxID: 10103002,
      //   FormID: 1010300,
      //   Name: "Contact Info",
      //   Label: "اطلاعات تماس",
      //   GroupIndex: 2,
      //   GroupDisplayMode: "GroupWithBox",
      //   ColumnLayout: "TwoColumn",
      //   ColumnWidth: "default",
      //   Visibility: "",
      //   Enabled: true,
      //   Version: "1.1.0.core",
      //   Description: "",
      // },
      // {
      //   FormGroupBoxID: 10103003,
      //   FormID: 1010300,
      //   Name: "Other Info",
      //   Label: "سایر",
      //   GroupIndex: 3,
      //   GroupDisplayMode: "GroupWithBox",
      //   ColumnLayout: "OnceColumn",
      //   ColumnWidth: "default",
      //   Visibility: "",
      //   Enabled: true,
      //   Version: "1.1.0.core",
      //   Description: "",
      // },
    ],
  };
  var _formGroups = _json;
  var content;
  var bodyID = "#geContent";

  //#region Render Form Items Layout & Grouping

  if (_formGroups.ItemsGrouping) {
    // _formGroups = _form.groups;

    try {
      $.each(_formGroups.FormGroupBoxs, function (index, formGroup) {
        content =
          '<div  style="' +
          (formGroup.Visibility == "DefaultHidden" ? "display:none" : "") +
          '" id="form-group-' +
          formGroup.FormGroupBoxID +
          '"  class="row form-group-box"  ondragover="allowDrop(event)">';

        var columnWidth = formGroup.ColumnWidth;

        if (formGroup.ColumnLayout == "OnceColumn") {
          if (columnWidth == "default") {
            columnWidth = "col-lg-12";
          }

          content +=
            '<div class="' +
            columnWidth +
            ' col-sm-12  col-xs-12 form-group-body"  ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-0" style="height:370px;margin-bottom:10px;"> </div>';
        }

        if (formGroup.ColumnLayout == "TwoColumn") {
          columnWidth = "col-md-5";

          content +=
            '<div class="' +
            columnWidth +
            " form-group-body" +
            '"' +
            '    ondrop="drop(event)" ondragover="allowDrop(event)"' +
            ' id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-0" style="height:370px;margin-bottom:10px;"> </div><div class="' +
            columnWidth +
            " form-group-body" +
            '"' +
            '    ondrop="drop(event)" ondragover="allowDrop(event)"' +
            ' id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-1" style="height:370px;margin-bottom:10px;"> </div>';
        }

        if (formGroup.ColumnLayout == "ThreeColumn") {
          if (formGroup.GroupDisplayMode == "GroupWithBox") {
            columnWidth = "col-md-3";
          } else {
            columnWidth = "col-md-3";
          }

          content +=
            '</div><div class="' +
            columnWidth +
            " form-group-body" +
            '"ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-0" style="height:370px;margin-bottom:10px;"></div><div class="' +
            columnWidth +
            " form-group-body" +
            '"ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-1" style="height:370px;margin-bottom:10px;"> </div><div class="' +
            columnWidth +
            " form-group-body" +
            '"ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-2" style="height:370px;margin-bottom:10px;"></div></div>';
        }

        //btn json default
        content += Group_Btn(formGroup.FormGroupBoxID);

        content += "</div>";

        $(bodyID).append(content);

        if (formGroup.GroupDisplayMode == "GroupWithTitle") {
          $("#form-group-body-" + formGroup.FormGroupBoxID + "-0").append(
            '<h4 class="group-title">' +
              formGroup.Label +
              "<br /><small>" +
              formGroup.Description +
              "</small></h4>"
          );
        }
      });
    } catch (e) {
      //   raiseError(e, bodyID);

      return;
    }
  }

  //#endregion

  //#region Render Form Items

  var parentID = "";
  var _formItems = _json;
  var itemsGrouping = _formGroups.ItemsGrouping;
  $("#ContentHeader").html(_formItems.Label);
  try {
    $.each(_formItems.charts, function (index, formItem) {
      if (itemsGrouping) {
        parentID =
          "#form-group-body-" +
          formItem.FormGroupBoxID +
          "-" +
          formItem.ColumnIndex;
      } else {
        parentID =
          "#form-group-mbody-" + formItem.FormID + "-" + formItem.ColumnIndex;
      }

      var transferid;
      let img =
        '<img class="fit-image" onmouseover="btnModal(this)" onmouseleave="btnUnModal(this)"  style=" border:1px solid #ccc;border-radius:10px"   src="data:image/svg+xml;base64,' +
        formItem.style +
        '" id="img-' +
        formItem.FormGroupBoxID +
        index +
        '"></img>';
      $(parentID).append(img);

      //  onmouseout="btnUnModal(this)"

      // img.addEventListener("dblclick", (e) => chartEdit(e));
      // img.addEventListener("mouseenter", (e) => {
      //   console.log('trans   ' + e.target.id)
      //   transferid=e.target.id
      // });

      // img.setAttribute("draggable", true);
      // img.addEventListener("dragstart", (ev) => drag(ev));
      // img.addEventListener("mousedown", () => (item.style.cursor = "grabbing"));
      // img.addEventListener("mouseup", () => (item.style.cursor = "grab"));
      // img.addEventListener("drop", (e) => {
      //   e.preventDefault();
      //   let oneID = e.dataTransfer.getData("text");

      //   let twoID = e.target.id;
      //   console.log("t" + twoID);
      //   let empty = $("#" + oneID).css("top");
      //   console.log("empty" + empty);
      //   $("#" + twoID).css("top", empty);
      //   $("#" + oneID).css("top", $("#" + twoID).css("Totopp"));
      //   empty = $("#" + oneID).css("left");
      //   $("#" + twoID).css("left", empty);
      //   $("#" + oneID).css("left", $("#" + twoID).css("left"));
      //   console.log(oneID);
      //   console.log(twoID);

      //   $("#" + e.target.id).append(document.getElementById(oneID));
      // });

      // img.style.position = "absolute";
    });
  } catch (e) {
    // raiseError(e, bodyID);

    return;
  }
}
function btnModal(x) {
  let parent = $("#" + x.id).parent()[0].id;
  let div =
    '<div id="modalDiv" class="modal" style=" position:absolute;">' +
    '<div id="chartEdit" class="row" style="position:absolute;left:50%;top:50%;"><span id="spanEdit"  class="btn btn-light glyphicon glyphicon-edit" onclick="chartEdit(event)" style="width:80px;margin-left:10px"></span>' +
    '<span  id="spanDelete" class="btn btn-light glyphicon glyphicon-trash"   onclick="chartDelete(event)" style="width:80px;"></span>' +
    "</div></div>";

  $("#" + parent).append(div);
  // Get the modal
  var modal = document.getElementById("modalDiv");
  modal.style.display = "block";

  // // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("close")[0];

  // // When the user clicks on <span> (x), close the modal
  // span.onclick = function () {
  //   modal.style.display = "none";
  // };

  $("#modalContent").css("width", "50%");
  // $("#chartModal").css("height", height);
}

function btnUnModal(x) {
  // $(".modal").remove();
}
function chartDelete(e) {
  let parent = $("#" + e.target.id)
    .parent()
    .parent()
    .parent()[0].id;

  let imgid = $("#" + parent)
    .children()
    .eq(0)[0].id;
  
  // let modal = 
  

  //   '<div class="modal fade" id="exampleModalCenter" tabindex="1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">' +
  //   '<div class="modal-dialog modal-dialog-centered" role="document">' +
  //   '<div class="modal-content">' +
    // '<div class="modal-header">' +
    // '<h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>' +
    // '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    // '<span aria-hidden="true">&times;</span>' +
    // '</button>' +
    // '</div>' +
    // '<div class="modal-body">' +
        
    // '</div>' +
    // '<div class="modal-footer">' +
    // '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
    // '<button type="button" class="btn btn-primary">Save changes</button>' +
    // '</div>' +
//     '</div>' +
//     '</div >' +
//     '</div>';
// $("#" + parent).append(modal);
  
  $("#" + imgid).remove();
}