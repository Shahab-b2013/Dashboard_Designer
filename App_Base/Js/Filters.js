"use strict";

function Filters(e) {
    ModalConstractor("40%", "geContent");
    let container = $("#chartModal");

    container.addClass("containerside");
    let div = createDiv("containerside", "builder-basic");

    container.append(div);
    $("#builder-basic").css("direction", "ltr");

    (async () => await Promise.all([QueryBuilder(), BtnSql(), BtnReset(), btnExit()]))();

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
        var rules_basic;
        if (FILTERS != "null") rules_basic = FILTERS;

        //load
        $("#builder-basic").queryBuilder(GetLocalFilter(rules_basic));
    }

    function GetLocalFilter(rules_basic) {

        var filtersArr = [];
        for (let i = 0; i < REFCOLUMNS.length; i++) {
            let object = {
                id: REFCOLUMNS[i].Data,
                label: REFCOLUMNS[i].Data,
                type: REFCOLUMNS[i].Type,
                input: REFCOLUMNS[i].Input,
                values: REFCOLUMNS[i].Values,
                operators: REFCOLUMNS[i].Operators,
            };

            filtersArr.push(object);
        }

        var obj = {};
        obj.filters = filtersArr;
        obj.rules = rules_basic;
        return obj;
    }
}
