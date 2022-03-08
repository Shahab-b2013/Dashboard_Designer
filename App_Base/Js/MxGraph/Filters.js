'use strict';

function Filters(e) {
  let Default_Obj;
  if (REFCOLUMNS.length == 0) {
    Default_Obj = {
      ID: 0,
      Name: '',
      Header: 'عنوان ',
      Data: 'Default',
      Summary: '',
      Type: '',
      Input: '',
      Values: {},
      Operators: ['equal'],
    };
    REFCOLUMNS.push(Default_Obj);
  }
  ModalConstractor('40%', 'geContent');
  let container = $('#chartModal');

  container.addClass('containerside');
  let div = createDiv('containerside', 'builder-basic');

  container.append(div);
  $('#builder-basic').css('direction', 'ltr');

  (async () => await Promise.all([QueryBuilder(), BtnSql(), BtnReset(), btnExit()]))();

  //btn reset
  function BtnReset() {
    let btn = document.createElement('button');
    btn.className = 'btnReset';
    btn.innerHTML = 'شروع مجدد';
    div.appendChild(btn);
    btn.onclick = () => $('#builder-basic').queryBuilder('reset');
  }

  // BtnSql
  function BtnSql() {
    let btn = document.createElement('button');
    btn.innerHTML = 'ذخیره';
    btn.className = 'btn btn-primary';
    btn.style.float = 'right';
    btn.style.height = '34px';
    btn.style.borderTopLeftRadius = '0px';
    btn.style.borderBottomLeftRadius = '0px';
    div.appendChild(btn);
    btn.onclick = () => {
      //get sql
      let getSQL = $('#builder-basic').queryBuilder('getSQL', false);

      //get rules
      let getRules = $('#builder-basic').queryBuilder('getRules');

      //set sql and filters
      if (getSQL != null) {
        SQLFILTERS = getSQL.sql;
        FILTERS = getRules;
      } else {
        SQLFILTERS = null;
        FILTERS = null;
      }
      HideModal();
    };
  }

  // btnExit
  function btnExit() {
    let btnExit = document.createElement('button');
    btnExit.className = 'btn btn-light';
    btnExit.style.float = 'right';
    btnExit.style.height = '34px';
    btnExit.style.borderTopRightRadius = '0px';
    btnExit.style.borderBottomRightRadius = '0px';
    btnExit.innerText = 'خروج';
    btnExit.onclick = function () {
      HideModal();
    };
    div.appendChild(btnExit);
  }

  //load
  function QueryBuilder() {
    $('#builder-basic').queryBuilder(GetLocalFilter());
    if (FILTERS == null) $('#builder-basic').queryBuilder('reset');
  }
  function GetLocalFilter() {
    let filtersArr = [];
    let object;
    if (REFCOLUMNS.length > 0)
      for (let i = 0; i < REFCOLUMNS.length; i++) {
        object = {
          id: REFCOLUMNS[i].data,
          label: REFCOLUMNS[i].data,
          type: REFCOLUMNS[i].type,
          input: REFCOLUMNS[i].input,
          values: REFCOLUMNS[i].values,
          operators: REFCOLUMNS[i].operators,
        };

        filtersArr.push(object);
      }

    return {
      filters: filtersArr,
      rules:
        FILTERS == null
          ? {
              condition: 'AND',
              rules: [
                {
                  id: REFCOLUMNS[0].Data,
                },
              ],
            }
          : FILTERS,
    };
  }
}
