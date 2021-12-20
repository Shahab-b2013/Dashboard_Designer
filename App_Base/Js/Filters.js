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


        const ruleDefault = {
            filters: [ {
                id: '1',
                label: '- - - - - - - ',
                type: 'double',
                validation: {
                    min: 0,
                    step: 0.01
                }
            }],
            rules: {
                condition: 'AND',
                rules: [{
                    id: '1',
                    operator: 'less',
                    value: 10.25
                }]
            }
        }

   
        if (Object.keys(FILTERS).length > 0) {
            //load
            $("#builder-basic").queryBuilder(GetLocalFilter());
        } else {
            //load
            $("#builder-basic").queryBuilder(ruleDefault);
            $("#builder-basic").queryBuilder("reset");
        }

    }

    function GetLocalFilter() {
        let filtersArr = [];
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
        return {
            filters: filtersArr,
            rules: FILTERS
        }
    }
}
