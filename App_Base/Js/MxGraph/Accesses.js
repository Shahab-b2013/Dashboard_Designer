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

  //tab1
  $("#tab-content").append(
    '<div class="tab-pane fade in active" id="Tab1"></div>'
  );
  //tab2
  $("#tab-content").append('<div class="tab-pane fade" id="Tab2"></div>');

  //get/set refRoles
  if (REFROLES != null) Tabinfo(REFROLES, "Tab1", "Roles");
  //get/set refGroups
  if (REFGROUPS != null) Tabinfo(REFGROUPS, "Tab2", "Groups");

  //tabs body
  function Tabinfo(listLbl, ID, tabId) {
    for (let item in listLbl) {
      $("#" + ID).append(
        '<div id="rowDiv' +
          ID +
          '" class="rowDiv" style="direction:rtl;"></div>'
      );

      //label
      $("#rowDiv" + ID).append(
        '<label id="label' +
          item +
          tabId +
          '" class="lbl" style="display:inline;margin:5px 5px 0px 0px;">' +
          listLbl[item].Label +
          "</label>"
      );
      $("#label" + item + tabId).click(() => {
        $("#check" + item + tabId).is(":checked")
          ? $("#check" + item + tabId).prop("checked", false)
          : $("#check" + item + tabId).prop("checked", true);
      });

      //checkbox
      $("#rowDiv" + ID).append(
        '<input id="check' +
          item +
          tabId +
          '" type="checkbox" style="margin:5px;cursor:pointer;float:right;">'
      );
      //input isChecked
      let isLocal;
      tabId == "Roles" ? (isLocal = "accessRoles") : (isLocal = "accessGroups");

      let getListAccess =
        isLocal == "accessRoles" ? ACCESESROLES : ACCESESGROUPS;

      for (let i = 0; i < getListAccess.length; i++) {
        if (listLbl[item].Label == getListAccess[i].Label) {
          $("#check" + item + tabId).prop("checked", true);
        }
      }

      $("#rowDiv" + ID).append("</br>");
    }
  }

  //btn Save
  $("#chartModal").append(
    '<button id="btnsave_Accessess" class="btn btn-primary" style="float:right;margin:10px 0px 10px 5px;">ذخیره</button>'
  );
  $("#btnsave_Accessess").click(() => {
    let count = 0;
    let tabId;
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
  });

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
  //btn Exit
  $("#chartModal").append(
    '<button class="btn btn btn-light" onclick="HideModal()" style="float:right;margin:10px 0px 10px 10px;">خروج</button>'
  );
}
