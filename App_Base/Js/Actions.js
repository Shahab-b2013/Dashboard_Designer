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
function createImgChart(e, parentID, chartItem, Type) {
  let style = chartItem ? chartItem.ImgBs64 : styleChart(Type);
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
  let ID = chartItem ? chartItem.ID : chart_defaultId();
  function chart_defaultId() {
    return "chart-defaultId-" + ~~(Math.random() * 1000);
  }
  let chartType = chartItem ? chartItem.Type : Type;
  let parent = parentID ? parentID : e.target.id;
  let img =
    '<img class="fit-image noDrop" type="' +
    Type +
    '" draggable="true" ondragstart="dragstart(event)" ondrop="swapping(event)" ondragover="event.preventDefault()" onmouseenter="rowbtnOn(this)" onmouseleave="rowbtnOff(this)" style ="border:1px solid #ccc;border-radius:10px;cursor:grab"  src="data:image/svg+xml;base64,' +
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
  let oneID = $("#" + e.dataTransfer.getData("text"));
  let twoID = $("#" + e.target.id);

  if (oneID[0].id.length > 3) {
    function ExistOneID(item) {
      return item.ID === oneID[0].id;
    }
    function ExistTwoID(item) {
      return item.ID === twoID[0].id;
    }

    //check ExistOneID and ExistTwoID
    if (CHARTS.some(ExistOneID) && CHARTS.some(ExistTwoID)) {
      e.preventDefault();
      //swap src
      temp = oneID.attr("src");
      oneID.attr("src", twoID.attr("src"));
      twoID.attr("src", temp);
      //swap type
      temp = oneID.attr("type");
      oneID.attr("type", twoID.attr("type"));
      twoID.attr("type", temp);
    }

    if (CHARTS.some(ExistOneID)) {
      //get Element by oneID
      var oneObj = CHARTS.find((element) => element.ID == oneID[0].id);
    }
    if (CHARTS.some(ExistTwoID)) {
      //get Element by twoID
      var twoObj = CHARTS.find((element) => element.ID == twoID[0].id);
    }

    //swap ID
    if (twoObj) {
      temp = oneObj.ID;
      oneObj.ID = twoObj.ID;
      twoObj.ID = temp;

      //if img not Exists
      if (twoID.hasClass("form-group-body")) {
        if (CHARTS.some(ExistOneID)) {
          //modify oneObj RowID
          oneObj.RowID = +e.target.id
            .replaceAll("form-group-body-", "")
            .split("-")[0];

          //modify oneObj ColumnIndex
          oneObj.ColumnIndex = +e.target.id
            .replaceAll("form-group-body-", "")
            .split("-")[1];
        }
      } else {
        if (CHARTS.some(ExistOneID)) {
          //modify oneObj RowID
          oneObj.RowID = +twoID
            .parent()[0]
            .id.replaceAll("form-group-body-", "")
            .split("-")[0];

          //modify oneObj ColumnIndex
          oneObj.ColumnIndex = +twoID
            .parent()[0]
            .id.replaceAll("form-group-body-", "")
            .split("-")[1];
        }
        if (CHARTS.some(ExistTwoID)) {
          //modify twoObj RowID
          twoObj.RowID = +oneID
            .parent()[0]
            .id.replaceAll("form-group-body-", "")
            .split("-")[0];

          //modify twoObj ColumnIndex
          twoObj.ColumnIndex = +oneID
            .parent()[0]
            .id.replaceAll("form-group-body-", "")
            .split("-")[1];
        }
      }
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
  if (ROWBOXS.length < 9) {
    if ($("#" + e.target.id).hasClass("rowBtnGroup-span")) {
      let GroupId = e.target.id;
      const parent = $("#" + GroupId)
        .parent()
        .parent()
        .parent()[0].id;
      let _RowId = 0;
      //get last ID
      $("#" + parent)
        .children()
        .each(function () {
          if ($(this).hasClass("form-group-box")) {
            let nextRowId = +$(this).attr("id").replace("form-group-", "");
            if (nextRowId > _RowId) _RowId = nextRowId;
          }
        });
      //set last Id
      _RowId++;

      let par = $("#" + GroupId)
        .parent()
        .parent()[0].id;
      par = +par.replaceAll("form-group-", "");
      let Element = ROWBOXS.find((Element) => Element.RowID === par);
      let _RowIndex = Element.RowIndex + 1;

      //create UI row
      $(document).ready(function () {
        $("#" + GroupId)
          .parent()
          .parent()
          .after(
            $(
              '<div  style="" id="' +
                "form-group-" +
                _RowId +
                '" class="row form-group-box" RowIndex="' +
                _RowIndex +
                '" ondragover="allowDrop(event)"  >' +
                '<div style="" class="' +
                "col-lg-4 col-md-4 form-group-body" +
                '" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)" columnindex="0" id="form-group-body-' +
                _RowId +
                '-0"></div><div style="" class="' +
                "col-lg-4 col-md-4 form-group-body" +
                '" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)" columnindex="0" id="form-group-body-' +
                _RowId +
                '-1"></div><div style="" class="' +
                "col-lg-4 col-md-4 form-group-body" +
                '" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)" columnindex="0" id="form-group-body-' +
                _RowId +
                '-2"></div>' +
                Group_Btn(_RowId) +
                "</div>"
            )
          );
      });
      $(".form-group-body").css("opacity", "1");
      $(".form-group-body").removeClass("noDrop");
      $(".rowBtnGroup-span").css("display", "none");

      //Add in ROWBOXS
      let newRowBox = {
        RowID: _RowId,
        RowIndex: _RowIndex,
        RowDisplayMode: "GroupWithBox",
        ColumnLayout: "OnceColumn",
        ColumnWidth: "default",
      };

      ROWBOXS.push(newRowBox);

      //RowIndex Generate for All Rows
      RowIndex_Generator();

      //Swap newElem with beforElem
      let newItem = ROWBOXS.find((item) => item.RowID == _RowId);
      let parentItem = ROWBOXS.find((item) => item.RowID == par);
      let beforItem = ROWBOXS.find(
        (item) => item.RowIndex == parentItem.RowIndex + 1
      );
      beforItem.RowIndex = parentItem.RowIndex + 2;
      newItem.RowIndex = parentItem.RowIndex + 1;
      Sort_ROWBOXS();
    }
  } else {
    alert("تعداد سطرها  بیش  از حد مجاز است.");
  }
}

function RowIndex_Generator() {
  Sort_ROWBOXS();
  let temp = 0;
  $.each(ROWBOXS, function (index, item) {
    if (item.RowIndex != temp) {
      item.RowIndex = temp;
    }
    temp++;
    $("#form-group-" + item.RowID).attr("RowIndex", item.RowIndex);
  });
}

function Sort_ROWBOXS() {
  ROWBOXS.sort(
    (firstItem, secondItem) => firstItem.RowIndex - secondItem.RowIndex
  );
}

function Sort_CHARTS() {
  CHARTS.sort(
    (firstElem, secondElem) => firstElem.ColumnIndex - secondElem.ColumnIndex
  );
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
  let RowCount = $("#geContent").children().length;
  if (RowCount > 1) {
    remove_Empty_Div(elem);

    let RowID = elem.parentNode.parentNode.id;
    //check is chid row and delete row
    if ($("#" + RowID).children().length - 1 == 0) {
      $("#" + RowID).remove();
      RowID = +RowID.replaceAll("form-group-", "");
      //delete row in ROWBOXS
      ROWBOXS.splice(
        ROWBOXS.findIndex((Element) => Element.RowID == RowID),
        1
      );

      //RowIndex Generate
      RowIndex_Generator();
    } else {
      alert(" سطر مورد نظر دارای چارت است و قابل حذف کردن نمی باشد.");
      
    }
  }
}

function dragEnter(e) {
  if (e.target.id == true && e.target.id !='lbl5') {
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
  window.scrollTo(0, 0);
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

  RowIndex_Generator();
}

function rowMoveDown(e) {
  window.scrollTo(0, 0);
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

  RowIndex_Generator();
}

//edit rowIndex for swapping
function ROWBOXS_Modify(move, oneID, twoID) {
  $.each(ROWBOXS, function (index, item) {
    if (item.RowID == oneID) {
      move == "Down" ? item.RowIndex++ : item.RowIndex--;
    } else if (item.RowID == twoID) {
      move == "Down" ? item.RowIndex-- : item.RowIndex++;
    }
  });
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

//chart modal edit
function ModalConstractor(width, parent) {
  let div =
    '<div id="myModal" class="modal" >' +
    '<div id="chartModal" class="modal-content">' +
    '<div id="contentM" class="row col-md-12"></div>' +
    "</div></div>";
  $("#" + parent).append(div);

  $("#myModal").css("display", "block");
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

function chartDelete(e) {
  // remove popup
  let parent = $("#" + e.target.id).parent()[0].id;
  let msg = "آیا از حذف این چارت مطمئن هستید ؟";

  // MsgBox
  ModalConstractor("25%", parent);
  let div = $("#contentM");
  div.html(msg);
  div.css("display", "block");
  div.css("padding", "10px");
  div.css("text-align", "start");
  $("#myModal").css("padding-top", "200px");

  let btn =
    '<hr style="margin:80px 0px 0px 0px;width:100%;">' +
    '<div class="row" style="margin:10px 0px 0px 0px;display:flex;"><span id="del" class="btn btn-danger" onclick="chart_del()"> حذف</span>' +
    '<span id="closed" class="btn btn-light" style="width:60px;margin-Right:10px;" onclick="HideModal()"> لغو</span></div></div></div>';
  div.append(btn);

  //close msgbox
  $("#myModal").css("display", "block");
}

function chart_del() {
  let parentID = $("#myModal").parent()[0].id;
  let imgid = parentID.replaceAll("rowbtn-img-", "");
  $("#" + imgid).remove();
  HideModal();
  //rowbtn remove
  let rowbtn = "rowbtn-img-" + imgid;
  $("#" + rowbtn).remove();
  //modify chars arr
  CHARTS.splice(
    CHARTS.findIndex((Element) => Element.ID == imgid),
    1
  );
}

function GroupSplit(elem) {
  //group child count & set lblsilder

  let id = elem.id.replaceAll("EditGroup-", "");
  const childCount = $("#form-group-" + id).children().length - 1;
  $("#lblSlider-" + id).html(childCount+' column');
  $("#myslider-" + id).val(childCount);

  //set lblSlider position
  if (childCount == 1) $("#lblSlider-" + id).css("left", "0px");
  if (childCount == 2) $("#lblSlider-" + id).css("left", "30px");
  if (childCount == 3) $("#lblSlider-" + id).css("left", "70px");

  let group_Child_Length = +$("#form-group-" + id).children().length - 1;
  $("#myslider-" + id).attr("value", group_Child_Length);
  $("#slider-" + id).css("display") == "none"
    ? $("#slider-" + id).css("display", "block")
    : $("#slider-" + id).css("display", "none");
}

function volume(elem) {
  let id = elem.id.replaceAll("myslider-", "lblSlider-");
  $("#" + id).html(elem.value+' column');
  if (elem.value == 1) $("#" + id).css("left", "0px");
  if (elem.value == 2) $("#" + id).css("left", "30px");
  if (elem.value == 3) $("#" + id).css("left", "70px");

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
  remove_Empty_Div(elem);
  if (get_Items_Row(elem).length == 1) {
    setDiv1(elem, 12);
  }
  rowBoxArr_Modify(elem, "OnceColumn");
  chartArr_Modify(elem);
}
function DivSplit_2(elem) {
  remove_Empty_Div(elem);
  if (get_Items_Row(elem).length == 1) {
    setDiv1(elem, 6);
    CreateDiv2(elem, 6);
  }
  if (get_Items_Row(elem).length == 2) {
    setDiv1(elem, 6);
    setDiv2(elem, 6);
  }
  rowBoxArr_Modify(elem, "TwoColumn");
  chartArr_Modify(elem);
}
function DivSplit_3(elem) {
  remove_Empty_Div(elem);
  if (get_Items_Row(elem).length == 1) {
    setDiv1(elem, 4);
    CreateDiv2(elem, 4);
    CreateDiv3(elem, 4);
  }
  if (get_Items_Row(elem).length == 2) {
    remove_Empty_Div(elem);
    setDiv1(elem, 4);
    setDiv2(elem, 4);
    CreateDiv3(elem, 4);
  }
  rowBoxArr_Modify(elem, "ThreeColumn");
  chartArr_Modify(elem);
}

function rowBoxArr_Modify(elem, num) {
  let RowID = $("#" + get_Items_Row(elem)[0]).parent()[0].id;
  RowID = RowID.replaceAll("form-group-", "").split("-")[0];
  ROWBOXS.find(function (Element) {
    if (Element.RowID == RowID) {
      Element.ColumnLayout = num;
    }
  });
}
function chartArr_Modify(elem) {
  let chartID;
  let RowID = $("#" + get_Items_Row(elem)[0]).parent()[0].id;
  let colCount = $("#" + RowID).children().length;
  for (let i = colCount - 1; i >= 0; i--) {
    let colID = $("#" + RowID).children()[i].id;
    if ($("#" + colID).hasClass("form-group-body")) {
      if ($("#" + colID).children().length > 1)
        chartID = $("#" + colID).children()[0].id;
      //set new colIndex in arr
      if (chartID) {
        let colIndex = $("#" + colID).attr("ColumnIndex");
        CHARTS.find(function (Element) {
          if (Element.id == chartID) {
            Element.ColumnIndex = colIndex;
          }
        });
      }
    }
  }
}
function setDiv1(elem, colNum) {
  $("#" + get_Items_Row(elem)[0]).attr(
    "class",
    "form-group-body  col-md-" + colNum
  );
  $("#" + get_Items_Row(elem)[0]).attr("ColumnIndex", 0);
}
function setDiv2(elem, colNum) {
  $("#" + get_Items_Row(elem)[1]).attr(
    "class",
    "form-group-body col-md-" + colNum
  );
  $("#" + get_Items_Row(elem)[1]).attr("ColumnIndex", 1);
}
function CreateDiv2(elem, colNum) {
  let div1ID = get_Items_Row(elem)[0];
  let lastCharId = +div1ID.substr(div1ID.length - 1) + 1;
  let div2ID = div1ID.substring(0, div1ID.length - 1).concat(lastCharId); //Delete/Add last chart from id
  let div2 =
    '<div class="form-group-body col-md-' +
    colNum +
    '" style="" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" ondrop="drop(event)" ondragover="allowDrop(event)" ColumnIndex="1" id="' +
    div2ID +
    '" ></div>';
  //set div2
  $("#" + get_Items_Row(elem)[0]).after($(div2));
}

function CreateDiv3(elem, colNum) {
  //create div3
  let div2ID = get_Items_Row(elem)[1];
  let lastCharId = +div2ID.substr(div2ID.length - 1) + 1;
  let div3ID = div2ID.substring(0, div2ID.length - 1).concat(lastCharId); //Delete/Add last chart from id

  let div3 =
    '<div class="form-group-body col-md-' +
    colNum +
    '" style="" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)"  ondrop="drop(event)" ondragover="allowDrop(event)" ColumnIndex="2" id="' +
    div3ID +
    '"></div>';
  //set div3
  $("#" + get_Items_Row(elem)[1]).after($(div3));
}

/*If div.child isEmpty then
remove_Empty_Div & if row.lenght==1 remove_Empty_Div Disablez
*/
function remove_Empty_Div(elem) {
  let chartCount = 0;
  let Items_Row = get_Items_Row(elem);
  for (let k = Items_Row.length - 1; k >= 0; k--) {
    let elements = +$("#" + Items_Row[k]).children().length;
    if ($("#" + elem.id).hasClass("myslider")) {
      if (get_Items_Row(elem).length > 1) {
        if (elements == 0) {
          $("#" + Items_Row[k]).remove();
        }
      }
    } else if ($("#" + elem.id).hasClass("delete")) {
      if (elements > 0) {
        chartCount++;
      }
      if (k == 0) {
        if (chartCount == 0) {
          //chart is null
          for (let index = Items_Row.length - 1; index >= 0; index--) {
            if ($("#" + elem.id).hasClass("delete")) {
              if (elements == 0) {
                $("#" + Items_Row[index]).remove();
              }
            }
          }
        }
      }
    }
  }
}

function get_Items_Row(elem) {
  let get_Items_Row = [];
  let parnetnodeID = $("#" + elem.id).hasClass("delete")
    ? elem.parentNode.parentNode.id
    : elem.parentNode.parentNode.parentNode.parentNode.id;
  parnetnodeID = document.getElementById(parnetnodeID);
  for (let q = 0; q < parnetnodeID.childNodes.length; q++) {
    if (parnetnodeID.childNodes[q].id) {
      let id = parnetnodeID.childNodes[q].id;
      if ($("#" + id).hasClass("form-group-body")) {
        get_Items_Row.push(id);
      }
    }
  }
  return [...new Set(get_Items_Row)];
}

function HideModal() {
  $("#myModal").remove();
}
//CHART TYPE
var CHARTTYPE;

///EXPORT JSON
var DASHBOARDID;
var MODULEID;
var ENTITYID;
var ACCESSID;
var NAME;
var ITEMSGROUPING;
var PAGETEMPLATEID;
var LABEL;
var TYPE;
var HEADERVISIBLE;
var VERSION;
var DESC;
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
var SERIES = [];
function ExportData() {
  Sort_ROWBOXS();
  Sort_CHARTS();
  let json = {
    DashboardID: DASHBOARDID,
    ModuleID: MODULEID,
    EntityID: ENTITYID,
    AccessID: ACCESSID,
    Name: NAME,
    ItemsGrouping: ITEMSGROUPING,
    PageTemplateID: PAGETEMPLATEID,
    Label: LABEL,
    Type: TYPE,
    HeaderVisible: HEADERVISIBLE,
    Version: VERSION,
    Desc: DESC,
    RowBoxs: ROWBOXS,
    Charts: CHARTS,
    Filters: FILTERS,
    SqlFilters: SQLFILTERS,
    AccessRoles: ACCESESROLES,
    AccessGroups: ACCESESGROUPS,
    RefRoles: REFROLES,
    RefGroups: REFGROUPS,
    RefColumns: REFCOLUMNS,
  };

  //Export to backend

  var data = new FormData();

  data.append("design", JSON.stringify(json));

  data.append("ID", DASHBOARDID);

  var $dashboard = new editDashboard(data);

  $dashboard.submit(data);
}

function openfile() {
  let input = document.getElementById("file-input").files[0];
  if (input) {
    var reader = new FileReader();
    reader.onload = function (e) {
      let _json = e.target.result;
      _json = JSON.parse(_json);
      $("#geContent").empty();
      //set variables
      DASHBOARDID = _json.DashboardID;
      MODULEID = _json.ModuleID;
      ENTITYID = _json.EntityID;
      ACCESSID = _json.AccessID;
      NAME = _json.Name;
      PAGETEMPLATEID = _json.PageTemplateID;
      LABEL = _json.Label;
      TYPE = _json.Type;
      HEADERVISIBLE = _json.HeaderVisible;
      VERSION = _json.Version;
      DESC = _json.Desc;
      ITEMSGROUPING = _json.ItemsGrouping;
      COLUMNLAYOUT = _json.ColumnLayout;
      COLUMNWIDTH = _json.ColumnWidth;
      ROWBOXS = _json.RowBoxs;
      CHARTS = _json.Charts;
      FILTERS = _json.Filters;
      SQLFILTERS = _json.SqlFilters;
      ACCESESROLES = _json.AccessRoles;
      ACCESESGROUPS = _json.AccessGroups;
      REFROLES = _json.RefRoles;
      REFGROUPS = _json.RefGroups;
      REFCOLUMNS = _json.RefColumns;
      DashboardView(_json);
      HideModal();
    };
    reader.readAsText(input);
  }
}
function btnSubmit(par, text) {
  let btn = document.createElement("button");
  btn.className = "btn btn-primary";
  btn.style.margin = "10px 0px 10px 5px";
  btn.style.display = "inline";
  btn.style.float = "right";
  btn.style.width = "70px";
  btn.innerText = text;
  $(par).append(btn);
  return btn;
}

function btnExit(par) {
  let btnEx = document.createElement("button");
  btnEx.className = "btn btn-light";
  btnEx.style.margin = "10px 0px 10px 0px";
  btnEx.style.display = "inline";
  btnEx.style.float = "right";
  btnEx.style.width = "70px";
  btnEx.innerText = "لغو";
  $(par).append(btnEx);
  return btnEx;
}
