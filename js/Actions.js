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
function createImgChart(e, parentID, formItem, type) {
  let style = formItem ? formItem.style : styleChart(type);
  function styleChart(type) {
    let value;
    switch (type) {
      case "column":
        value = columnBs64;
        break;
      case "pie":
        value = pieBs64;
        break;
      case "bar":
        value = barBs64;
        break;
      case "line":
        value = lineBs64;
        break;
      // case "area":
      //   value = areaBs64;
      //   break;
      case "areaspline":
        value = areaSplineBs64;
        break;
      default:
        value = imgDefault;
        break;
    }
    return value;
  }

  let ID = formItem ? formItem.id : idChart(e);
  function idChart(e) {
    let defaultId = e.target.id.replaceAll("form-group-body-", "");
    return defaultId;
  }
  let chartType = formItem ? formItem.type : type;
  let parent = parentID ? parentID : e.target.id;
  let img =
    '<img class="fit-image noDrop" draggable="true" ondragstart="dragstart(event)" ondrop="dropimg(event)" ondragover="event.preventDefault()" onmouseenter="rowbtnOn(event)" onmouseleave="rowbtnOff(event)" style ="padding-left:10px;border:1px solid #ccc;border-radius:10px;cursor:grab"  src="data:image/svg+xml;base64,' +
    style +
    '" id="' +
    ID +
    '"><div class="row" onmouseenter="rowbtnOn2(event)" style="display:none;float: left;margin:-50px 0px 0px 20px;" id="rowbtn-img-' +
    ID +
    '"><span id="spanDelete' +
    ID +
    '" class="btn btn-light glyphicon glyphicon-trash"  onclick="chartDelete(event)" style="margin-left:10px"></span>' +
    '<span  id="spanEdit' +
    ID +
    '" class="spanEdit btn btn-light glyphicon glyphicon-cog" type="' +
    chartType +
    '" onclick="chartEdit(event)" style=""></span></div></img>';
  $("#" + parent)
    .append(img)
    .css("border", "");
}

//swaping img
function dropimg(e) {
  e.preventDefault();
  let temp;
  let oneElem = $("#" + e.dataTransfer.getData("text"));
  let twoElem = $("#" + e.target.id);
  //swap src
  if (e.dataTransfer.getData("text").length > 3) {
    temp = oneElem.attr("src");
    oneElem.attr("src", twoElem.attr("src"));
    twoElem.attr("src", temp);
  }
}

function dragstart(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function ColumnFns(e) {
  if ($("#" + e.target.id).hasClass("form-group-body")) {
    createImgChart(e, null, null, "column");
  }
}
function PieFns(e) {
  if ($("#" + e.target.id).hasClass("form-group-body")) {
    createImgChart(e, null, null, "pie");
  }
}
function BarFns(e) {
  if ($("#" + e.target.id).hasClass("form-group-body")) {
    createImgChart(e, null, null, "bar");
  }
}
function LineFns(e) {
  if ($("#" + e.target.id).hasClass("form-group-body")) {
    createImgChart(e, null, null, "line");
  }
}

function AreaSplineFns(e) {
  if ($("#" + e.target.id).hasClass("form-group-body")) {
    createImgChart(e, null, null, "areaspline");
  }
}

function GroupFns(e) {
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
          AreaSplineFns(ev);
          break;
        case 5:
          GroupFns(ev);
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

function DeleteGroup(elem) {
  removeDiv(elem);
  let parentId = elem.parentNode.parentNode.id;

  if ($("#" + parentId).children().length == 2) {
    if (
      $("#" + parentId)
        .children()
        .eq(0)
        .children().length == 0
    ) {
      $("#" + parentId).remove();
    } else {
      alert("سطر مورد نظر حاوی یک چارت می باشد.");
    }
  } else {
    alert("سطر مورد نظر جاوی چارت می باشد.");
  }
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
  if (!$("#" + e.target.id).hasClass("noDrop")) {
    if ($("#" + e.target.id).children().length == 0) {
      $("#" + e.target.id).css("border", "");
      $("#" + e.target.id).html("");
    }
  }
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

//chart modal edit
function ChartConstractor(width, parent) {
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

function rowbtnOn(e) {
  $("#rowbtn-img-" + e.target.id).css("display", "block");
}
function rowbtnOn2(e) {
  $("#" + e.target.id).css("display", "block");
}
function rowbtnOff(e) {
  $("#rowbtn-img-" + e.target.id).css("display", "none");
}
function MsgBoxDel(parent, msg) {
  let div =
    '<div id="myModal" class="modal" style="">' +
    '<div id="chartModal" class="" style="font-size:16px;color:#000;font-style:normal;position: relative;width:30%;top:30%;background-color:#fff; margin: auto; overflow: auto; border: 1px solid #ccc; border-radius: 4px;">' +
    '<div id="contentM" class="row col-lg-12" style="padding: 10px 16px 0px 0px;margin: 20px 0px 40px 0px;">' +
    msg +
    '</div><hr style="margin:0px;width:100%;">' +
    '<div class="row" style="padding:16px;margin:0px"><span id="del" class="btn btn-danger"> حذف</span>' +
    '<span id="closed" class="btn btn-secondary" style="width:60px;margin-Right:10px;" onclick="closed()"> لغو</span></div></div></div>';
  $("#" + parent).append(div);
}
function chartDelete(e) {
  // remove popup
  let parent = $("#" + e.target.id).parent()[0].id;
  let msg = "آیا از حذف این چارت مطمعن هستید ؟";

  MsgBoxDel(parent, msg);

  $("#del").click(() => {
    let parentID = $("#myModal").parent()[0].id;
    let imgid = parentID.replaceAll("rowbtn-img-", "");
    $("#" + imgid).remove();
    $("#myModal").remove();
    //rowbtn remove
    let rowbtn = "rowbtn-img-" + imgid;
    $("#" + rowbtn).remove();
  });

  //close msgbox
  $("#myModal").css("display", "block");
}
function closed() {
  $("#myModal").remove();
}

function GroupSplit(elem) {
  let id = elem.id.replaceAll("EditGroup", "");
  let group_Child_Length = +$("#form-group-" + id).children().length - 1;

  $("#myslider" + id).attr("value", group_Child_Length);

  $("#slider" + id).css("display", "block");
}

function volume(elem) {
  // console.log(elem.value)
  // $("#myslider" + id).attr("value", elem.value);
  const lblSliderId = elem.id.replaceAll("myslider", "lblSlider");
  console.log(lblSliderId);
  document.getElementById(lblSliderId).innerHTML = elem.value;
  if (elem.value == 1) {
    document.getElementById(lblSliderId).style.right = "5px";
  }
  if (elem.value == 2) $("#" + lblSliderId).css("right", "45px");
   if (elem.value == 3) $("#" + lblSliderId).css("right", "85px");

  switch (+elem.value) {
    case 1:
      DivSplit_1(elem);
      break;
    case 2:
      DivSplit_2(elem);
      break;
    case 3:
      DivSplit_3(elem);
      break;
  }
}

function DivSplit_1(elem) {
  removeDiv(elem);
  if (groupDivId(elem).length == 1) {
    setDiv1(elem, 12);
  }
}
function DivSplit_2(elem) {
  removeDiv(elem);
  if (groupDivId(elem).length == 1) {
    setDiv1(elem, 6);
    CreateDiv2(elem, 6);
  }
  if (groupDivId(elem).length == 2) {
    setDiv1(elem, 6);
    setDiv2(elem, 6);
  }
}
function DivSplit_3(elem) {
  removeDiv(elem);
  if (groupDivId(elem).length == 1) {
    setDiv1(elem, 4);
    CreateDiv2(elem, 4);
    CreateDiv3(elem, 4);
  }
  if (groupDivId(elem).length == 2) {
    removeDiv(elem);
    setDiv1(elem, 4);
    setDiv2(elem, 4);
    CreateDiv3(elem, 4);
  }
}

function setDiv1(elem, colNum) {
  $("#" + groupDivId(elem)[0]).attr(
    "class",
    "form-group-body  col-md-" + colNum
  );
}
function setDiv2(elem, colNum) {
  $("#" + groupDivId(elem)[1]).attr(
    "class",
    "form-group-body col-md-" + colNum
  );
}
function CreateDiv2(elem, colNum) {
  let div1ID = groupDivId(elem)[0];
  let lastCharId = +div1ID.substr(div1ID.length - 1) + 1;
  let div2ID = div1ID.substring(0, div1ID.length - 1).concat(lastCharId); //Delete/Add last chart from id
  let div2 =
    '<div class="form-group-body col-md-' +
    colNum +
    '" style="height:370px;margin-bottom:10px;white-space:pre-wrap;text-align:center;" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)"   ondrop="drop(event)" ondragover="allowDrop(event)" id="' +
    div2ID +
    '" ></div>';
  //set div2
  $("#" + groupDivId(elem)[0]).after($(div2));
}

function CreateDiv3(elem, colNum) {
  //create div3
  let div2ID = groupDivId(elem)[1];
  let lastCharId = +div2ID.substr(div2ID.length - 1) + 1;
  let div3ID = div2ID.substring(0, div2ID.length - 1).concat(lastCharId); //Delete/Add last chart from id

  let div3 =
    '<div class="form-group-body col-md-' +
    colNum +
    '" style="height:370px;margin-bottom:10px;white-space:pre-wrap;text-align:center;" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)"  ondrop="drop(event)" ondragover="allowDrop(event)" id="' +
    div3ID +
    '"></div>';
  //set div3
  $("#" + groupDivId(elem)[1]).after($(div3));
}

/*if div.child isEmpty then
removeDiv & if groupDivid.lenght==1 removeDiv Disablez
*/
function removeDiv(elem) {
  const groupArr = groupDivId(elem);
  for (let k = 0; k < groupArr.length; k++) {
    if (groupDivId(elem).length >= 2) {
      const elements = +$("#" + groupArr[k]).children().length;
      if (elements < 2) {
        $("#" + groupArr[k]).remove();
      }
    }
  }
}
function groupDivId(elem) {
  let groupDivIdArray = [];
  let parnetnodeID = $("#" + elem.id).hasClass("delete")
    ? elem.parentNode.parentNode.parentNode.id
    : elem.parentNode.parentNode.parentNode.parentNode.id;
  parnetnodeID = document.getElementById(parnetnodeID);
  for (let q = 0; q < parnetnodeID.childNodes.length; q++) {
    if (parnetnodeID.childNodes[q].id) {
      let id = parnetnodeID.childNodes[q].id;
      if ($("#" + id).hasClass("form-group-body")) {
        groupDivIdArray.push(id);
      }
    }
  }
  return [...new Set(groupDivIdArray)];
}
function hideSlider(elem) {
  let parent = $("#" + elem.id).parent()[0].id;
  $("#" + parent).css("display", "none");
}
