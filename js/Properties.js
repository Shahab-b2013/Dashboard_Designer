const getRightPanel = $("#PanelId");
var item;
function lbl(value, forId) {
  item = createLbl("lbl", "");
  item.setAttribute("for", forId);
  item.innerHTML = value + ":";
  item.style.display = "inline";

  $("#PanelPropId").append(item);
}

function GroupProp(elem) {
  //label
  $("#PanelPropId").empty();

  //Set Column
  item = lbl("تعداد چارت ", "colId");
  for (let i = 0; i < 3; i++) {
    item = document.createElement("input");
    item.type = "button";
    item.setAttribute("id", "colId" + i);
    item.setAttribute("class", "btn btn-light");
    item.value = i + 1;
    item.style.height = "30px";
    item.style.marginRight = "5px";
    item.style.font = '12px  "IRANSansWeb", Tahoma';
    item.onclick = (e) => {
      switch (+$("#" + e.target.id).val()) {
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
    };
    $("#PanelPropId").append(item);
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
    setDiv1(elem, 5);
    CreateDiv2(elem, 5);
  }
  if (groupDivId(elem).length == 2) {
    setDiv1(elem, 5);
    setDiv2(elem, 5);
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
  div3ID = div2ID.substring(0, div2ID.length - 1).concat(lastCharId); //Delete/Add last chart from id

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
  let parnetnodeID = elem.parentNode.parentNode.id;
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



//=======================prop 2================================
