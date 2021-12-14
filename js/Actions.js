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
function createImgChart(e, parentID, chartItem, type) {
  let style = chartItem ? chartItem.imgBs64 : styleChart(type);
  function styleChart(type) {
    let value;
    switch (type) {
      case "column":
        value = columnBs64; //from img.js
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
      case "areaspline":
        value = areaSplineBs64;
        break;
      default:
        value = imgDefault;
        break;
    }
    return value;
  }
  let ID = chartItem ? chartItem.id : idChart(e);
  function idChart(e) {
    let defaultId = e.target.id.replaceAll("form-group-body-", "");
    return defaultId;
  }
  let chartType = chartItem ? chartItem.type : type;
  let parent = parentID ? parentID : e.target.id;
  let img =
    '<img class="fit-image noDrop" type="' +
    type +
    '" draggable="true" ondragstart="dragstart(event)" ondrop="swapping(event)" ondragover="event.preventDefault()" onmouseenter="rowbtnOn(this)" onmouseleave="rowbtnOff(this)" style ="padding-left:10px;border:1px solid #ccc;border-radius:10px;cursor:grab"  src="data:image/svg+xml;base64,' +
    style +
    '" id="' +
    ID +
    '"><div class="row" onmouseenter="rowbtnOn2(this)" style="display:none;float: left;margin:-50px 0px 0px 20px;" id="rowbtn-img-' +
    ID +
    '"><span id="spanDelete' +
    ID +
    '" class="btn btn-light glyphicon glyphicon-trash" onclick="chartDelete(event)" style="margin-left:10px"></span>' +
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
function swapping(e) {
  let temp;
  let oneElem = $("#" + e.dataTransfer.getData("text"));
  let twoElem = $("#" + e.target.id);
  console.log((oneElem[0].id));
  if (oneElem[0].id.length > 3) {
    e.preventDefault();

    //swap src
    temp = oneElem.attr("src");
    oneElem.attr("src", twoElem.attr("src"));
    twoElem.attr("src", temp);
    //swap type
    temp = oneElem.attr("type");
    oneElem.attr("type", twoElem.attr("type"));
    twoElem.attr("type", temp);

    //modify chartArray for swapping
    let oneObj = CHARTS.find((element) => element.id == oneElem.attr("id"));
    let twoObj = CHARTS.find((element) => element.id == twoElem.attr("id"));

    //modify oneObj rowID
    if (twoElem.hasClass("form-group-body")) {
      oneObj.rowID = +e.target.id
        .replaceAll("form-group-body-", "")
        .split("-")[0];

      //modify oneObj columnIndex
      oneObj.columnIndex = +e.target.id
        .replaceAll("form-group-body-", "")
        .split("-")[1];
    } else {
      oneObj.rowID = +twoElem
        .parent()[0]
        .id.replaceAll("form-group-body-", "")
        .split("-")[0];

      //modify oneObj columnIndex
      oneObj.columnIndex = +twoElem
        .parent()[0]
        .id.replaceAll("form-group-body-", "")
        .split("-")[1];

      //modify twoObj rowID
      twoObj.rowID = +oneElem
        .parent()[0]
        .id.replaceAll("form-group-body-", "")
        .split("-")[0];

      //modify twoObj columnIndex
      twoObj.columnIndex = +oneElem
        .parent()[0]
        .id.replaceAll("form-group-body-", "")
        .split("-")[1];
    }
  }
}

function dragstart(e) {
  e.dataTransfer.setData("text", e.target.id);
  if (e.target.id == "5") {
    $(".form-group-body").css("opacity", "0.1");
    $(".form-group-body").addClass("noDrop");
    $(".rowBtnGroup-span").css("display", "block");
  }
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
  if ($("#" + e.target.id).hasClass("rowBtnGroup-span")) {
    let GroupId = e.target.id;
    const parent = $("#" + GroupId)
      .parent()
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
    //set last Id
    id++;

    const par = $("#" + GroupId)
      .parent()
      .parent()[0].id;
    let rowIndexNum = +$("#" + par).attr("rowIndex") + 1;
    $(document).ready(function () {
      $("#" + GroupId)
        .parent()
        .parent()
        .after(
          $(
            '<div  style="" id="' +
              "form-group-" +
              id +
              '" class="row form-group-box" rowIndex="' +
              rowIndexNum +
              '" ondragover="allowDrop(event)"  >' +
              '<div style="" class="' +
              "col-lg-12 col-md-12 form-group-body" +
              ' col-sm-12  col-xs-12" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
              id +
              '-0"></div>' +
              Group_Btn(id) +
              "</div>"
          )
        );
    });
    $(".form-group-body").css("opacity", "1");
    $(".form-group-body").removeClass("noDrop");
    $(".rowBtnGroup-span").css("display", "none");

    //add row in rowboxs arr
    let newRowBox = {
      rowID: id,
      rowIndex: rowIndexNum,
      rowDisplayMode: "GroupWithBox",
      columnLayout: "OnceColumn",
      columnWidth: "default",
    };

    $.each(ROWBOXS, function (index, item) {
      if (item.rowIndex >= rowIndexNum) {
        item.rowIndex++;
        $("#form-group-" + item.rowID).attr("rowIndex", item.rowIndex);
        console.log(item.rowID, "index ", item.rowIndex);
      }
    });
    ROWBOXS.push(newRowBox);
    ROWBOXS.sort(
      (firstItem, secondItem) => firstItem.rowIndex - secondItem.rowIndex
    );
  }
}

//=============================================================================drag and drop functions=================================================================================
/*
 * drag and drop functions
 * */
function drop(ev) {
  if (ev.target.id) {
    if (
      !$("#" + ev.target.id).hasClass("noDrop") &&
      $("#" + ev.target.id).hasClass("form-group-body")
    ) {
      $("#" + ev.target.id).html(""); //delete placeholder div
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
        default:
          //drop
          ev.preventDefault();
          $("#" + ev.target.id).append(document.getElementById(dataId));
          //set rowbtn
          $("#" + ev.target.id).append(
            document.getElementById("rowbtn-img-" + dataId)
          );
          $("#" + ev.target.id).css("border", "");
          swapping(ev);
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
          $("#" + e.target.id).css("font-size", "29px");
          $("#" + e.target.id).css("font-style", "italic");
          $("#" + e.target.id).css("font-family", "tahoma");
          $("#" + e.target.id).html("&#10;&#10;&#10;&#10;اینجا رها کنید ...");
        }
        e.preventDefault();
      }
    }
  }
}

function DeleteGroup(elem) {
  removeDiv(elem);
  let parentId = elem.parentNode.parentNode.id;
  if ($("#" + parentId).children().length == 1) {
    $("#" + parentId).remove();
    parentId = parentId.replaceAll("form-group-", "");
    //modify rowboxs arr
    ROWBOXS.splice(
      ROWBOXS.findIndex((Element) => Element.rowID == parentId),
      1
    );
  } else {
    alert("سطر مورد نظر حاوی چارت می باشد.");
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
function rowMoveUp(e) {
  let oneID = $("#" + e.target.parentNode.parentNode.id);
  if (oneID.prev()[0]) {
    let cloned = oneID.clone(true);
    let twoID = oneID.prev()[0].id;
    if (!$("#" + twoID).hasClass("divHeader")) {
      $("#" + twoID).before($(cloned));
      //for swapping
      ROWBOXS_Modify(
        "Up",
        oneID[0].id.replaceAll("form-group-", ""),
        twoID.replaceAll("form-group-", "")
      );
      oneID.remove();
    }
  }
}

function rowMoveDown(e) {
  let oneID = $("#" + e.target.parentNode.parentNode.id);
  if (oneID) {
    let cloned = oneID.clone(true);
    if (oneID.next()[0]) {
      let twoID = oneID.next()[0].id;
      if (twoID != "geContent") {
        $("#" + twoID).after($(cloned));
        //for swapping
        ROWBOXS_Modify(
          "Down",
          oneID[0].id.replaceAll("form-group-", ""),
          twoID.replaceAll("form-group-", "")
        );
        oneID.remove();
      }
    }
  }
}

//edit rowIndex for swapping
function ROWBOXS_Modify(move, oneID, twoID) {
  $.each(ROWBOXS, function (index, item) {
    if (item.rowID == oneID) {
      move == "Down" ? item.rowIndex++ : item.rowIndex--;
    } else if (item.rowID == twoID) {
      move == "Down" ? item.rowIndex-- : item.rowIndex++;
    }
    ROWBOXS.sort((first, second) => first.rowIndex - second.rowIndex);
  });
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

//chart modal edit
function ModalConstractor(width, parent) {
  let div =
    '<div id="myModal" class="modal" style="overflow:auto;">' +
    '<div id="chartModal" class="modal-content">' +
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

function rowbtnOn(elem) {
  $("#rowbtn-img-" + $(elem)[0].id).css("display", "block");
}
function rowbtnOn2(elem) {
  $("#" + $(elem)[0].id).css("display", "block");
}
function rowbtnOff(elem) {
  $("#rowbtn-img-" + $(elem)[0].id).css("display", "none");
}
function MsgBoxDel(parent, msg) {
  let div =
    '<div id="myModal" class="modal" style="">' +
    '<div id="chartModal" class="" style="font-size:16px;color:#000;font-style:normal;position: relative;width:25%;background-color:#fff; margin: auto; overflow: auto; border: 1px solid #ccc; border-radius: 4px;">' +
    '<div id="contentM" class="row col-lg-12" style="padding: 10px 16px;margin: 20px 0px 40px 0px;display:flex">' +
    msg +
    '</div><hr style="margin:0px;width:100%;">' +
    '<div class="row" style="padding:16px;margin:0px;display:flex;"><span id="del" class="btn btn-danger"> حذف</span>' +
    '<span id="closed" class="btn btn-light" style="width:60px;margin-Right:10px;" onclick="closed()"> لغو</span></div></div></div>';
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
    HideModal();
    //rowbtn remove
    let rowbtn = "rowbtn-img-" + imgid;
    $("#" + rowbtn).remove();
    //modify chars arr
    CHARTS.splice(
      CHARTS.findIndex((Element) => Element.id == imgid),
      1
    );
  });

  //close msgbox
  $("#myModal").css("display", "block");
}
function closed() {
  HideModal();
}

function GroupSplit(elem) {
  //group child count & set lblsilder

  let id = elem.id.replaceAll("EditGroup-", "");
  const childCount = $("#form-group-" + id).children().length - 1;
  $("#lblSlider-" + id).html(childCount);
  $("#myslider-" + id).val(childCount);

  //set lblSlider position
  if (childCount == 1) $("#lblSlider-" + id).css("left", "0px");
  if (childCount == 2) $("#lblSlider-" + id).css("left", "40px");
  if (childCount == 3) $("#lblSlider-" + id).css("left", "80px");

  let group_Child_Length = +$("#form-group-" + id).children().length - 1;
  $("#myslider-" + id).attr("value", group_Child_Length);
  $("#slider-" + id).css("display") == "none"
    ? $("#slider-" + id).css("display", "block")
    : $("#slider-" + id).css("display", "none");
}

function volume(elem) {
  let id = elem.id.replaceAll("myslider-", "lblSlider-");
  $("#" + id).html(elem.value);
  if (elem.value == 1) $("#" + id).css("left", "0px");
  if (elem.value == 2) $("#" + id).css("left", "40px");
  if (elem.value == 3) $("#" + id).css("left", "80px");

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
function hideSlider(elem) {
  let spliter = elem.id.split("-")[1];
  if ($("#slider-" + spliter).css("display") == "block")
    $("#slider-" + spliter).css("display", "none");
}

function DivSplit_1(elem) {
  removeDiv(elem);
  if (groupDivId(elem).length == 1) {
    setDiv1(elem, 12);
  }
  rowBoxArr_Modify(elem, "OnceColumn");
  chartArr_Modify(elem);
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
  rowBoxArr_Modify(elem, "TwoColumn");
  chartArr_Modify(elem);
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
  rowBoxArr_Modify(elem, "ThreeColumn");
  chartArr_Modify(elem);
}

function rowBoxArr_Modify(elem, num) {
  let rowId = $("#" + groupDivId(elem)[0]).parent()[0].id;
  rowId = rowId.replaceAll("form-group-", "").split("-")[0];
  ROWBOXS.find(function (Element) {
    if (Element.rowID == rowId) {
      Element.columnLayout = num;
    }
  });
}
function chartArr_Modify(elem) {
  let chartID;
  let rowId = $("#" + groupDivId(elem)[0]).parent()[0].id;
  let colCount = $("#" + rowId).children().length;
  for (let i = colCount - 1; i >= 0; i--) {
    let colID = $("#" + rowId).children()[i].id;
    if ($("#" + colID).hasClass("form-group-body")) {
      if ($("#" + colID).children().length > 1)
        chartID = $("#" + colID).children()[0].id;
      //set new colIndex in arr
      if (chartID) {
        let colIndex = $("#" + colID).attr("columnindex");
        CHARTS.find(function (Element) {
          if (Element.id == chartID) {
            Element.columnIndex = colIndex;
          }
        });
      }
    }
  }
}
function setDiv1(elem, colNum) {
  $("#" + groupDivId(elem)[0]).attr(
    "class",
    "form-group-body  col-md-" + colNum
  );
  $("#" + groupDivId(elem)[0]).attr("columnIndex", 0);
}
function setDiv2(elem, colNum) {
  $("#" + groupDivId(elem)[1]).attr(
    "class",
    "form-group-body col-md-" + colNum
  );
  $("#" + groupDivId(elem)[1]).attr("columnIndex", 1);
}
function CreateDiv2(elem, colNum) {
  let div1ID = groupDivId(elem)[0];
  let lastCharId = +div1ID.substr(div1ID.length - 1) + 1;
  let div2ID = div1ID.substring(0, div1ID.length - 1).concat(lastCharId); //Delete/Add last chart from id
  let div2 =
    '<div class="form-group-body col-md-' +
    colNum +
    '" style="" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondrop="drop(event)" ondragover="allowDrop(event)" columnIndex="1" id="' +
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
    '" style="" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)"  ondrop="drop(event)" ondragover="allowDrop(event)" columnIndex="2" id="' +
    div3ID +
    '"></div>';
  //set div3
  $("#" + groupDivId(elem)[1]).after($(div3));
}

/*if div.child isEmpty then
removeDiv & if groupDivid.lenght==1 removeDiv Disablez
*/
function removeDiv(elem) {
  let groupArr = groupDivId(elem);
  for (let k = groupArr.length - 1; k >= 0; k--) {
    let elements = +$("#" + groupArr[k]).children().length;
    if (groupDivId(elem).length == 1) {
      if ($("#" + elem.id).hasClass("rowBtnGroup-span")) {
        setDiv1(elem, 12);
      } else if ($("#" + elem.id).hasClass("delete")) {
        if (elements == 0) {
          $("#" + groupArr[k]).remove();
        }
      }
    } else {
      if (elements == 0) {
        $("#" + groupArr[k]).remove();
      }
    }
  }
}

function groupDivId(elem) {
  let groupDivIdArray = [];
  let parnetnodeID = $("#" + elem.id).hasClass("delete")
    ? elem.parentNode.parentNode.id
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

///EXPORT JSON
var DASHBOARDID;
var NAME;
var ITEMSGROUPING;
var COLUMNLAYOUT;
var COLUMNWIDTH;
var ROWBOXS = [];
var CHARTS = [];
var FILTERS = {};
var SQLFILTERS = "";
var ACCESESROLES = [];
var ACCESESGROUPS = [];
var REFROLES = [];
var REFGROUPS = [];
var REFCOLUMNS = [];

function ExportData() {
  let json = {
    dashboardID: DASHBOARDID,
    name: NAME,
    itemsGrouping: ITEMSGROUPING,
    rowBoxs: ROWBOXS,
    charts: CHARTS,
    filters: FILTERS,
    sqlFilters: SQLFILTERS,
    accessRoles: ACCESESROLES,
    accessGroups: ACCESESGROUPS,
    refRoles: REFROLES,
    refGroups: REFGROUPS,
    refColumns: REFCOLUMNS,
  };

  //export action
  //binary to url
  json = JSON.stringify(json);
  var textToSaveAsBlob = new Blob([json], {
    type: "text/json",
  });
  /* download without button hack */
  var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
  var downloadLink = document.createElement("a");
  downloadLink.download = "chart_Product.JSON";
  downloadLink.innerHTML = "Download File";
  downloadLink.href = textToSaveAsURL;
  downloadLink.onclick = function (event) {
    document.body.removeChild(event.target);
  };
  downloadLink.style.display = "block";
  document.body.appendChild(downloadLink);
  downloadLink.click();
}

function HideModal() {
  $("#myModal").remove();
}
