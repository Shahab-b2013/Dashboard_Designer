"use strict";
function Accesses(e) {
  ModalConstractor("40%", "geContent");
  $("#chartModal").addClass("containerside");
  $("#chartModal").css("direction", "ltr");
  //Tab
  $("#chartModal").append(createDiv("tabdiv", ""));
  $("#chartModal").append('<ul class="ul nav nav-tabs navbar-right"></ul>');
  $("ul").append(
    '<li id="Roles" class="active"><a href="#Tab1" style="font-Weight:bold;font-size:14px;" data-toggle="tab">نقش ها</a></li>'
  );
  $("ul").append(
    '<li id="Groups" ><a href="#Tab2" style="font-Weight:bold;font-size:14px;" data-toggle="tab">گروه ها</a></li>'
  );

  //tab content
  $("#chartModal").append('<div id="tab-content" class="tab-content"></div>');

  //   //tab1
  // let tab1 = document.createElement("div");
  // tab1.setAttribute("id", "Tab1");
  // tab1.className = "tab-pane fade in active";
  // document.getElementById("tab-content").appendChild(tab1);

  $("#tab-content").append(
    '<div class="tab-pane fade in active" id="Tab1"></div>'
  );
  //get/set refRoles
  if (REFROLES != null) Tabinfo(REFROLES, "Tab1", "Roles");

  //   //tab2
  //   let tab2 = document.createElement("div");
  //   tab2.setAttribute("id", "Tab2");
  //   tab2.className = "tab-pane fade";
  //   tabcontent.appendChild(tab2);

  //   //get/set refGroups
  //   if (REFGROUPS != null) Tabinfo(REFGROUPS, tab2, "Groups");

  // tab Data
  function Tabinfo(listLbl, ID, tabId) {
    try {
      for (let item in listLbl) {
        // let rowDiv = document.createElement("div");
        // rowDiv.style.display = "flex";
        // rowDiv.style.alignItems = "center";
        // rowDiv.style.justifyContent = "right";
        // document.getElementById(ID).appendChild(rowDiv);
        $("#" + ID).append(
          '<div id="rowDiv" class="rowDiv" style="display:flex;align-items:center;justify-content:right;"></div>'
        );
        let rowDiv = document.getElementById("rowDiv");
        //label
        let checkLbl = document.createElement("label");
        checkLbl.className = "lbl";
        checkLbl.style.display = "inline";
        checkLbl.setAttribute("id", "label" + item + tabId);
        checkLbl.style.margin = "5px 5px 0px 0px";
        checkLbl.onclick = () =>
          $("#check" + item + tabId).is(":checked")
            ? $("#check" + item + tabId).prop("checked", false)
            : $("#check" + item + tabId).prop("checked", true);
        checkLbl.innerHTML = listLbl[item].Label;
        rowDiv.appendChild(checkLbl);

        //checkbox
        let input = document.createElement("input");
        input.setAttribute("id", "check" + item + tabId);
        input.type = "checkbox";
        input.style.margin = "5px";
        input.style.cursor = "pointer";
        rowDiv.appendChild(input);
        //input isChecked
        let isLocal;
        tabId == "Roles"
          ? (isLocal = "accessRoles")
          : (isLocal = "accessGroups");

        let getListAccess =
          isLocal == "accessRoles" ? ACCESESROLES : ACCESESGROUPS;

        for (let i = 0; i < getListAccess.length; i++) {
          if (listLbl[item].Label == getListAccess[i].Label) {
            input.checked = true;
          }
        }

        rowDiv.appendChild(document.createElement("br"));
      }
    } catch (e) {
      div.innerHTML = "Item Not Found";
    }
  }

  //btn save
  let btnSave = document.createElement("button");
  btnSave.className = "btn btn-primary";
  btnSave.innerHTML = "ذخیره";
  btnSave.style.float = "right";
  btnSave.style.margin = "10px 0px 10px 5px";
  $("#chartModal").append(btnSave);
  btnSave.onclick = function () {
    let count = 0;
    let tabId;
    let items;
    while (count < 2) {
      if (count == 0) {
        tabId = "Roles";
        tabIems(REFROLES, tabId);
      } else {
        tabId = "Groups";
        tabIems(REFGROUPS, tabId);
      }
      count++;
    }
    HideModal();
  };

  function tabIems(items, tabId) {
    let obj = {};
    let Array = [];
    for (let i in items) {
      let check = document.getElementById("check" + i + tabId);
      let label = document.getElementById("label" + i + tabId);
      let _ID;
      tabId == "Roles"
        ? (_ID = REFROLES.find(
            (Element) => Element.Label == label.innerHTML
          ).ID)
        : (_ID = REFGROUPS.find(
            (Element) => Element.Label == label.innerHTML
          ).ID);
      if (check.checked) {
        obj = {
          ID: _ID,
          Label: label.innerHTML,
        };
        Array.push(obj);
      }
    }
    if (tabId == "Roles") {
      ACCESESROLES = Array;
    } else if (tabId == "Groups") {
      ACCESESGROUPS = Array;
    }
  }

  let btnExit = document.createElement("button");
  btnExit.className = "btn btn btn-light";
  btnExit.innerHTML = "خروج";
  btnExit.onclick = () => HideModal();
  btnExit.style.float = "right";
  btnExit.style.margin = "10px 0px 10px 10px";
  $("#chartModal").append(btnExit);
}
