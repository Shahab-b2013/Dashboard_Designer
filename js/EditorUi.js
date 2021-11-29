"use strict";

function createDivs() {
  //Container
  let Container = createDiv("", "");
  document.body.appendChild(Container);

  //TopDiv
  let TopDiv = createDiv("container-fluid", "geTopDiv");
  TopDiv.innerHTML = " داشبورد امن پرداز";
  Container.appendChild(TopDiv);

  //rowPanel
  let row = createDiv("row", "rowId");
  Container.appendChild(row);

  //Panel
  CreatePanel();

  //RigthPanel
  function CreatePanel() {
    let RightPanel = createDiv("col-lg-2", "RightPanel");
    $("#rowId").append(RightPanel);

    //FildsPanel Header
    let panelHeader = document.createElement("div");
    panelHeader.className = "divHeader";
    panelHeader.innerHTML = "نمودار";
    panelHeader.setAttribute("id", "rightPanelID");
    RightPanel.appendChild(panelHeader);

    //FildsPanel
    let FildsPanel = createDiv("", "PanelId");
    RightPanel.append(FildsPanel);

    //get imgArray from Img.js
    //inset img to panel
    imgArray.map((value, index) => {
      //item
      const item = document.createElement("img");
      item.setAttribute("src", "data:image/png;base64," + value);
      item.className = "noDrop";
      item.setAttribute("draggable", true);
      item.setAttribute("id", index);
      item.setAttribute("width", "45");
      item.setAttribute("height", "45");
      item.addEventListener("dragstart", (ev) => drag(ev));
      item.addEventListener(
        "mousedown",
        () => (item.style.cursor = "grabbing")
      );
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
        item.style.gridRow = "2";
        lbl.style.gridColumn = "2";
        lbl.style.gridRow = "2";
        item.setAttribute("width", "45");
        item.setAttribute("height", "45");
      } else if (index == 1) {
        item.style.gridColumn = "3";
        item.style.gridRow = "2";
        lbl.innerHTML = " دایره ای";
        lbl.style.gridColumn = "4";
        lbl.style.gridRow = "2";
        item.setAttribute("width", "45");
        item.setAttribute("height", "45");
      } else if (index == 2) {
        item.style.gridColumn = "1";
        item.style.gridRow = "3";
        lbl.innerHTML = " میله ای";
        lbl.style.gridColumn = "2";
        lbl.style.gridRow = "3";
        item.setAttribute("width", "45");
        item.setAttribute("height", "45");
      } else if (index == 3) {
        item.style.gridColumn = "3";
        item.style.gridRow = "3";
        lbl.innerHTML = " خطی";
        lbl.style.gridColumn = "4";
        lbl.style.gridRow = "3";
        item.setAttribute("width", "50");
        item.setAttribute("height", "40");
      } else if (index == 4) {
        item.style.gridColumn = "1";
        item.style.gridRow = "4";
        lbl.innerHTML = "مساحت خطی";
        lbl.style.gridColumn = "2";
        lbl.style.gridRow = "4";
        item.setAttribute("width", "60");
        item.setAttribute("height", "45");
      } else if (index == 5) {
        item.style.gridColumn = "3";
        item.style.gridRow = "4";
        lbl.innerHTML = "سطر";
        lbl.style.gridColumn = "4";
        lbl.style.gridRow = "4";
        item.setAttribute("width", "50");
        item.setAttribute("height", "60");
      }
      lbl.style.marginTop = "20px";
      lbl.style.marginRight = "5px";
      lbl.className = "lbl";
      FildsPanel.appendChild(lbl);
    });

    //Tools Header
    let ToolsHeader = document.createElement("div");
    ToolsHeader.className = "divHeader";
    ToolsHeader.innerHTML = "ابزار";
    ToolsHeader.style.gridRow = "1";
    RightPanel.appendChild(ToolsHeader);

    //Properties2
    let ToolsProp = createDiv("", "ToolsProp");
    RightPanel.appendChild(ToolsProp);

    for (let i = 0; i < 2; i++) {
      //Tools Icon
      let ToolsIcon = document.createElement("img");
      ToolsIcon.className = "ToolsIcon";
      ToolsIcon.setAttribute("width", "45");
      ToolsIcon.setAttribute("height", "45");
      ToolsIcon.setAttribute("draggable", false);
      //ToolsLbl
      let ToolsLbl = document.createElement("label");
      ToolsLbl.className = "ToolsLbl";

      if (i == 0) {
        ToolsIcon.setAttribute("src", "data:image/png;base64," + imgFilter);
        ToolsIcon.style.gridColumn = "1";
        ToolsIcon.style.gridRow = "2";

        ToolsLbl.className = "lbl";
        ToolsLbl.innerHTML = "فیلتر داده ها";
        ToolsLbl.style.gridColumn = "2";
        ToolsLbl.style.gridRow = "2";
        ToolsLbl.style.cursor = "pointer";
        ToolsLbl.onclick = (e) => Filters(e);
      } else if (i == 1) {
        ToolsIcon.setAttribute("src", "data:image/png;base64," + imgAccesses);
        ToolsIcon.style.gridColumn = "1";
        ToolsIcon.style.gridRow = "3";

        ToolsLbl.className = "lbl";
        ToolsLbl.innerHTML = "دسترسی ها";
        ToolsLbl.style.gridColumn = "2";
        ToolsLbl.style.gridRow = "3";
        ToolsLbl.style.cursor = "pointer";
        ToolsLbl.onclick = (e) => Accesses(e);
      }

      ToolsProp.appendChild(ToolsIcon);
      ToolsProp.appendChild(ToolsLbl);

     

 
    }
  }

  //Content create form
  let Content = createDiv("col-lg-10" + " noDrop", "geContent");
  row.appendChild(Content);

  //content Header
  // const divupTopHeader = document.createElement("div");
  // divupTopHeader.style.height = "20px";
  // divupTopHeader.style.zIndex = "1";
  // divupTopHeader.style.position = "-webkit-sticky";
  // divupTopHeader.style.position = "sticky";
  // divupTopHeader.style.top = "0";
  // Content.appendChild(divupTopHeader);

  // let contentHeader = document.createElement("div");
  // contentHeader.className = "divHeader";
  // contentHeader.setAttribute("id", "ContentHeader");
  // contentHeader.addEventListener("dblclick", (e) => labelProp(e.target.id));
  // contentHeader.innerHTML = "";
  // Content.appendChild(contentHeader);

  //footer
  let Footer = createDiv("container-fluid", "geFooter");
  Footer.innerHTML = "© كليه حقوق برای شرکت نرم افزاری امن پرداز محفوظ است.";
  Container.appendChild(Footer);

  FormView();
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

//groupbtn
function Group_Btn(GroupId) {
  return (
    '<div id="' +
    GroupId +
    '-rowBtnGroup"  ondrop="drop(event)" ondragover="allowDrop(event)" class="row container-fluid rowBtnGroup">' +
    '<span style="border-top-left-radius: 0px;border-bottom-left-radius: 0px;" class="delete btn btn-light glyphicon glyphicon-trash"  title="حذف سطر" onclick="DeleteGroup(this);" id=' +
    GroupId +
    "DeleteGroup></span>" +
    '<span style="border-radius:0px" class="btn btn-light glyphicon glyphicon-cog"  title="تعداد ستون ها" onclick="GroupSplit(this);" id=' +
    GroupId +
    "EditGroup></span>" +
    '<span class="vol"><span style="display:none" id="slider' +
    GroupId +
    '" class="slider"><input type="range" id="myslider' +
    GroupId +
    '" class="myslider" min="1" max="3" step="1" oninput="volume(this)" onmouseout="hideSlider(this)" /><label class="lblSlider" id="lblSlider' +
    GroupId +
    '"></label></span></span>' +
    '<span style="width:42px;padding:5px;border-radius:0px" class="btn btn-light glyphicon glyphicon-arrow-up" title="انتقال سطر به بالا" onclick="GroupMoveUp(event);" id=' +
    GroupId +
    'moveup></span><span style="width:42px;border-top-right-radius: 0px;border-bottom-right-radius: 0px;" class="btn btn-light glyphicon glyphicon-arrow-down"  data-placement="top" title="انتقال سطر به پایین" onclick="GroupMoveDown(event)" id=' +
    GroupId +
    "movedown></span ></div>"
  );
}
