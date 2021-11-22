function Filters(e) {
  let div = document.createElement("div");
  div.setAttribute("id", "builder-basic");
  div.className = "containerside";
  div.style.direction = "ltr";
  this.container = div;

  setTimeout(QueryBuilder, 0);
  setTimeout(BtnSql, 0);
  setTimeout(BtnReset, 0);
  setTimeout(btnExit, 0);

  //btn reset
  function BtnReset() {
    let btn = document.createElement("button");
    btn.className = "btnReset";
    btn.innerHTML = "شروع مجدد";
    div.appendChild(btn);

    btn.onclick = function () {
      $("#builder-basic").queryBuilder("reset");
      sessionStorage.removeItem("Filters");
      sessionStorage.removeItem("sqlFilters");
    };
  }
  // BtnSql
  function BtnSql() {
    let btn = document.createElement("button");
    btn.innerHTML = "ذخیره";
    btn.className = "btn btn-primary";
    btn.style.borderTopLeftRadius = 0;
    btn.style.borderBottomLeftRadius = 0;
    div.appendChild(btn);

    btn.onclick = function () {
      var result = $("#builder-basic").queryBuilder("getSQL", false);

      //set sql
      if (result.sql.length != null) {
        let localData = JSON.stringify(result.sql);
        sessionStorage.setItem("sqlFilters", localData);
      }
      //set json
      result = $("#builder-basic").queryBuilder("getRules");

      if (!$.isEmptyObject(result)) {
        let localData = JSON.stringify(result, null, 2);
        sessionStorage.setItem("Filters", localData);
      }

      editorUi.hideDialog();
    };
  }

  // btnExit
  function btnExit() {
    let btnExit = document.createElement("button");
    btnExit.className = "btn btn-light";
    btnExit.style.float = "right";
    btnExit.style.borderBottomRightRadius = "0px";
    btnExit.style.borderTopRightRadius = "0px";
    btnExit.innerText = "خروج";
    btnExit.onclick = function () {
      editorUi.hideDialog();
    };
    div.appendChild(btnExit);
  }

  function QueryBuilder() {
    var localjson = sessionStorage.getItem("Filters");
    var rules_basic;

    if (localjson != "null") {
      rules_basic = JSON.parse(localjson);
    }

    //load
    $("#builder-basic").queryBuilder(GetLocalFilter(rules_basic));
  }
  function GetLocalFilter(rules_basic) {
    var listArray = [];
    let subjson = sessionStorage.getItem("subjson");
    subjson = JSON.parse(subjson);
    let refColumns = [
      {
        id: 1,
        name: "column1",
        header: "عنوان 1",
        data: "[data1]",
        summary: "خلاصه1",
        type: "string",
        input: "text",
        values: {},
      },
      {
        id: 2,
        name: "column2",
        header: "عنوان 2",
        data: "[data2]",
        summary: "خلاصه2",
        type: "double",
        input: "text",
        values: {},
      },
      {
        id: 3,
        name: "column3",
        header: "عنوان 3",
        data: "[data33333]",
        summary: "خلاصه3",
        type: "integer",
        input: "radio",
        values: {
          0: "No",
          1: "Yes",
        },
        operators: ["equal"],
      },
      {
        id: 4,
        name: "column4",
        header: "عنوان 4",
        data: "[data4]",
        summary: "خلاصه4",
        type: "integer",
        input: "select",
        values: {
          1: "Books",
          2: "Movies",
          3: "Music",
          4: "Tools",
          5: "Goodies",
          6: "Clothes",
        },
        operators: [
          "equal",
          "not_equal",
          "in",
          "not_in",
          "is_null",
          "is_not_null",
        ],
      },
    ];

    // subjson.poolDetails.table.refColumns;
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
