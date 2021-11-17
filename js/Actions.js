"use strict";

function createID() {
  let Id = sessionStorage.getItem("id");
  if (Id == null || undefined) {
    Id = 0;
    sessionStorage.setItem("id", 0);
  } else if (Id != null || undefined) {
    Id++;
    sessionStorage.setItem("id", Id);
  }
  return Id;
}
function createDiv(className, id) {
  let elt = document.createElement("div");
  elt.className = className;
  elt.setAttribute("id", id);
  return elt;
}

function createLbl(className, id) {
  let elt = document.createElement("div");
  elt.className = className;
  elt.setAttribute("id", id);
  return elt;
}

//====================================================================RigthPanel============================================================
function CreatePanel() {
  let RightPanel = createDiv("col-lg-2", "RightPanel");
  $("#rowId").append(RightPanel);

  //FildsPanel Header
  let panelHeader = document.createElement("div");
  panelHeader.className = "divHeader";
  panelHeader.innerHTML = "نمودار ها";
  panelHeader.style.background = "linear-gradient(#61892f99,#527428)";
  panelHeader.setAttribute("id", "rightPanelID");
  RightPanel.appendChild(panelHeader);

  //FildsPanel
  let FildsPanel = createDiv("", "PanelId");
  RightPanel.append(FildsPanel);

  //get imgArray in Img.js
  //inset img to panel
  imgArray.map((value, index) => {
    //item
    const item = document.createElement("IMG");
    item.setAttribute("src", "data:image/png;base64," + value);
    item.className = "noDrop";
    item.setAttribute("draggable", true);
    item.setAttribute("id", index);
    item.setAttribute("width", "45");
    item.setAttribute("height", "45");
    item.addEventListener("dragstart", (ev) => drag(ev));
    item.addEventListener("mousedown", () => (item.style.cursor = "grabbing"));
    item.addEventListener("mouseup", () => (item.style.cursor = "grab"));
    item.addEventListener("mouseover", () => (item.style.cursor = "grab"));
    item.style.alignSelf = "center";
    item.style.justifySelf = "center";
    item.style.marginTop = "12px";
    FildsPanel.appendChild(item);

    //label
    const lbl = document.createElement("label");
    lbl.setAttribute("id", "lbl" + index);

    if (index == 0) {
      lbl.innerHTML = " ستونی ";
      item.style.gridColumn = "1";
      item.style.gridRow = "1";
      lbl.style.gridColumn = "2";
      lbl.style.gridRow = "1";
      item.setAttribute("width", "45");
      item.setAttribute("height", "45");
    } else if (index == 1) {
      item.style.gridColumn = "3";
      item.style.gridRow = "1";
      lbl.innerHTML = " دایره ای";
      lbl.style.gridColumn = "4";
      lbl.style.gridRow = "1";
      item.setAttribute("width", "45");
      item.setAttribute("height", "45");
    } else if (index == 2) {
      item.style.gridColumn = "1";
      item.style.gridRow = "2";
      lbl.innerHTML = " میله ای";
      lbl.style.gridColumn = "2";
      lbl.style.gridRow = "2";
      item.setAttribute("width", "45");
      item.setAttribute("height", "45");
    } else if (index == 3) {
      item.style.gridColumn = "3";
      item.style.gridRow = "2";
      lbl.innerHTML = " خطی";
      lbl.style.gridColumn = "4";
      lbl.style.gridRow = "2";
      item.setAttribute("width", "50");
      item.setAttribute("height", "40");
    } else if (index == 4) {
      item.style.gridColumn = "1";
      item.style.gridRow = "3";
      lbl.innerHTML = " مساحت";
      lbl.style.gridColumn = "2";
      lbl.style.gridRow = "3";
      item.setAttribute("width", "50");
      item.setAttribute("height", "50");
    } else if (index == 5) {
      item.style.gridColumn = "3";
      item.style.gridRow = "3";
      lbl.innerHTML = "گروه";
      lbl.style.gridColumn = "4";
      lbl.style.gridRow = "3";
      item.setAttribute("width", "50");
      item.setAttribute("height", "50");
    }
    lbl.style.marginTop = "27px";
    lbl.style.marginRight = "0px";
    lbl.className = "lbl";
    FildsPanel.appendChild(lbl);
  });

  //PanelProp Header
  let PanelPropHeader = document.createElement("div");
  PanelPropHeader.className = "divHeader";
  PanelPropHeader.innerHTML = "تنظیمات ";
  PanelPropHeader.style.gridRow = "1";
  RightPanel.appendChild(PanelPropHeader);

  //Properties
  let PropPanel = createDiv("", "PanelPropId");
  RightPanel.appendChild(PropPanel);

  //PanelProp2 Header
  let PanelProp2Header = document.createElement("div");
  PanelProp2Header.className = "divHeader";
  PanelProp2Header.innerHTML = "تنظیمات2 ";
  PanelProp2Header.style.gridRow = "1";
  RightPanel.appendChild(PanelProp2Header);

  //Properties2
  let PropPanel2 = createDiv("", "PanelPropId2");
  RightPanel.appendChild(PropPanel2);
}
function createInput(type, opt, id) {
  let input;
  if (type == "dropdown") {
    input = document.createElement("select");
    input.style.width = "120px";
    input.style.fontSize = "14px";
    input.style.height = "25px";
    input.style.fontFamily = "Tahoma";
    opt.map((value) => {
      let options = document.createElement("option");
      options.innerText = value;
      input.appendChild(options);
    });
  } else {
    input = document.createElement("input");
    input.type = type;
    input.value = opt;
  }
  input.setAttribute("id", id);
  input.style.alignSelf = "center";
  input.style.justifySelf = "right";
  input.style.marginBottom = "5px";
  input.style.cursor = "pointer";
  return input;
}

//========================================================================================content=================================================================================

function lblContent(value, id) {
  let lblContent = document.createElement("label");
  lblContent.setAttribute("id", id);
  lblContent.innerHTML = value;
  lblContent.setAttribute("draggable", true);
  lblContent.addEventListener("dragstart", (ev) => drag(ev));
  return lblContent;
}

function rowContent(ev) {
  //row content

  let id = 0;
  if ($("#" + ev.target.id).children().length == 0) {
    id = ev.target.id.replace("form-group-body-", "");
    id = +id.replace("-0", "") + 10;
    id = "form-group-" + id;
  } else {
    id = $("#" + ev.target.id)
      .children()
      .last()[0].id;
    id = id.replace("form-group-", "");

    id = id.replace("-rep", "");
    id = +id + 10;
    id = "form-group-" + id;
  }

  let row = document.createElement("div");
  row.className = "form-group noDrop";
  row.setAttribute("id", id);
  row.addEventListener("dragover", (event) => allowDrop(event));
  row.setAttribute("draggable", true);
  row.setAttribute("dragstart", "drag(event)");
  $("#" + ev.target.id).append(row);

  //lbl
  const IdTransfer = +ev.dataTransfer.getData("text");
  if (IdTransfer != 3 && IdTransfer != 5) {
    let lblcontentid = "lblcontent" + createID();
    let lblcontent = lblContent("متن", lblcontentid);
    lblcontent.className = "form-item-lbl noDrop";
    lblcontent.addEventListener("dblclick", (ev) => labelProp(ev.target.id));
    row.appendChild(lblcontent);
  }

  //br
  const br = document.createElement("br");
  row.appendChild(br);
  return id;
}

//==========================================================================================Action Items =========================================================================
// function TextboxFns(ev) {
//   if ($("#" + ev.target.id).hasClass("form-group-body")) {
//     //form-group and lbl
//     let rowId = rowContent(ev);
//     let id = rowId.replace("form-group-", "form-group-item-");
//     //text
//     let txtContent = document.createElement("input");
//     txtContent.type = "text";
//     txtContent.className = "form-control form-input noDrop";
//     txtContent.setAttribute("id", id);
//     txtContent.setAttribute("draggable", true);
//     txtContent.addEventListener("dragstart", (e) => drag(e));
//     txtContent.addEventListener("dblclick", (e) => TextboxProp(e.target.id));
//     $("#" + rowId).append(txtContent);
//   }
//   //set cursor rightPanel item
//   $("#" + ev.dataTransfer.getData("text")).css("cursor", "grab");
// }

// function DropdownFns(ev) {
//   //form-group and lbl
//   let rowId = rowContent(ev);
//   //dropdown
//   let itemsPanel = document.createElement("select");
//   itemsPanel.className = "dropdown";
//   itemsPanel.setAttribute("id", "selectAfertDrag-" + createID());
//   itemsPanel.addEventListener("dragover", (event) => allowDrop(event));
//   itemsPanel.addEventListener("dblclick", (e) => DropdownProp(e.target.id));
//   $("#" + rowId).append(itemsPanel);
//   //set cursor rightPanel item
//   $("#" + ev.dataTransfer.getData("text")).css("cursor", "grab");
// }

// function LabelFns(ev) {
//   if ($("#" + ev.target.id).hasClass("form-group-body")) {
//     //form-group and lbl
//     rowContent(ev);
//   }
//   //set cursor rightPanel item
//   $("#" + ev.dataTransfer.getData("text")).css("cursor", "grab");
// }
function createImgChart(e, formItem, parentID) {
  const style = formItem ? formItem.style : imgArray[6]; //base64
  const colIndex = formItem
    ? formItem.ColumnIndex
    : e.target.id.substr(e.target.id.length - 1);
  const ID = formItem ? formItem.FormGroupBoxID : replaceFn(e);
  function replaceFn(e) {
    let id = e.target.id.replaceAll("form-group-body-", "");
    id = id.slice(0, -2);
    return id;
  }
  const parent = parentID ? parentID : e.target.id;
  let img =
    '<img class="fit-image noDrop" onmouseenter="rowbtnOn(event)" onmouseleave="rowbtnOff(event)" style=" border:1px solid #ccc;border-radius:10px"   src="data:image/svg+xml;base64,' +
    style +
    '" id="img-' +
    ID +
    "-" +
    colIndex +
    '"><div class="row" onmouseenter="rowbtnOn2(event)" style="display:none;float: left;margin:-50px 0px 0px 20px;" id="rowbtn-img-' +
    ID +
    "-" +
    colIndex +
    '"><span id="spanDelete' +
    ID +
    "-" +
    colIndex +
    '" class="btn btn-light glyphicon glyphicon-trash" onclick="chartDelete(event)" style="margin-left:10px"></span>' +
    '<span  id="spanEdit' +
    ID +
    "-" +
    colIndex +
    '" class="btn btn-light glyphicon glyphicon-cog" onclick="chartEdit(event)" style=""></span></div></img>';
  $("#" + parent)
    .append(img)
    .css("border", "");
}

function ColumnFns(e) {}
function PieFns(e) {
  if ($("#" + e.target.id).hasClass("form-group-body")) {
    createImgChart(e, null, null);
  }
}
function BarFns(e) {}
function LineFns(e) {}
function AreaFns(e) {}
function ColumnFns(e) {}

function Group(e) {
  if ($("#" + e.target.id).hasClass("rowBtnGroup")) {
    let GroupId = e.target.id;
    const parent = $("#" + GroupId)
      .parent()
      .parent()
      .attr("id");
    let id = 0;
    $("#" + parent)
      .children()
      .each(function () {
        if ($(this).hasClass("form-group-box")) {
          let nextId = +$(this).attr("id").replace("form-group-", "");
          if (nextId > id) {
            id = nextId;
          }
        }
      });
    id++;
    $(document).ready(function () {
      $("#" + GroupId)
        .parent()
        .after(
          $(
            '<div  style="" id="' +
              "form-group-" +
              id +
              '" class="row form-group-box" ondragover="allowDrop(event)"  >' +
              '<div style="padding:10px;" class="' +
              "col-lg-10 col-md-10 form-group-body" +
              ' col-sm-12  col-xs-12" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
              id +
              '-0"></div><div class="col-md-1" id="miniDiv-1' +
              id +
              '"></div>' +
              Group_Btn(id) +
              "</div"
          )
        );
    });
  }
}

//=============================================================================drag and drop functions=================================================================================
/*
 * drag and drop functions
 * */
function drop(ev) {
  if (ev.target.id) {
    $("#" + ev.target.id).html(""); //delete placeholder div
    if (!$("#" + ev.target.id).hasClass("noDrop")) {
      //get senderId and check number or string for switch
      let dataId = ev.dataTransfer.getData("text");
      dataId = dataId.length < 3 ? +dataId : dataId;

      switch (dataId) {
        case 0:
          ColumnFns(ev);
          break;
        case 1:
          PieFns(ev);
          break;
        case 2:
          BarFns(ev);
          break;
        case 3:
          LineFns(ev);
          break;
        case 4:
          AreaFns(ev);
          break;
        case 5:
          Group(ev);
          break;
        default:
          //drop
          ev.preventDefault();
          $("#" + ev.target.id).append(document.getElementById(dataId));
          break;
      }
    }
  }
}
function allowDrop(e) {
  if (e.target.id) {
    if (!$("#" + e.target.id).hasClass("noDrop")) {
      if ($("#" + e.target.id).children().length == 0) {
        $("#" + e.target.id).css("border", "1px solid #ccc");
        $("#" + e.target.id).css("border-radius", "10px");
        if ($("#" + e.target.id).hasClass("form-group-body")) {
          $("#" + e.target.id).css("color", "#ccc");
          $("#" + e.target.id).css("font-size", "22px");
          $("#" + e.target.id).css("font-style", "italic");
          $("#" + e.target.id).html("&#10;&#10;&#10;&#10;اینجا رها کنید ...");
        }
        e.preventDefault();
      }
    }
  }
}

function drag(e) {
  if (e.target.id) e.dataTransfer.setData("text", e.target.id);
}

//groupbtn
function Group_Btn(GroupId) {
  return (
    '<div id="' +
    GroupId +
    '-rowBtnGroup" class="row  container-fluid rowBtnGroup" style="margin-left:-30px; margin-right:30px;justify-content: left;margin-bottom:-15px" ondrop="drop(event)">' +
    '<span style="" class="btn btn-light glyphicon glyphicon-trash"  title="حذف گروه" onclick="DeleteGroup(event);" id=' +
    GroupId +
    "DeleteGroup></span>" +
    '<span style="" class="btn btn-light glyphicon glyphicon-cog"  title="تنظیمات گروه" onclick="GroupProp(this);" id=' +
    GroupId +
    "EditGroup></span>" +
    '<span style="width:35px;padding:5px" class="btn btn-light glyphicon glyphicon-arrow-up" title="انتقال گروه به بالا" onclick="GroupMoveUp(event);" id=' +
    GroupId +
    'moveup></span><span style="width:35px;padding:5px;" class="btn btn-light glyphicon glyphicon-arrow-down"  data-placement="top" title="انتقال گروه به پایین" onclick="GroupMoveDown(event)" id=' +
    GroupId +
    "movedown></span ></div>"
  );
}

function DeleteGroup(e) {
  let parentId = e.target.parentNode.parentNode.id;

  $("#" + parentId).children().length < 1
    ? $("#" + parentId).remove()
    : alert("حذف گروه به دلیل داشتن آیتم ممکن نیست،لطفاً آیتم ها را به");
}

function dragEnter(e) {
  if (e.target.id) {
    if ($("#" + e.target.id).children().length == 0) {
      if ($("#" + e.target.id).hasClass("form-group-body")) {
        $("#" + e.target.id).css("border", "1px solid #ccc");
        $("#" + e.target.id).css("border-radius", "10px");
      }
    }
  }
}
function onMouseOut(e) {
  // if (!$("#" + e.target.id).hasClass("noDrop")) {
  //   if ($("#" + e.target.id).children().length == 0) {
  //     $("#" + e.target.id).css("border", "");
  //     $("#" + e.target.id).html("");
  //   }
  // }
}
function dragLeave(e) {
  if (e.target.id) {
    if (!$("#" + e.target.id).hasClass("noDrop")) {
      if ($("#" + e.target.id).children().length == 0) {
        $("#" + e.target.id).css("border", "");
        $("#" + e.target.id).html("");
      }
    }
  }
}
function GroupMoveUp(e) {
  let oldID = $("#" + e.target.parentNode.parentNode.id);
  let cloned = oldID.clone(true);

  let newID = oldID.prev()[0].id;
  if (!$("#" + newID).hasClass("divHeader")) {
    $("#" + newID).before($(cloned));
    oldID.remove();
  }
}

function GroupMoveDown(e) {
  let oldID = $("#" + e.target.parentNode.parentNode.id);
  let cloned = oldID.clone(true);
  if (oldID.next()[0]) {
    let newID = oldID.next()[0].id;
    if (newID != "geContent") {
      $("#" + newID).after($(cloned));
      oldID.remove();
    }
  }
}
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

function FormConstractor(width, parent) {
  let div =
    '<div id="myModal" class="modal" style="">' +
    '<div id="chartModal" class="modal-content" style="border: 1px solid #dcc896; border-radius: 4px;">' +
    '<span class="close"></span>' +
    '<div id="contentM" class="row col-lg-12" style="margin-right:10px;"></div>' +
    "</div>" +
    "</div>";

  $("#" + parent).append(div);
  // Get the modal
  let modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  let span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  $("#chartModal").css("width", width);
}
