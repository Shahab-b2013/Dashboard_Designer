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
  item = lbl("تعداد ستون ", "colId");
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
      let groupDivIdArray = [];
      function groupDivId(elem) {
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
      switch (+$("#" + e.target.id).val()) {
        case 1:
          $("#" + groupDivId(elem)[0]).attr(
            "class",
            "form-group-body col-md-7"
          );
          for (let k = 1; k < groupDivId(elem).length; k++) {
            const elements = $("#" + groupDivId(elem)[k]).children();
            for (let j = 0; j < elements.length; j++) {
              const id = elements[j].id;
              if ($("#" + id).hasClass("form-group")) {
                $("#" + groupDivId(elem)[0]).append($("#" + id));
              }
            }
            $("#" + groupDivId(elem)[k]).remove();
          }
          break;
        case 2:
          // if is only div1
          if (groupDivId(elem).length < 2) {
            $("#" + groupDivId(elem)[0]).attr(
              "class",
              "form-group-body col-md-4"
            );
            const div2ID = groupDivId(elem)[0].replace("-0", "-1");
            let div2 =
              '<div class="form-group-body col-md-4" style="border-radius:4px" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)" id="' +
              div2ID +
              '"></div>';
            //get mindiv
            let minidiv = $("#" + groupDivId(elem)[0]).next()[0].id;
            $("#" + minidiv).after($(div2));

            let div1Items = $("#" + groupDivId(elem)[0]).children();
            for (
              let k = Math.round(div1Items.length / 2);
              k < div1Items.length;
              k++
            ) {
              const elementId = div1Items[k].id;
              $("#" + div2ID).append($("#" + elementId));
            }
          }
          break;
        case 3:
          // let parentId = elem.parentNode.parentNode.id + "-0";
          // parentId = parentId.replace("form-group-", "form-group-body-");
          // $("#" + parentId).attr("class", "col-md-3");
          break;
      }
    };
    $("#PanelPropId").append(item);
  }
}

function ChartProp(prop) {
  const chartType = prop.userOptions.chart.type;

  // let div =
  //   '<div class="col-lg-12 row"><div class="col-lg-5" id="div1"></div><div class=""></div><div class="col-lg-5" id="div2"></div></div>';
  // $("#PanelPropId").append(div);

  // for (let i = 0; i < 14; i++) {
  //   const lblArray = [
  //     "Text",
  //     "Name",
  //     "chartType",
  //     "categoryLabel",
  //     "valueLabel",
  //     "categoryName",
  //     "catExpression",
  //     "Operators",
  //     "dataExpression",
  //     "seriesText",
  //     "seriesName",
  //     "seriesType",
  //     "styleColor",
  //     "version",
  //   ];
  //   let lbl = document.createElement("label");
  //   lbl.innerText = lblArray[i] + ":";
  //   lbl.className = "lbl container-fluid";
  //   lbl.style.margin = "10px 0px 8px 10px";
  //   $("#div1").append(lbl);

  //   if (i == 2 || i == 6 || i == 7) {
  //     let select = document.createElement("select");
  //     select.className = "selectBox";
  //     $("#div2").append(select);
  //   } else if (i == 12) {
  //     let colorInput = document.createElement("input");
  //     colorInput.type = "color";
  //     colorInput.style.width = '150px'
  //     colorInput.value='#'
  //     $("#div2").append(colorInput);
  //   } else {
  //     let textbox = document.createElement("input");
  //     textbox.className = "Textbox";
  //     $("#div2").append(textbox);
  //   }
  // }

  console.log(chartType);
}
