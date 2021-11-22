function Accesses(e) {
    // let container = document.createElement("div");
    // container.className = "containerside";
    // this.container = container;

    // let tabDiv = document.createElement("div");
    // tabDiv.className = "tabdiv";
    // container.appendChild(tabDiv);

    // //ul
    // let ul = document.createElement("ul");
    // ul.className = "nav nav-tabs navbar-right";
    // tabDiv.appendChild(ul);
    // //li
    // let li1 = document.createElement("li");
    // li1.setAttribute("id", "Roles");
    // li1.className = "active";
    // let a = document.createElement("a");
    // a.setAttribute("data-toggle", "tab");
    // a.href = "#Tab1";
    // a.innerHTML = "نقش ها";
    // a.style.fontWeight = "bold";
    // li1.appendChild(a);
    // ul.appendChild(li1);
    // //li
    // let li2 = document.createElement("li");
    // li2.setAttribute("id", "Groups");
    // a = document.createElement("a");
    // a.setAttribute("data-toggle", "tab");
    // a.href = "#Tab2";
    // a.innerHTML = "گروه ها";
    // a.style.fontWeight = "bold";
    // li2.appendChild(a);
    // ul.appendChild(li2);

    // //tab content
    // let tabcontent = document.createElement("div");
    // tabcontent.className = "tab-content";
    // container.appendChild(tabcontent);

    // //tab1
    // let tab1 = document.createElement("div");
    // tab1.setAttribute("id", "Tab1");
    // tab1.className = "tab-pane fade in active";
    // tabcontent.appendChild(tab1);
    // //get/set refRoles
    // var refRoles = sessionStorage.getItem("refRoles");
    // if (refRoles != null) {
    //   Tabinfo(refRoles, tab1, "Roles");
    // }

    // //tab2
    // let tab2 = document.createElement("div");
    // tab2.setAttribute("id", "Tab2");
    // tab2.className = "tab-pane fade";
    // tabcontent.appendChild(tab2);
    // //get/set refGroups
    // var refGroups = sessionStorage.getItem("refGroups");
    // if (refGroups != null) {
    //   Tabinfo(refGroups, tab2, "Groups");
    // }

    // // tab Data
    // function Tabinfo(listLbl, div, tabId) {
    //   try {
    //     //get/set old Roles
    //     let getRoleLocal = sessionStorage.getItem("accessRoles");
    //     getRoleLocal = JSON.parse(getRoleLocal);

    //     //get/set old Groups
    //     let getGroupsLocal = sessionStorage.getItem("accessGroups");
    //     getGroupsLocal = JSON.parse(getGroupsLocal);

    //     listLbl = JSON.parse(listLbl);

    //     for (let item in listLbl) {
    //       let rowDiv = document.createElement("div");
    //       rowDiv.style.margin = "10px 0px 10px 550px";
    //       div.appendChild(rowDiv);

    //       //label
    //       let checkLbl = document.createElement("label");
    //       checkLbl.className = "lbl";
    //       checkLbl.style.display = "inline";
    //       checkLbl.setAttribute("id", "label" + item + tabId);
    //       checkLbl.style.margin = "10px 5px 10px 0px";
    //       checkLbl.onclick = () =>
    //         $("#check" + item + tabId).is(":checked")
    //           ? $("#check" + item + tabId).prop("checked", false)
    //           : $("#check" + item + tabId).prop("checked", true);
    //       checkLbl.innerHTML = listLbl[item].label;
    //       rowDiv.appendChild(checkLbl);

    //       //checkbox
    //       let input = document.createElement("input");
    //       input.setAttribute("id", "check" + item + tabId);
    //       input.type = "checkbox";
    //       input.style.margin = "0px";
    //       input.style.cursor = "pointer";
    //       input.style.float = "right";
    //       rowDiv.appendChild(input);
    //       //input isChecked
    //       let isLocal;
    //       tabId == "Roles" ? (isLocal = "accessRoles") : (isLocal = "accessGroups");
    //       let getListAccess = sessionStorage.getItem(isLocal);
    //       getListAccess = JSON.parse(getListAccess);
    //       for (let i = 0; i < getListAccess.length; i++) {
    //         if (listLbl[item].label == getListAccess[i].label) {
    //           input.checked = true;
    //         }
    //       }

    //       rowDiv.appendChild(document.createElement("br"));
    //     }
    //   } catch (e) {
    //     div.innerHTML = "Item Not Found";
    //   }
    // }

    // //btn save
    // let btnSave = document.createElement("button");
    // btnSave.className = "btn btn-primary";
    // btnSave.innerHTML = "ذخیره";
    // container.appendChild(btnSave);

    // btnSave.onclick = function () {
    //   let count = 0;
    //   let tabId;
    //   let items;
    //   while (count < 2) {
    //     if (count == 0) {
    //       tabId = "Roles";
    //       items = JSON.parse(refRoles);
    //       tabIems(items, tabId);
    //     } else {
    //       tabId = "Groups";
    //       items = JSON.parse(refGroups);
    //       tabIems(items, tabId);
    //     }
    //     count++;
    //   }
    //   editorUi.hideDialog();
    // };

    // function tabIems(items, tabId) {
    //   let obj = {};
    //   let Array = [];
    //   let j = 0;
    //   for (let i in items) {
    //     let check = document.getElementById("check" + i + tabId);
    //     let label = document.getElementById("label" + i + tabId);

    //     if (check.checked) {
    //       obj = {
    //         id: j++,
    //         label: label.innerHTML,
    //       };
    //       Array.push(obj);
    //     }
    //   }
    //   if (tabId == "Roles") {
    //     let RolesArray = JSON.stringify(Array);
    //     sessionStorage.setItem("accessRoles", RolesArray);
    //   } else if (tabId == "Groups") {
    //     let GroupsArray = JSON.stringify(Array);
    //     sessionStorage.setItem("accessGroups", GroupsArray);
    //   }
    // }

    // let btnExit = document.createElement("button");
    // btnExit.className = "btn btn btn-light";
    // btnExit.innerHTML = "خروج";
    // btnExit.onclick = () => editorUi.hideDialog();
    // container.appendChild(btnExit);
}