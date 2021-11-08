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
  let RightPanel = createDiv("col-lg-3", "RightPanel");
  $("#rowId").append(RightPanel);

  //div Header
  let divHeader = document.createElement("div");
  divHeader.className = "headerDiv";
  divHeader.innerHTML = "افزودن نمودار";
  divHeader.style.backgroundColor = "#ffffff";
  RightPanel.appendChild(divHeader);

  //FildsPanel Header
  let panelHeader = document.createElement("div");
  panelHeader.className = "divHeader";
  panelHeader.innerHTML = "نمودار ها";
  panelHeader.style.background = "linear-gradient(#61892f99,#527428)";
  panelHeader.style.gridColumn = "1/span 4";
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
    item.addEventListener("dragstart", (ev) => drag(ev));
    item.setAttribute("id", index);
    item.setAttribute("width", "45");
    item.setAttribute("height", "45");
    item.style.cursor = "move";
    item.style.alignSelf = "center";
    item.style.justifySelf = "center";
    item.style.marginTop = "12px";
    FildsPanel.appendChild(item);

    //label
    const lbl = document.createElement("label");
    lbl.setAttribute("id", "lbl" + index);

    if (index == 0) {
      lbl.innerHTML = "نمودار ستونی ";
      lbl.style.gridColumn = "2";
      lbl.style.gridRow = "2";
      item.style.gridColumn = "1";
      item.style.gridRow = "2";
      item.setAttribute("width", "45");
      item.setAttribute("height", "45");
    } else if (index == 1) {
      lbl.innerHTML = "نمودار دایره ای";
      lbl.style.gridColumn = "2";
      lbl.style.gridRow = "3";
      item.style.gridColumn = "1";
      item.style.gridRow = "3";
      item.setAttribute("width", "45");
      item.setAttribute("height", "45");
    } else if (index == 2) {
      lbl.innerHTML = "نمودار میله ای";
      lbl.style.gridColumn = "2";
      lbl.style.gridRow = "4";
      item.style.gridColumn = "1";
      item.style.gridRow = "4";
      item.setAttribute("width", "45");
      item.setAttribute("height", "45");
    } else if (index == 3) {
      lbl.innerHTML = "نمودار خطی";
      lbl.style.gridColumn = "4";
      lbl.style.gridRow = "2";
      item.style.gridColumn = "3";
      item.style.gridRow = "2";
      item.setAttribute("width", "50");
      item.setAttribute("height", "40");
    } else if (index == 4) {
      lbl.innerHTML = "نمودار مساحت";
      lbl.style.gridColumn = "4";
      lbl.style.gridRow = "3";
      item.style.gridColumn = "3";
      item.style.gridRow = "3";
      item.setAttribute("width", "50");
      item.setAttribute("height", "50");
    } else if (index == 5) {
      lbl.innerHTML = "گروه";
      lbl.style.gridColumn = "4";
      lbl.style.gridRow = "4";
      item.style.gridColumn = "3";
      item.style.gridRow = "4";
      item.setAttribute("width", "50");
      item.setAttribute("height", "50");
    }
    // else if (index == 6) {
    //   lbl.innerHTML = "گروه";
    //   lbl.style.gridColumn = "2";
    //   lbl.style.gridRow = "5";
    //   item.style.gridColumn = "1";
    //   item.style.gridRow = "5";
    //   item.setAttribute("width", "40");
    //   item.setAttribute("height", "40");
    // }
    lbl.style.marginTop = "27px";
    lbl.style.marginRight = "0px";
    lbl.className = "lbl";
    FildsPanel.appendChild(lbl);
  });

  //PanelProp Header   //todo
  let PanelPropHeader = document.createElement("div");
  PanelPropHeader.className = "divHeader";
  PanelPropHeader.innerHTML = "تنظیمات ";
  PanelPropHeader.style.gridColumn = "1/span 4";
  PanelPropHeader.style.gridRow = "1";
  RightPanel.appendChild(PanelPropHeader);

  //Properties
  let PropPanel = createDiv("", "PanelPropId");
  RightPanel.appendChild(PropPanel);
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
function TextboxFns(ev) {
  if ($("#" + ev.target.id).hasClass("form-group-body")) {
    //form-group and lbl
    let rowId = rowContent(ev);
    let id = rowId.replace("form-group-", "form-group-item-");
    //text
    let txtContent = document.createElement("input");
    txtContent.type = "text";
    txtContent.className = "form-control form-input noDrop";
    txtContent.setAttribute("id", id);
    txtContent.setAttribute("draggable", true);
    txtContent.addEventListener("dragstart", (e) => drag(e));
    txtContent.addEventListener("dblclick", (e) => TextboxProp(e.target.id));
    $("#" + rowId).append(txtContent);
  }
}

function DropdownFns(ev) {
  //form-group and lbl
  let rowId = rowContent(ev);
  //dropdown
  let itemsPanel = document.createElement("select");
  itemsPanel.className = "dropdown";
  itemsPanel.setAttribute("id", "selectAfertDrag-" + createID());
  itemsPanel.addEventListener("dragover", (event) => allowDrop(event));
  itemsPanel.addEventListener("dblclick", (e) => DropdownProp(e.target.id));
  $("#" + rowId).append(itemsPanel);
}

function LabelFns(ev) {
  if ($("#" + ev.target.id).hasClass("form-group-body")) {
    //form-group and lbl
    rowContent(ev);
  }
}

function CheckboxFns(ev) {
  //form-group
  let rowId = rowContent(ev);
  //checkbox
  let itemsPanel = document.createElement("input");
  itemsPanel.type = "checkbox";
  itemsPanel.className = "checkbox";
  itemsPanel.setAttribute("id", "checkAferDrag-" + createID());
  itemsPanel.addEventListener("dragover", (event) => allowDrop(event));
  itemsPanel.addEventListener("dblclick", (e) => CheckboxProp(e.target.id));
  $("#" + rowId).append(itemsPanel);
  //lbl
  let getId = "form-item-lbl-" + createID();
  let lbl = document.createElement("label");
  lbl.innerText = "متن انتخابی ...";
  lbl.className = "lbl";
  lbl.style.margin = "0px 0px 10px 0px";
  lbl.setAttribute("id", getId);
  lbl.addEventListener("dblclick", (ev) => labelProp(ev.target.id));
  lbl.setAttribute("for", itemsPanel.id);
  $("#" + rowId).append(lbl);
}

function Group(ev) {
  if ($("#" + ev.target.id).hasClass("rowBtnGroup")) {
    let GroupId = ev.target.id;
    const parent = $("#" + GroupId)
      .parent()
      .parent()
      .attr("id");
    let id = 0;
    // id = +GroupId.replace("form-group-", "");
    $("#" + parent)
      .children()
      .each(function () {
        if ($(this).hasClass("form-group-box")) {
          let nextId = +$(this).attr("id").replace("form-group-", "");
          console.log(nextId);
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
              '<div class="col-lg-2 col-md-2 group-info noDrop" id="group-info-' +
              id +
              '"' +
              '><h4 class="group-title">' +
              "نام پیش فرض" +
              "<br /><small>" +
              "" +
              "</small></h4></div>" +
              '<div style="padding:10px;" class="' +
              "col-lg-7 col-md-10 form-group-body" +
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
function allowDrop(ev) {
  if (ev.target.id) {
    if (!$("#" + ev.target.id).hasClass("noDrop")) {
      ev.preventDefault();
    }
  }
}
function drag(ev) {
  if (ev.target.id) ev.dataTransfer.setData("text", ev.target.id);
}

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
    'moveup></span><span style="width:35px;padding:5px" class="btn btn-light glyphicon glyphicon-arrow-down"  data-placement="top" title="انتقال گروه به پایین" onclick="GroupMoveDown(event)" id=' +
    GroupId +
    "movedown></span ></div>"
  );
}

function DeleteGroup(event) {
  let parentId = event.target.parentNode.parentNode.id;

  $("#" + parentId).children().length < 1
    ? $("#" + parentId).remove()
    : alert("حذف گروه به دلیل داشتن آیتم ممکن نیست،لطفاً آیتم ها را به");
}

function dragEnter(event) {
  if (event.target.id) {
    if ($("#" + event.target.id).hasClass("form-group-body")) {
      $("#" + event.target.id).css("border", "1px solid #ccc");
    }
  }
}
function onMouseOut(event) {
  if (event.target.id) {
    $("#" + event.target.id).css("border", "");
  }
}
function dragLeave(event) {
  if (event.target.id) {
    $("#" + event.target.id).css("border", "");
  }
}
function GroupMoveUp(event) {
  let oldID = $("#" + event.target.parentNode.parentNode.id);
  let cloned = oldID.clone(true);

  let newID = oldID.prev()[0].id;
  if (!$("#" + newID).hasClass("divHeader")) {
    $("#" + newID).before($(cloned));
    oldID.remove();
  }
}

function GroupMoveDown(event) {
  let oldID = $("#" + event.target.parentNode.parentNode.id);
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

function ModalFormCtor(width) {
  const div =
    '<div id="myModal" class="modal">' +
    '<div id="chartModal" class="modal-content" style="border: 1px solid #dcc896; border-radius: 4px;">' +
    '<span class="close">&times;</span>' +
    '<div id="contentM" class="row col-lg-12" style="margin-right:10px;"></div>' +
    "</div>" +
    "</div>";
  $("#geContent").append(div);

  // Get the modal
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  $("#chartModal").css("width", width);
  // $("#chartModal").css("height", height);
}
