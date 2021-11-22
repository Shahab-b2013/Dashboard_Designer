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
        lbl.innerHTML = "مساحت خطی";
        lbl.style.gridColumn = "2";
        lbl.style.gridRow = "3";
        item.setAttribute("width", "60");
        item.setAttribute("height", "45");
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
    PanelProp2Header.innerHTML = "ابزار";
    PanelProp2Header.style.gridRow = "1";
    RightPanel.appendChild(PanelProp2Header);

    //Properties2
    let PropPanel2 = createDiv("", "PanelPropId2");
    RightPanel.appendChild(PropPanel2);

    let filterIcon = document.createElement("img");
    filterIcon.className = "imgProp2";
    filterIcon.setAttribute("src", "data:image/png;base64," + imgFilter);
    filterIcon.style.gridColumn = "1";
    filterIcon.style.gridRow = "1";
    filterIcon.setAttribute("width", "45");
    filterIcon.setAttribute("height", "45");
    PropPanel2.appendChild(filterIcon);

    let accessesIcon = document.createElement("img");
    accessesIcon.className = "imgProp2";
    accessesIcon.setAttribute("src", "data:image/png;base64," + imgAccesses);
    accessesIcon.style.gridColumn = "1";
    accessesIcon.style.gridRow = "2";
    accessesIcon.setAttribute("width", "45");
    accessesIcon.setAttribute("height", "45");
    PropPanel2.appendChild(accessesIcon);

    let lblfilter = document.createElement("label");
    lblfilter.innerHTML = "filters";
    lblfilter.style.gridColumn = "2";
    lblfilter.style.gridRow = "1";
    lblfilter.className = "lblProp2";
    lblfilter.onclick = (e) => Filters(e);
    PropPanel2.appendChild(lblfilter);
    
    
    let lblAccesses = document.createElement("label");
    lblAccesses.innerHTML = "accesses";
    lblAccesses.style.gridColumn = "2";
    lblAccesses.style.gridRow = "2";
    lblAccesses.className = "lblProp2";
    lblAccesses.onclick =(e)=> Accesses(e);
    PropPanel2.appendChild(lblAccesses);
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
  Footer.innerHTML = "Footer";
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
