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

  //Content create form
  let Content = createDiv("col-lg-10" + " noDrop", "geContent");
  row.appendChild(Content);

  //content Header
  const divupTopHeader = document.createElement("div");
  divupTopHeader.style.height = "20px";
  divupTopHeader.style.zIndex = "1";
  divupTopHeader.style.position = "-webkit-sticky";
  divupTopHeader.style.position = "sticky";
  divupTopHeader.style.top = "0";
  Content.appendChild(divupTopHeader);

  let contentHeader = document.createElement("div");
  contentHeader.className = "divHeader";
  contentHeader.setAttribute("id", "ContentHeader");
  contentHeader.addEventListener("dblclick", (e) => labelProp(e.target.id));
  contentHeader.innerHTML = "";
  Content.appendChild(contentHeader);

  //footer
  let Footer = createDiv("container-fluid", "geFooter");
  Footer.innerHTML = "Footer";
  Container.appendChild(Footer);

  FormView();
}
