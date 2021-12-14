"use strict";

function Filters(e) {
  ModalConstractor("40%", "geContent");
  let container = $("#chartModal");

  container.addClass("containerside");
  let div = createDiv("containerside", "builder-basic");

  container.append(div);
  $("#builder-basic").css("direction", "ltr");
  setTimeout(QueryBuilder, 0);
  setTimeout(BtnSql, 0);
  setTimeout(BtnReset, 0);
  setTimeout(btnExit, 0);

  //btn reset
  function BtnReset() {
    let btn = document.createElement("button");
    btn.className = "btnReset";
    btn.style.height = "34px";
    btn.style.float = "right";
    btn.style.borderRadius = "2px";
    btn.style.marginRight = "5px";
    btn.style.marginLeft = "5px";
    btn.innerHTML = "شروع مجدد";
    div.appendChild(btn);
    btn.onclick = function () {
      $("#builder-basic").queryBuilder("reset");
      FILTERS = {};
    };
  }

  // BtnSql
  function BtnSql() {
    let btn = document.createElement("button");
    btn.innerHTML = "ذخیره";
    btn.className = "btn btn-primary";
    btn.style.float = "right";
    btn.style.height = "34px";
    div.appendChild(btn);
    btn.onclick = function () {
      var result = $("#builder-basic").queryBuilder("getSQL", false);

      //set sql
      if (result.sql.length != null) {
        let localData = result.sql;
        SQLFILTERS = localData;
        console.log(SQLFILTERS);
      }
      //set json
      result = $("#builder-basic").queryBuilder("getRules");

      if (!$.isEmptyObject(result)) {
        let localData = result;
        FILTERS = localData;
      }

      HideModal();
    };
  }

  // btnExit
  function btnExit() {
    let btnExit = document.createElement("button");
    btnExit.className = "btn btn-light";
    btnExit.style.float = "right";
    btnExit.style.height = "34px";
    btnExit.innerText = "خروج";
    btnExit.onclick = function () {
      HideModal();
    };
    div.appendChild(btnExit);
  }

  function QueryBuilder() {
    var localjson = FILTERS;
    var rules_basic;
    if (localjson != "null") {
      rules_basic = localjson;
    }

    //load
    $("#builder-basic").queryBuilder(GetLocalFilter(rules_basic));
  }

  function GetLocalFilter(rules_basic) {
    var listArray = [];
    let refColumns = REFCOLUMNS;
    for (let i = 0; i < refColumns.length; i++) {
      let data = refColumns[i].data;
      let type1 = refColumns[i].type;
      let input = refColumns[i].input;
      let values = refColumns[i].values;
      let operators = refColumns[i].operators;
      let object = {
        id: data,
        label: data,
        type: type1,
        input: input,
        values: values,
        operators: operators,
      };

      listArray.push(object);
    }

    var obj = {};
    obj.filters = listArray;
    obj.rules = rules_basic;
    return obj;
  }
}
