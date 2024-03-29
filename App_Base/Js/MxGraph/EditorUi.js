﻿'use strict';

function createDivs() {
  //Container
  $('body').append(createDiv('', 'main_Contain'));

  //TopDiv
  $('#main_Contain').append(createDiv('container-fluid', 'geTopDiv'));
  $('#geTopDiv').html('داشبورد امن پرداز');

  //Toolbar
  $('#main_Contain').append(createDiv('container-fluid', 'geToolbar'));

  $('#geToolbar').append(
    '<input type="button" id="Export_btn" class="btn btn-success Json_btn" onclick="ExportData()" value="ارسال اطلاعات"></input>',
  );

  $('#geToolbar').append(
    '<input type="button" id="Import_btn" class="btn btn-success Json_btn" onclick="ImportData()" value="دریافت اطلاعات"></input>',
  );

  //rowPanel
  $('#main_Contain').append(createDiv('row', 'RowID'));

  //RigthPanel
  $('#RowID').append(createDiv('col-lg-2', 'RightPanel'));

  //FildsPanel Header
  $('#RightPanel').append('<div id="rightPanelID" class="divHeader">نمودارها<li id="nemoodarIcon" class="glyphicon glyphicon-stats" ></li></div>');

  //FildsPanel
  $('#RightPanel').append(createDiv('col-lg-12 col-md-6', 'PanelId'));

  /*get imgArray from Img.js
  inset img to panel*/
  let id = 0;
  $.each(imgObject, function (index, items) {
    //divItem
    $('#PanelId').append(createDiv('rightpanelIcon noDrop', id));
    let divItem = $('#' + id);
    divItem.css('direction', 'ltr');
    divItem.css('display', 'flex');
    divItem.css('justifyContent', 'flex-end');
    divItem.attr('draggable', true);
    divItem.attr('type', index);
    document.getElementById(id).addEventListener('dragstart', (event) => dragstart(event));
    document.getElementById(id).addEventListener('mousedown', () => $('#' + id).css('cursor', 'grabbing'));
    document.getElementById(id).addEventListener('mouseup', () => {
      divItem.css('cursor', 'grab');
      $('.form-group-body').css('opacity', '1');
      $('.form-group-body').removeClass('noDrop');
      $('.rowBtnGroup-span').css('display', 'none');
    });
    document.getElementById(id).addEventListener('mouseover', () => $('#' + id).css('cursor', 'grab'));
    document.getElementById(id).addEventListener('dragend', () => {
      $('.form-group-body').css('opacity', '1');
      $('.form-group-body').removeClass('noDrop');
      $('.rowBtnGroup-span').css('display', 'none');
    });

    //img
    const item = document.createElement('img');
    item.setAttribute('src', 'data:image/png;base64,' + items);
    item.setAttribute('draggable', false);
    item.addEventListener('mouseover', () => (item.style.cursor = 'grab'));
    item.addEventListener('mousedown', () => (item.style.cursor = 'grabbing'));
    item.setAttribute('width', '30');
    item.setAttribute('height', '30');

    //label
    const lbl = document.createElement('label');
    lbl.setAttribute('id', 'lbl' + id);
    lbl.className = 'lbl rightPanelLbl';
    lbl.setAttribute('draggable', false);
    lbl.addEventListener('mouseover', () => (lbl.style.cursor = 'grab'));
    lbl.addEventListener('mousedown', () => (lbl.style.cursor = 'grabbing'));
    lbl.style.font = '1.4rem var(--mainFont)';
    id++;
    //gird right panel
    if (index == 'column') {
      lbl.innerHTML = ' ستونی ';
      divItem.append(lbl);
      divItem.css('gridColumn', 1);
      divItem.css('gridRow', 2);
      divItem.append(item);
    } else if (index == 'pie') {
      lbl.innerHTML = ' دایره ای';
      divItem.append(lbl);
      divItem.css('gridColumn', 2);
      divItem.css('gridRow', 2);
      divItem.append(item);
    } else if (index == 'bar') {
      lbl.innerHTML = ' میله ای';
      divItem.append(lbl);
      divItem.css('gridColumn', 1);
      divItem.css('gridRow', 3);
      divItem.append(item);
    } else if (index == 'line') {
      lbl.innerHTML = ' خطی';
      divItem.append(lbl);
      divItem.css('gridColumn', 2);
      divItem.css('gridRow', 3);
      divItem.append(item);
    } else if (index == 'areaspline') {
      lbl.innerHTML = 'مساحت خطی';
      divItem.append(lbl);
      divItem.css('gridColumn', 1);
      divItem.css('gridRow', 4);
      divItem.append(item);
    } else if (index == 'polar') {
      lbl.innerHTML = 'چارت انکبوتی';
      divItem.append(lbl);
      divItem.css('gridColumn', 2);
      divItem.css('gridRow', 4);
      divItem.append(item);
    } else if (index == 'table') {
      lbl.innerHTML = 'جدول';
      divItem.append(lbl);
      divItem.css('gridColumn', 1);
      divItem.css('gridRow', 5);
      divItem.append(item);
    } else if (index == 'group') {
      lbl.innerHTML = ' سطر جدید';
      divItem.append(lbl);
      divItem.css('gridColumn', 2);
      divItem.css('gridRow', 5);

      divItem.append(item);
    }
  });

  //Tools Header
  let ToolsHeader = document.createElement('div');
  ToolsHeader.className = 'col-lg-12 col-md-6 divHeader';
  ToolsHeader.innerHTML = 'تنظیمات';
  ToolsHeader.style.gridRow = '1';
  $('#RightPanel').append(ToolsHeader);

  const abzarIcons = document.createElement('li');
  abzarIcons.className = 'glyphicon glyphicon-cog';
  abzarIcons.setAttribute('id', 'abzarIcons');
  ToolsHeader.appendChild(abzarIcons);

  //Properties2
  $('#RightPanel').append(createDiv('', 'ToolsProp'));

  for (let i = 0; i < 2; i++) {
    //Tools Icon
    let ToolsIcon = document.createElement('img');
    ToolsIcon.className = 'ToolsIcon';
    ToolsIcon.setAttribute('width', '30');
    ToolsIcon.setAttribute('height', '30');
    ToolsIcon.setAttribute('draggable', false);
    //ToolsLbl
    let ToolsLbl = document.createElement('label');
    ToolsLbl.className = 'ToolsLbl';
    ToolsLbl.style.font = '1.4rem var(--mainFont)';
    if (i == 0) {
      ToolsIcon.setAttribute('src', 'data:image/png;base64,' + imgFilter);
      ToolsIcon.style.gridColumn = '1';
      ToolsIcon.style.gridRow = '2';
      ToolsLbl.className = 'ToolsLbl lbl';
      ToolsLbl.innerHTML = 'فیلتر داده ها';
      ToolsLbl.style.gridColumn = '1';
      ToolsLbl.style.gridRow = '2';
      ToolsLbl.style.cursor = 'pointer';
      ToolsLbl.onclick = (e) => Filters(e);
    } else if (i == 1) {
      ToolsIcon.setAttribute('src', 'data:image/png;base64,' + imgAccesses);
      ToolsIcon.style.gridColumn = '1';
      ToolsIcon.style.gridRow = '3';

      ToolsLbl.className = 'ToolsLbl lbl';
      ToolsLbl.innerHTML = 'دسترسی ها';
      ToolsLbl.style.gridColumn = '1';
      ToolsLbl.style.gridRow = '3';
      ToolsLbl.style.cursor = 'pointer';
      ToolsLbl.onclick = (e) => Accesses(e);
    }

    $('#ToolsProp').append(ToolsIcon);
    $('#ToolsProp').append(ToolsLbl);
  }

  //Content create form
  $('#RowID').append(createDiv('col-lg-10' + ' noDrop', 'geContent'));

  //footer
  let Footer = createDiv('container-fluid', 'geFooter');
  Footer.innerHTML = '© كليه حقوق برای شرکت نرم افزاری امن پرداز محفوظ است.';
  $('#main_Contain').append(Footer);
}
///IMPORT JSON
function ImportData() {
  ModalConstractor('25%', 'geContent');
  $('#chartModal').css('top', '100px');

  const div = '<div id="open_div"></div>';
  $('#chartModal').append(div);

  let input_file =
    '<input type="file" id="file-input" accept=".json" style="margin-bottom:20px;margin-top: 20px;font-size: 12px;cursor:pointer" onchange="openShow()"/><span style="font-size:12px;direction: rtl;display:flex;"> این نرم افزار فقط از فرمت JSON پشتیبانی می کند.  </br></br></br></br></br></span><hr>';
  $('#open_div').append(input_file);
  let Open_btn =
    '<input type="button" id="open_btn" class="btn btn-primary" value="باز کردن" onclick="openfile()" style="float:right; width:70px;margin-bottom:10px;" Disabled />';
  $('#open_div').append(Open_btn);

  let cancel_btn =
    '<input type="button" id="cancel_btn" class="btn btn-light" value="لغو" style="margin-right:5px;float:right;width:70px;margin-bottom:10px;" onclick="HideModal()">';
  $('#open_div').append(cancel_btn);
}
function openShow() {
  $('#open_btn').removeAttr('Disabled');
}

function createInput(type, opt, id) {
  let input;
  if (type == 'dropdown') {
    input = document.createElement('select');
    input.style.width = '120px';
    input.style.fontSize = '14px';
    input.style.height = '25px';
    input.style.fontFamily = 'Tahoma';
    opt.map((value) => {
      let options = document.createElement('option');
      options.innerText = value;
      input.appendChild(options);
    });
  } else {
    input = document.createElement('input');
    input.type = type;
    input.value = opt;
  }
  input.setAttribute('id', id);
  input.style.alignSelf = 'center';
  input.style.justifySelf = 'right';
  input.style.marginBottom = '5px';
  input.style.cursor = 'pointer';
  return input;
}

//groupbtn
function Group_Btn(GroupId) {
  return (
    '<div id="rowBtnGroup-' +
    GroupId +
    '" class="row container-fluid rowBtnGroup noDrop">' +
    '<span style="border-top-right-radius: 0px;border-bottom-right-radius: 0px;" class="delete btn btn-light glyphicon glyphicon-trash"  title="حذف سطر" onclick="DeleteGroup(this);" id=' +
    GroupId +
    'DeleteGroup></span>' +
    '<span style="border-radius:0px" class="edit btn btn-light glyphicon glyphicon-cog"  title="تعداد ستون ها" onclick="GroupSplit(this);" id="EditGroup-' +
    GroupId +
    '"></span>' +
    '<span class="vol"><span style="display:none" id="slider-' +
    GroupId +
    '" class="slider"><input type="range" id="myslider-' +
    GroupId +
    '" class="myslider" min="1" max="3" step="1" oninput="volume(this)" onmouseout="hideSlider(this)" /><label class="lblSlider" id="lblSlider-' +
    GroupId +
    '"></label></span></span>' +
    '<span style="width:42px;padding:5px;border-radius:0px" class="btn btn-light glyphicon glyphicon-arrow-up" title="انتقال سطر به بالا" onclick="rowMoveUp(event);" id="moveup-' +
    GroupId +
    '"></span><span style="width:42px;border-top-left-radius: 0px;border-bottom-left-radius: 0px;" class="btn btn-light glyphicon glyphicon-arrow-down"  data-placement="top" title="انتقال سطر به پایین" onclick="rowMoveDown(event)" id="movedown-' +
    GroupId +
    '"></span><span id="rowBtnGroup-span' +
    GroupId +
    '" class="rowBtnGroup-span col-lg-12 noDrop" ondrop="GroupFns(event);" ondragover="event.preventDefault();"> ...سطر جدید را اینجا رها کنید</span></div>'
  );
}
