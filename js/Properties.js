const getRightPanel = $("#PanelId");
var item;
function lbl(value, forId) {
  item = createLbl("lbl", "");
  item.setAttribute("for", forId);
  item.innerHTML = value + ":";
  item.style.display = "inline";

  $("#PanelPropId").append(item);
}
function br() {
  $("#PanelPropId").append(document.createElement("br"));
}

function PropItemDefault(id) {
  item = lbl("نوع آیتم", "lbl1");
  item = createLbl("lbl", "lbl1");
  item.innerHTML = "متن";
  item.style.margin = "10px 36px 10px 0px";
  item.style.display = "inline";
  $("#PanelPropId").append(item);

  br();

  item = lbl("رنگ زمینه", "color1");
  item = createInput("color", "#ffffff", "color1");
  item.setAttribute("id", "color1");
  item.style.margin = "10px 25px 10px 0px";
  // item.addEventListener("click", () => {
  //   document.getElementById(e.target.id).style.backgroundColor = $(
  //     "#" + "color" + index
  //   ).val();
  // });
  $("#PanelPropId").append(item);

  br();

  item = lbl("رنگ حاشیه", "color2");
  item = createInput("color", "#ffffff", "color2");
  item.setAttribute("id", "color1");
  item.style.margin = "10px 17px 10px 0px";
  $("#PanelPropId").append(item);

  br();

  item = lbl("نوع قلم", "font");
  item = createInput("dropdown", ["IRANSansWeb", "Tahoma", "B Titr"], "font");
  item.style.margin = "10px 39px 10px 0px";
  $("#PanelPropId").append(item);

  br();

  item = lbl("سایز قلم", "fontSize");
  item = createInput("number", 0, "fontSize");
  item.style.margin = "10px 31px 10px 0px";
  $("#PanelPropId").append(item);

  br();

  item = lbl("رنگ قلم", "fontColor");
  item = createInput("color", "#000000", "fontColor");
  item.style.margin = "10px 38px 10px 0px";
  $("#PanelPropId").append(item);

  br();
}

function TextboxProp(id) {
  $("#PanelPropId").empty();
  PropItemDefault(id);
  item = lbl("نوع ورودی", "input");
  item = createInput("dropdown", [
    "تاریخ",
    "ساعت",
    "تلفن ثابت",
    "موبایل",
    "ایمیل",
    "پسورد",
  ]);
  item.style.margin = "10px 8px 10px 0px";
  $("#PanelPropId").append(item);
}

function PasswordProp(id) {
  $("#PanelPropId").empty();
  PropItemDefault(id);
  item = lbl("نوع ورودی", "input");
  item = createInput("dropdown", [
    "تاریخ",
    "ساعت",
    "تلفن ثابت",
    "موبایل",
    "ایمیل",
    "پسورد",
  ]);
  item.style.margin = "10px 8px 10px 0px";
  $("#PanelPropId").append(item);
}

function labelProp(id) {
  $("#PanelPropId").empty();
  //lbl
  lbl("متن برچسب", "textlbl");
  //textbox
  item = document.createElement("input");
  item.placeholder = "متن  برچسب را وارد نمایید...";
  item.style.textAlign = "center";
  item.style.backgroundColor = "#e8f0fe";
  item.setAttribute("id", "textlbl");
  item.addEventListener("input", function (e) {
    if ($(this).val().length == 0) {
      $("#" + id).html(item.placeholder);
      $("#" + id).css("color", "#ccc");
    } else {
      $("#" + id).html(e.target.value);
      if ($("#" + id).hasClass("divHeader")) {
        $("#" + id).css("color", "#fff");
      } else {
        $("#" + id).css("color", "#000");
      }
    }
  });
  $("#PanelPropId").append(item);
  br();
}

function CheckboxProp(id) {
  $("#PanelPropId").empty();

  item = lbl("متن انتخابی", "checklbl");
  item = document.createElement("input");
  item.placeholder = "متن  انتخابی را وارد نمایید...";
  item.style.width = "11rem";
  item.style.resize = "horizontal";
  item.style.height = "20px";
  item.style.fontSize = "1.2rem";
  item.style.margin = "0px 5px 10px 0px";
  item.setAttribute("id", "checklbl");
  $("#PanelPropId").append(item);
  br();
  PropItemDefault(id);
}

function DropdownProp(id) {
  $("#PanelPropId").empty();
  PropItemDefault(id);

  //create opt
  item = lbl("افزودن لیست", "droplbl");
  // item = $("#selectAfertDrag");
  item = createInput("dropdown", ["item1", "item2"], "font");
  item.style.margin = "10px 8px 10px 0px";
  $("#PanelPropId").append(item);
}

function RadioProp(id) {
  $("#PanelPropId").empty();
  PropItemDefault(e);
}
function GroupProp(elem) {
  //label
  $("#PanelPropId").empty();
  lbl("عنوان گروه", "textlbl");
  item = document.createElement("input");
  item.placeholder = "متن  عنوان را وارد نمایید...";
  item.setAttribute("id", "textlbl");
  item.style.textAlign = "center";
  let parentId = elem.parentNode.parentNode.id;
  let id = parentId.replace("form-group-", "group-info-");
  item.value = $("#" + id)
    .find("h4.group-title")
    .text();
  item.addEventListener("input", function (e) {
    if ($(this).val().length == 0) {
      $("#" + id).html("متن  عنوان را وارد نمایید...");
      $("#" + id).css("color", "#ccc");
    } else {
      $("#" + id).html(e.target.value);
      $("#" + id).css("color", "#000");
    }
  });
  $("#PanelPropId").append(item);
  br();

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
    setDiv1(elem, 11);
  }
}
function DivSplit_2(elem) {
  removeDiv(elem);
  if (groupDivId(elem).length == 1) {
    setDiv1(elem, 5);
    CreateDiv2(elem, 5);
  }
}
function DivSplit_3(elem) {
  removeDiv(elem);
  if (groupDivId(elem).length == 1) {
    setDiv1(elem, 3);
    CreateDiv2(elem, 3);
    CreateDiv3(elem, 3);
  }
  if (groupDivId(elem).length == 2) {
    setDiv1(elem, 3);
    setDiv2(elem, 3);
    CreateDiv3(elem, 3);
  }
}



function setDiv1(elem, colNum) {
  $("#" + groupDivId(elem)[0]).attr(
    "class",
    "form-group-body col-md-" + colNum
  );
  PieChart($("#" + groupDivId(elem)[0]));
}
function setDiv2(elem, colNum) {
  $("#" + groupDivId(elem)[1]).attr(
    "class",
    "form-group-body col-md-" + colNum
  );
  PieChart($("#" + groupDivId(elem)[1]));
}
function CreateDiv2(elem, colNum) {
  const div2ID = groupDivId(elem)[0].replace("0-0", "0-1");
  let div2 =
    '<div class="form-group-body col-md-' +
    colNum +
    '" style="border-radius:4px" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)" id="' +
    div2ID +
    '"></div>';
  //set div2
  let minidiv1ID = $("#" + groupDivId(elem)[0]).next()[0].id;
  $("#" + minidiv1ID).after($(div2));
  //set mindiv2
  let minidiv2 =
    '<div class="form-gorup-body col-md-1 noDrop" ondragover="allowDrop(event)" id="miniDiv-2' +
    div2ID +
    '"></div>';
  $("#" + div2ID).after($(minidiv2));

  //div1 and div2 set Element
  let div1Items = $("#" + groupDivId(elem)[0]).children();
  for (
    //set lenght/2 in div1
    let k = Math.round(div1Items.length / 2);
    k < div1Items.length;
    k++
  ) {
    //set lenght/2 in div2
    const elementId = div1Items[k].id;
    $("#" + div2ID).append($("#" + elementId));
  }
  //chart refresh
  PieChart(div2ID);
}

function CreateDiv3(elem, colNum) {
  //create div3
  const div3ID = groupDivId(elem)[1].replace("0-1", "0-2");
  let div3 =
    '<div class="form-group-body col-md-' +
    colNum +
    '" style="border-radius:4px" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)" id="' +
    div3ID +
    '"></div>';
  //get mindiv2
  let minidiv2GetID = $("#" + groupDivId(elem)[1]).next()[0].id;
  $("#" + minidiv2GetID).after($(div3));
  //set mindiv3
  let minidiv3 =
    '<div class="form-gorup-body col-md-1 noDrop" ondragover="allowDrop(event)" id="miniDiv-3' +
    div3ID +
    '"></div>';
  $("#" + div3ID).after($(minidiv3));

  //chart refresh
  PieChart(div3ID);
}

//if div.child==empty then
function removeDiv(elem) {
  const groupArr = groupDivId(elem);
  for (let k = 0; k < groupArr.length; k++) {
    console.log(k);
    const elements = +$("#" + groupArr[k]).children().length;
    if (elements === 0) {
      $("#" + groupArr[k]).remove();
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