// JScript File(Amnpardaz Software Co. Copyright 2020 - All Right Reserved)
// Release Ferdos.WebAppDesk 2.5.1.0

function formView(
  id,
  objKeys,
  processTaskID,
  processStateID,
  taskGroupID,
  taskIsLock
) {
  var _actContextID = parseInt(id) < 3000000 ? id : null;

  var _reportID = parseInt(id) >= 3000000 ? id : null;

  var _objKeys = objKeys;

  var _parObjType = -1;

  var _processTaskID = processTaskID;

  var _processStateID = processStateID;

  var _parContextID = -1;

  var _parObjKey = 0;

  var _formOptions;

  var _formItems;

  var _formGroups;

  var _data;

  var _prcStateOptions;

  var _prcTranscations;

  var _prcStateActLinks;

  var _prcTaskStatuses;

  var _processData;

  var _fileExist = {};

  var _fileAttachCode = {};

  var _pageElementID;

  var _isDefault = "False";

  var _form = null;

  this.renderContext = function (pageElementID, parObjType, parObjKey) {
    var content = "";

    var bodyID = "#box-body-" + pageElementID;

    var boxID = "#page-box-" + pageElementID;

    _parObjType = parObjType;

    _parObjKey = parObjKey;

    _pageElementID = pageElementID;

    $$FormItems = [];

    $$FormGroups = [];

    $$AjaxSelects = [];

    //#region Load Form Metadata

    cache = localStorage.getItem(window.btoa("form$" + _actContextID));

    if (!cache) {
      _form = new iComData("form", _actContextID, null, null);

      _form = _form.getData();

      localStorage.setItem(
        window.btoa("form$" + _actContextID),
        reverse(encodeURI(JSON.stringify(_form)))
      );
    } else {
      _form = jQuery.parseJSON(decodeURI(reverse(cache)));
    }

    _formOptions = _form.options;

    if (_formOptions.DataActivityID != "" && _objKeys.length == 1) {
      _data = new aData(_formOptions.DataActivityID, _objKeys);

      if (_data.getError() != null) {
        raiseError(_data.getError(), bodyID);

        return;
      }

      _data = _data.getObject();
    }

    _formItems = _form.items;

    //#endregion

    $(boxID + " .box-title").html(_formOptions.Label);

    $(bodyID).html("");

    //#region Render Form Items Layout & Grouping

    if (jQuery.parseJSON(_formOptions.ItemsGrouping)) {
      _formGroups = _form.groups;

      try {
        $.each(_formGroups, function (index, formGroup) {
          content =
            '<div  style="' +
            (formGroup.Visibility == "DefaultHidden" ? "display:none" : "") +
            '" id="form-group-' +
            formGroup.FormGroupBoxID +
            '"  class="row form-group-box">';

          $$FormGroups[formGroup.Name] = formGroup.FormGroupBoxID;

          if (formGroup.GroupDisplayMode == "GroupWithBox") {
            content +=
              '<div class="col-lg-2 col-md-2 group-info"><h4 class="group-title">' +
              formGroup.Label +
              "<br /><small>" +
              formGroup.Description +
              "</small></h4></div>";
          }

          var columnWidth = formGroup.ColumnWidth;

          if (formGroup.ColumnLayout == "OnceColumn") {
            if (columnWidth == "default") {
              columnWidth = "col-lg-7 col-md-10";
            }

            content +=
              '<div class="' +
              columnWidth +
              ' col-sm-12  col-xs-12" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-0"></div>';
          }

          if (formGroup.ColumnLayout == "TwoColumn") {
            columnWidth = "col-md-4";

            content +=
              '<div class="' +
              columnWidth +
              '" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-0"></div><div class="col-md-1"></div><div class="' +
              columnWidth +
              '" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-1"></div><div class="col-md-1"></div>';
          }

          if (formGroup.ColumnLayout == "ThreeColumn") {
            if (formGroup.GroupDisplayMode == "GroupWithBox") {
              columnWidth = "col-md-2";
            } else {
              columnWidth = "col-md-3";
            }

            content +=
              '<div class="' +
              columnWidth +
              '" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-0"></div><div class="col-md-1"></div><div class="' +
              columnWidth +
              '" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-1"></div><div class="col-md-1"></div><div class="' +
              columnWidth +
              '" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-2"></div><div class="col-md-1"></div>';
          }

          content += "</div>";

          $(bodyID).append(content);

          if (formGroup.GroupDisplayMode == "GroupWithTitle") {
            $("#form-group-body-" + formGroup.FormGroupBoxID + "-0").append(
              '<h4 class="group-title">' +
                formGroup.Label +
                "<br /><small>" +
                formGroup.Description +
                "</small></h4>"
            );
          }
        });
      } catch (e) {
        raiseError(e, bodyID);

        return;
      }
    } else {
      try {
        content = '<div class="row form-group-box">';

        var columnWidth = _formOptions.ColumnWidth;

        if (_formOptions.ColumnLayout == "OnceColumn") {
          if (columnWidth == "default") {
            columnWidth = "col-lg-7 col-md-10";
          }

          content +=
            '<div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-0"></div>';
        }

        if (_formOptions.ColumnLayout == "TwoColumn") {
          columnWidth = "col-md-4";

          content +=
            '<div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-0"></div><div class="col-md-1"></div><div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-1"></div><div class="col-md-1"></div>';
        }

        if (_formOptions.ColumnLayout == "ThreeColumn") {
          columnWidth = "col-md-3";

          content +=
            '<div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-0"></div><div class="col-md-1"></div><div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-1"></div><div class="col-md-1"></div><div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-2"></div><div class="col-md-1"></div>';
        }

        content += "</div>";

        $(bodyID).append(content);
      } catch (e) {
        raiseError(e, bodyID);

        return;
      }
    }

    //#endregion

    //#region Render Form Items

    var parentID = "";

    var itemsGrouping = jQuery.parseJSON(_formOptions.ItemsGrouping);

    try {
      $.each(_formItems, function (index, formItem) {
        if (itemsGrouping) {
          parentID =
            "#form-group-body-" +
            formItem.FormGroupBoxID +
            "-" +
            formItem.ColumnIndex;
        } else {
          parentID =
            "#form-group-mbody-" +
            _formOptions.FormID +
            "-" +
            formItem.ColumnIndex;
        }

        $$FormItems[formItem.Name] = formItem;

        switch (formItem.InputType) {
          case "SelectList":
            renderSelectList(formItem, parentID, _formOptions.ActivityID);
            break;

          case "TextBox":
            renderTextBox(formItem, parentID, _formOptions.ActivityID);
            break;

          case "AutoTextBox":
            renderTextBox(formItem, parentID, _formOptions.ActivityID);
            break;

          case "FileBrowse":
            renderFileBrowse(formItem, parentID);
            break;

          case "CheckBox":
            renderCheckBox(formItem, parentID);
            break;

          case "RadioButtonList":
            renderRadioButtonList(formItem, parentID);
            break;

          case "TextArea":
            renderTextArea(formItem, parentID);
            break;

          case "DateBox":
            renderDateBox(formItem, parentID);
            break;

          case "DateTimeBox":
            renderDateBox(formItem, parentID);
            break;

          case "DateRangeBox":
            renderDateRangeBox(formItem, parentID);
            break;

          case "TreeSelectList":
            renderTreeSelectList(formItem, parentID);
            break;

          case "SecureBox":
            renderSecureBox(formItem, parentID);
            break;

          case "PasswordBox":
            renderPasswordBox(formItem, parentID);
            break;

          case "TextView":
            renderTextView(formItem, parentID);
            break;

          case "SignatureBox":
            renderSignatureBox(formItem, parentID);
            break;

          default:
            break;
        }
      });
    } catch (e) {
      raiseError(e, bodyID);

      return;
    }

    $.each(_formItems, function (index, formItem) {
      if (formItem.InputType == "SelectList" && formItem.ActionOnChange != "") {
        var defSelected = getDefaultValue(formItem);

        var match = false;

        var actionOnChange = jQuery.parseJSON(formItem.ActionOnChange);

        $.each(actionOnChange, function (index, event) {
          if (event.value.indexOf("[" + defSelected + "]") != -1) {
            match = true;

            $.each(event.actions, function (index, action) {
              if (action.targetType == "FormItem") {
                if (action.actionType == "Hide") {
                  $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                    "display",
                    "none"
                  );
                }

                if (action.actionType == "Show") {
                  $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                    "display",
                    "block"
                  );
                }

                if (action.actionType == "Reload") {
                  $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                    "display",
                    "block"
                  );
                }
              }

              if (action.targetType == "FormGroupBox") {
                if (action.actionType == "Hide") {
                  $("#form-group-" + $$FormGroups[action.target]).css(
                    "display",
                    "none"
                  );
                }

                if (action.actionType == "Show") {
                  $("#form-group-" + $$FormGroups[action.target]).css(
                    "display",
                    "block"
                  );
                }
              }
            });
          }

          if (event.value == "[0]" && !match) {
            $.each(event.actions, function (index, action) {
              if (action.targetType == "FormItem") {
                if (action.actionType == "Hide") {
                  $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                    "display",
                    "none"
                  );
                }

                if (action.actionType == "Show") {
                  $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                    "display",
                    "block"
                  );
                }
              }

              if (action.targetType == "FormGroupBox") {
                if (action.actionType == "Hide") {
                  $("#form-group-" + $$FormGroups[action.target]).css(
                    "display",
                    "none"
                  );
                }

                if (action.actionType == "Show") {
                  $("#form-group-" + $$FormGroups[action.target]).css(
                    "display",
                    "block"
                  );
                }
              }
            });
          }
        });
      }
    });

    //#endregion

    $(bodyID).append('<h5 class="message-form-success" id="smessage"></h5>');

    $(bodyID).append('<h5  class="message-form-error" id="emessage"></h5>');

    $(".fileinput-remove-button").on("click", function () {
      var itemName = $(this)
        .parents()
        .filter(function () {
          return $(this).attr("data-item-name") != undefined;
        })
        .first();

      _fileExist[itemName.attr("data-item-name")] = "0";

      setTimeout("alignSideBarHeight();", 1 * 100);
    });

    $("div.input-group-addon").on("click", function () {
      if ($(this).find(">:first-child").hasClass("glyphicon-plus")) {
        $(this).find(">:first-child").removeClass("glyphicon-plus");

        $(this).find(">:first-child").addClass("glyphicon-minus");
      } else {
        if ($(this).find(">:first-child").hasClass("glyphicon-minus")) {
          $(this).find(">:first-child").removeClass("glyphicon-minus");

          $(this).find(">:first-child").addClass("glyphicon-plus");
        }
      }
    });

    $(".view-checkbox").iCheck({
      checkboxClass: "icheckbox_square-green",

      radioClass: "iradio_square-green",
    });

    //#region Render Form Footer

    $("#box-footer-" + pageElementID).html("");

    $("#box-footer-" + pageElementID).append(
      '<button type="button" id="sbtn-act-' +
        _actContextID +
        '" class="btn btn-form-submit">' +
        $$Local.formSubmit +
        "</button>&nbsp;&nbsp;"
    );

    $("#box-footer-" + pageElementID).append(
      '<button type="button" id="cbtn-act-' +
        _actContextID +
        '" class="btn btn-default btn-form-cancel">' +
        $$Local.formReset +
        "</button>"
    );

    $("#sbtn-act-" + _actContextID).click(function () {
      try {
        var activiyParams = new Array();

        var activiyParam;

        var submitReady = true;

        //#region Validate & Append Form Data

        $.each(_formItems, function (index, formItem) {
          activiyParam = new Object();

          activiyParam.ParamIndex = index;

          activiyParam.ParamName = formItem.Name;

          activiyParam.FileIsExist = 2;

          activiyParam.FileAttachCode = "";

          var itemInputID = "#form-item-" + formItem.FormItemID;

          if (!formItem.IsReadOnly) {
            if (formItem.InputType != "CheckBox") {
              var val = $(itemInputID).val();

              if (formItem.InputType == "SelectList") {
                try {
                  if ($$AjaxSelects[itemInputID].status == 0) {
                    val = $$AjaxSelects[itemInputID].defaultValue;
                  }
                } catch (e) {}
              }

              if (jQuery.isArray(val)) {
                activiyParam.ParamValue = JSON.stringify(val);
              } else {
                activiyParam.ParamValue = val;
              }

              if (formItem.InputType == "SecureBox") {
                activiyParam.ParamValue = encryptInput(activiyParam.ParamValue);
              }

              if (formItem.InputType == "SignatureBox") {
                activiyParam.ParamValue = $(itemInputID).jSignature("getData");

                if (isCanvasBlank($(".jSignature"))) {
                  val = null;
                } else {
                  val = "Filled";
                }
              }

              if (formItem.InputType == "PasswordBox") {
                activiyParam.ParamValue = passwordInput(
                  activiyParam.ParamValue
                );

                var _val = $(itemInputID + "-rep").val();

                if ($.trim(val) != $.trim(_val) && $.trim(val) != "") {
                  $(itemInputID + "-rep")
                    .parents('div[class^="form-group"]')
                    .addClass("has-error");

                  submitReady = false;
                } else {
                  $(itemInputID + "-rep")
                    .parents('div[class^="form-group"]')
                    .removeClass("has-error");
                }
              }

              if (formItem.InputType == "FileBrowse") {
                activiyParam.FileIsExist = _fileExist[formItem.Name];

                activiyParam.FileAttachCode = _fileAttachCode[formItem.Name];

                var fileCaption = $("#form-group-" + formItem.FormItemID).find(
                  ".file-caption-name"
                );

                if (fileCaption.attr("title") == "خطای اعتبار سنجی") {
                  submitReady = false;
                }
              }

              var _display = $(itemInputID)
                .parents('div[class^="form-group"]')
                .css("display");

              if (
                ($.trim(val) == "" || val == null) &&
                jQuery.parseJSON(formItem.IsRequired) &&
                _display != "none"
              ) {
                if (formItem.InputType != "FileBrowse") {
                  $(itemInputID)
                    .parents('div[class^="form-group"]')
                    .addClass("has-error");

                  submitReady = false;
                } else {
                  if (_fileExist[formItem.Name] == "0") {
                    $(itemInputID)
                      .parents('div[class^="form-group"]')
                      .addClass("has-error");

                    submitReady = false;
                  }
                }
              } else {
                if (jQuery.parseJSON(formItem.IsRequired)) {
                  $(itemInputID)
                    .parents('div[class^="form-group"]')
                    .removeClass("has-error");
                }
              }

              if (
                formItem.InputType == "TextBox" ||
                formItem.InputType == "SecureBox" ||
                formItem.InputType == "PasswordBox" ||
                formItem.InputType == "AutoTextBox" ||
                formItem.InputType == "DateTimeBox"
              ) {
                if ($.trim(val) != "" && val != null) {
                  if (
                    val.length < parseInt(formItem.MinValueLenght) ||
                    val.length > parseInt(formItem.MaxValueLenght)
                  ) {
                    $(itemInputID)
                      .parents('div[class^="form-group"]')
                      .addClass("has-error");

                    submitReady = false;
                  } else {
                    $(itemInputID)
                      .parents('div[class^="form-group"]')
                      .removeClass("has-error");
                  }
                }
              }

              if (
                formItem.BaseDataType == "BIGINT" ||
                formItem.BaseDataType == "INT" ||
                formItem.BaseDataType == "MONEY"
              ) {
                if ($.trim(val) != "" && val != null) {
                  if (
                    parseInt(val) < parseInt(formItem.MinValue) ||
                    parseInt(val) > parseInt(formItem.MaxValue)
                  ) {
                    $(itemInputID)
                      .parents('div[class^="form-group"]')
                      .addClass("has-error");

                    submitReady = false;
                  } else {
                    $(itemInputID)
                      .parents('div[class^="form-group"]')
                      .removeClass("has-error");
                  }
                }
              }
            } else {
              if ($(itemInputID).is(":checked")) {
                activiyParam.ParamValue = "1";
              } else {
                activiyParam.ParamValue = "0";
              }
            }

            activiyParams[index] = activiyParam;
          }
        });

        //#endregion

        if (!submitReady) {
          if ($$Lang == "Fa") {
            $(bodyID + " #emessage").text(
              "*بعضی از موارد اجباری پر نشده یا مقادیر آن نامعتبر است"
            );
          } else {
            $(bodyID + " #emessage").text(
              "*Some items are not filled or has invalid values"
            );
          }

          $(bodyID + " #smessage").html("");

          alignSideBarHeight();

          return;
        } else {
          $(bodyID + " #emessage").text("");

          alignSideBarHeight();
        }

        var __objKeys = [];

        if (!_objKeys) {
          __objKeys[0] = 0;
        } else {
          __objKeys[0] = $.isArray(_objKeys) ? _objKeys[0] : _objKeys;
        }

        $(".wrapper").block({
          message: '<span class="message-form-block">..Processing<span>',
          baseZ: 10000,
        });

        var data = new FormData();

        //#region Append File Form Data

        $.each(_formItems, function (index, formItem) {
          if (formItem.InputType == "FileBrowse") {
            var files = $("#form-item-" + formItem.FormItemID).get(0).files;

            if (files) {
              if (files.length > 0) {
                data.append("file" + index, files[0]);
              }
            }
          }
        });

        data.append("activiyParams", JSON.stringify(activiyParams));

        data.append("objectIDs", JSON.stringify(__objKeys));

        data.append("id", _formOptions.ActivityID);

        //#endregion

        var $aExecutor = new aExecutor(
          0,
          data,
          boxID,
          jQuery.parseJSON(_formOptions.ActionOnSuccess),
          null,
          _parObjType
        );

        $aExecutor.submit();
      } catch (e) {
        raiseError(e, bodyID);

        return;
      }
    });

    $("#cbtn-act-" + _actContextID).click(function () {
      var $formView = new formView(_actContextID, _objKeys);

      $formView.renderContext(_pageElementID);
    });

    //#endregion
  };

  this.renderModalContext = function (
    modalID,
    parContextID,
    parObjType,
    parObjKey
  ) {
    var content = "";

    var bodyID = "#boxBodyModal" + modalID;

    var boxID = "#pageBoxModal" + modalID;

    _parObjType =
      parObjType != null && parObjType != undefined && parObjType != -1
        ? parObjType.replace("ToDay ", "")
        : parObjType;

    _parObjKey = parObjKey;

    _parContextID = parContextID;

    _modalID = modalID;

    $$FormItems = [];

    $$FormGroups = [];

    //#region Load Form Metadata

    cache = localStorage.getItem(window.btoa("form$" + _actContextID));

    if (!cache) {
      _form = new iComData("form", _actContextID, null, null);

      _form = _form.getData();

      localStorage.setItem(
        window.btoa("form$" + _actContextID),
        reverse(encodeURI(JSON.stringify(_form)))
      );
    } else {
      _form = jQuery.parseJSON(decodeURI(reverse(cache)));
    }

    if (_actContextID != null) {
      _formOptions = _form.options;
    }

    if (_reportID != null) {
      _formOptions = new iData(
        "174f1c8e-4803-4dbe-bf3f-5e56f0f41bfc",
        _reportID
      );

      _formOptions = _formOptions.getObject();
    }

    if (_formOptions.DataActivityID != "" && _objKeys.length == 1) {
      _data = new aData(_formOptions.DataActivityID, _objKeys);

      if (_data.getError() != null) {
        raiseError(_data.getError(), bodyID);

        return;
      }

      _data = _data.getObject();

      $.each(_data, function (key, value) {
        if (key.indexOf("IsDefault") > -1) {
          _isDefault = value;
        }
      });
    }

    if (_actContextID != null) {
      _formItems = _form.items;
    }

    if (_reportID != null) {
      _formItems = new iData("83927d76-9cc9-4801-99a1-d0c9c46c0175", _reportID);

      _formItems = _formItems.getList();
    }

    //#endregion

    //#region Load Task Form Metadata

    if (_processStateID) {
      if (taskIsLock) {
        var continus = confirm(
          "این فرم توسط کاربری دیگری ممکن است در حال استفاده باشد آیا مایل به ادامه هستید؟"
        );

        if (!continus) {
          $("#actContextModal" + modalID).modal("hide");
        } else {
          lockTaskByUser(_processTaskID);
        }
      } else {
        lockTaskByUser(_processTaskID);
      }

      _prcStateOptions = new iData(
        "567f98fb-8940-4411-8dab-f54654e567c7",
        _processStateID
      );

      if (_prcStateOptions.getError() != null) {
        raiseError(_prcStateOptions.getError(), bodyID);

        return;
      }

      _prcStateOptions = _prcStateOptions.getObject();

      _prcTranscations = new iData(
        "997f98f5-5463-7854-adf3-ab9954e56578",
        _processStateID
      );

      if (_prcTranscations.getError() != null) {
        raiseError(_prcTranscations.getError(), bodyID);

        return;
      }

      _prcStateActLinks = new iData(
        "c364bd29-7de5-4ced-812e-9f432cee94e0",
        _processStateID
      );

      if (_prcStateActLinks.getError() != null) {
        raiseError(_prcStateActLinks.getError(), bodyID);

        return;
      }

      _prcStateActLinks = _prcStateActLinks.getList();

      _prcTaskStatuses = new iData("54dd401a-e809-4570-b624-adf9758218c1", 0);

      if (_prcTaskStatuses.getError() != null) {
        raiseError(_prcTaskStatuses.getError(), bodyID);

        return;
      }

      _prcTaskStatuses = _prcTaskStatuses.getList();
    }

    //#endregion

    $("#boxTitleModal" + modalID).html(_formOptions.Label);

    if (
      $Data != null &&
      $Data != "" &&
      _formOptions.Label.indexOf("جدید") == -1
    ) {
      if (!(typeof $Data === "object")) {
        $("#boxTitleModal" + modalID).html(
          _formOptions.Label + " [ " + $Data + " ]"
        );
      }
    }

    $(bodyID).html("");

    //#region Render Form Items Layout & Grouping

    if (jQuery.parseJSON(_formOptions.ItemsGrouping)) {
      _formGroups = _form.groups;

      try {
        $.each(_formGroups, function (index, formGroup) {
          content =
            '<div style="' +
            (formGroup.Visibility == "DefaultHidden" ? "display:none" : "") +
            '" id="form-group-' +
            formGroup.FormGroupBoxID +
            '" class="row form-group-box">';

          $$FormGroups[formGroup.Name] = formGroup.FormGroupBoxID;

          if (formGroup.GroupDisplayMode == "GroupWithBox") {
            content +=
              '<div class="col-md-3 group-info"><h4 class="group-title">' +
              formGroup.Label +
              "<br /><small>" +
              formGroup.Description +
              "</small></h4></div>";
          }

          var columnWidth = formGroup.ColumnWidth;

          if (formGroup.ColumnLayout == "OnceColumn") {
            if (columnWidth == "default") {
              columnWidth = "col-md-8";
            }

            content +=
              '<div class="' +
              columnWidth +
              ' col-sm-12  col-xs-12" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-0"></div>';
          }

          if (formGroup.ColumnLayout == "TwoColumn") {
            columnWidth = "col-md-4";

            content +=
              '<div class="' +
              columnWidth +
              '" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-0"></div><div class="col-md-1"></div><div class="' +
              columnWidth +
              '" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-1"></div><div class="col-md-1"></div>';
          }

          if (formGroup.ColumnLayout == "ThreeColumn") {
            if (formGroup.GroupDisplayMode == "GroupWithBox") {
              columnWidth = "col-md-2";
            } else {
              columnWidth = "col-md-3";
            }

            content +=
              '<div class="' +
              columnWidth +
              '" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-0"></div><div class="col-md-1"></div><div class="' +
              columnWidth +
              '" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-1"></div><div class="col-md-1"></div><div class="' +
              columnWidth +
              '" id="form-group-body-' +
              formGroup.FormGroupBoxID +
              '-2"></div><div class="col-md-1"></div>';
          }

          content += "</div>";

          $(bodyID).append(content);

          if (formGroup.GroupDisplayMode == "GroupWithTitle") {
            $("#form-group-body-" + formGroup.FormGroupBoxID + "-0").append(
              '<h4 class="group-title">' +
                formGroup.Label +
                "<br /><small>" +
                formGroup.Description +
                "</small></h4>"
            );
          }
        });
      } catch (e) {
        raiseError(e, bodyID);

        return;
      }
    } else {
      try {
        content = '<div class="row form-group-box">';

        var columnWidth = _formOptions.ColumnWidth;

        if (_formOptions.ColumnLayout == "OnceColumn") {
          if (columnWidth == "default") {
            columnWidth = "col-md-8";
          }

          content +=
            '<div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-0"></div>';
        }

        if (_formOptions.ColumnLayout == "TwoColumn") {
          columnWidth = "col-md-4";

          content +=
            '<div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-0"></div><div class="col-md-1"></div><div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-1"></div><div class="col-md-1"></div>';
        }

        if (_formOptions.ColumnLayout == "ThreeColumn") {
          columnWidth = "col-md-3";

          content +=
            '<div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-0"></div><div class="col-md-1"></div><div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-1"></div><div class="col-md-1"></div><div class="' +
            columnWidth +
            '" id="form-group-mbody-' +
            _formOptions.FormID +
            '-2"></div><div class="col-md-1"></div>';
        }

        content += "</div>";

        $(bodyID).append(content);
      } catch (e) {
        raiseError(e, bodyID);

        return;
      }
    }

    //#endregion

    //#region Render Form Items

    var parentID = "";

    var itemsGrouping = jQuery.parseJSON(_formOptions.ItemsGrouping);

    try {
      $.each(_formItems, function (index, formItem) {
        if (itemsGrouping) {
          parentID =
            "#form-group-body-" +
            formItem.FormGroupBoxID +
            "-" +
            formItem.ColumnIndex;
        } else {
          parentID =
            "#form-group-mbody-" +
            _formOptions.FormID +
            "-" +
            formItem.ColumnIndex;
        }

        $$FormItems[formItem.Name] = formItem;

        switch (formItem.InputType) {
          case "SelectList":
            renderSelectList(formItem, parentID, _formOptions.ActivityID);
            break;

          case "TextBox":
            renderTextBox(formItem, parentID, _formOptions.ActivityID);
            break;

          case "NumericRangeBox":
            renderNumericRangeBox(formItem, parentID);
            break;

          case "AutoTextBox":
            renderTextBox(formItem, parentID, _formOptions.ActivityID);
            break;

          case "FileBrowse":
            renderFileBrowse(formItem, parentID);
            break;

          case "CheckBox":
            renderCheckBox(formItem, parentID);
            break;

          case "RadioButtonList":
            renderRadioButtonList(formItem, parentID);
            break;

          case "TextArea":
            renderTextArea(formItem, parentID);
            break;

          case "DateBox":
            renderDateBox(formItem, parentID);
            break;

          case "DateTimeBox":
            renderDateBox(formItem, parentID);
            break;

          case "DateRangeBox":
            renderDateRangeBox(formItem, parentID);
            break;

          case "TreeSelectList":
            renderTreeSelectList(formItem, parentID);
            break;

          case "SecureBox":
            renderSecureBox(formItem, parentID);
            break;

          case "PasswordBox":
            renderPasswordBox(formItem, parentID);
            break;

          case "TextView":
            renderTextView(formItem, parentID);
            break;

          default:
            break;
        }
      });
    } catch (e) {
      raiseError(e, bodyID);

      return;
    }

    //Default Event of SelectList
    $.each(_formItems, function (index, formItem) {
      if (formItem.InputType == "SelectList" && formItem.ActionOnChange != "") {
        var defSelected = getDefaultValue(formItem);

        var match = false;

        var actionOnChange = jQuery.parseJSON(formItem.ActionOnChange);

        $.each(actionOnChange, function (index, event) {
          if (event.value.indexOf("[" + defSelected + "]") != -1) {
            match = true;

            $.each(event.actions, function (index, action) {
              if (action.targetType == "FormItem") {
                if (action.actionType == "Hide") {
                  $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                    "display",
                    "none"
                  );
                }

                if (action.actionType == "Show") {
                  $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                    "display",
                    "block"
                  );
                }

                if (action.actionType == "Reload") {
                  $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                    "display",
                    "block"
                  );
                }
              }

              if (action.targetType == "FormGroupBox") {
                if (action.actionType == "Hide") {
                  $("#form-group-" + $$FormGroups[action.target]).css(
                    "display",
                    "none"
                  );
                }

                if (action.actionType == "Show") {
                  $("#form-group-" + $$FormGroups[action.target]).css(
                    "display",
                    "block"
                  );
                }
              }
            });
          }

          if (event.value == "[0]" && !match) {
            $.each(event.actions, function (index, action) {
              if (action.targetType == "FormItem") {
                if (action.actionType == "Hide") {
                  $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                    "display",
                    "none"
                  );
                }

                if (action.actionType == "Show") {
                  $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                    "display",
                    "block"
                  );
                }
              }

              if (action.targetType == "FormGroupBox") {
                if (action.actionType == "Hide") {
                  $("#form-group-" + $$FormGroups[action.target]).css(
                    "display",
                    "none"
                  );
                }

                if (action.actionType == "Show") {
                  $("#form-group-" + $$FormGroups[action.target]).css(
                    "display",
                    "block"
                  );
                }
              }
            });
          }
        });
      }
    });

    //#endregion

    //#region Render Task Form Default Items

    if (_processStateID) {
      try {
        renderTaskProceedingsArea(taskProceedingsGbID);

        renderProcessStatingArea(ProcessStatingGbID);
      } catch (e) {
        raiseError(e, bodyID);

        return;
      }
    }

    //#endregion

    $(bodyID).append('<h5 class="message-form-success" id="smessage"></h5>');

    $(bodyID).append('<h5  class="message-form-error" id="emessage"></h5>');

    if (_formOptions.ConfirmMessage != "") {
      $("#emessage").append(_formOptions.ConfirmMessage);
    }

    $(".fileinput-remove-button").on("click", function () {
      var itemName = $(this)
        .parents()
        .filter(function () {
          return $(this).attr("data-item-name") != undefined;
        })
        .first();

      _fileExist[itemName.attr("data-item-name")] = "0";

      setTimeout("alignSideBarHeight();", 1 * 100);
    });

    $("div.input-group-addon").on("click", function () {
      if ($(this).find(">:first-child").hasClass("glyphicon-plus")) {
        $(this).find(">:first-child").removeClass("glyphicon-plus");

        $(this).find(">:first-child").addClass("glyphicon-minus");
      } else {
        if ($(this).find(">:first-child").hasClass("glyphicon-minus")) {
          $(this).find(">:first-child").removeClass("glyphicon-minus");

          $(this).find(">:first-child").addClass("glyphicon-plus");
        }
      }
    });

    $(".view-checkbox").iCheck({
      checkboxClass: "icheckbox_square-green",

      radioClass: "iradio_square-green",
    });

    //#region Render Footer

    $("#boxFooterModal" + modalID).html("");

    $("#boxFooterModal" + modalID).append(
      '<button type="button" id="btnActModal' +
        modalID +
        '" class="btn btn-form-submit" onclick="">' +
        $$Local.formSubmit +
        "</button>&nbsp;"
    );

    if (_formOptions.Label != "تنظیمات محیط کاربری") {
      //This form is forced

      if (_reportID != null) {
        $("#boxFooterModal" + modalID).append(
          '<button type="button" id="btnRstModal' +
            modalID +
            '" style="background-color:gray" class="btn btn-form-submit" >حذف جستجو</button>&nbsp;'
        );
      }

      $("#boxFooterModal" + modalID).append(
        '<button type="button" id="btnCnsModal' +
          modalID +
          '" class="btn btn-default btn-form-cancel" >' +
          $$Local.formCancel +
          "</button>&nbsp;"
      );

      $("#closeBtnModal" + modalID).css("display", "block");
    } else {
      $("#closeBtnModal" + modalID).css("display", "none");
    }

    $("#btnActModal" + modalID).unbind("click");

    $("#btnActModal" + modalID).click(function () {
      //Saba Compatibility
      //if (id == '1025152') {

      //    var cal = confirm("آیا محاسبات قیمت پشتیبانی را انجام دادید؟");

      //    if (!cal)
      //        return;
      //}

      try {
        var activiyParams = new Array();

        var activiyParam;

        var submitReady = true;

        var data = new FormData();

        //#region Validate & Append Form Data

        $.each(_formItems, function (index, formItem) {
          activiyParam = new Object();

          activiyParam.ParamIndex = index;

          activiyParam.ParamName = formItem.Name;

          activiyParam.FileIsExist = 2;

          activiyParam.FileAttachCode = "";

          var itemInputID = "#form-item-" + formItem.FormItemID;

          if (!formItem.IsReadOnly) {
            if (formItem.InputType != "CheckBox") {
              var val = $(itemInputID).val();

              if (formItem.InputType == "SelectList") {
                try {
                  if ($$AjaxSelects[itemInputID].status == 0) {
                    val = $$AjaxSelects[itemInputID].defaultValue;
                  }
                } catch (e) {}
              }

              if (jQuery.isArray(val)) {
                activiyParam.ParamValue = JSON.stringify(val);
              } else {
                if (formItem.SearchStyle == "RANGE") {
                  activiyParam.ParamValue =
                    $("#form-item-from-" + formItem.FormItemID).val() +
                    "$" +
                    $("#form-item-to-" + formItem.FormItemID).val();
                } else {
                  activiyParam.ParamValue = val;
                }
              }

              if (formItem.InputType == "SecureBox") {
                activiyParam.ParamValue = encryptInput(activiyParam.ParamValue);
              }

              if (formItem.InputType == "SignatureBox") {
                activiyParam.ParamValue = $(itemInputID).jSignature("getData");

                if (isCanvasBlank($(".jSignature"))) {
                  val = null;
                } else {
                  val = "Filled";
                }
              }

              if (formItem.InputType == "PasswordBox") {
                activiyParam.ParamValue = passwordInput(
                  activiyParam.ParamValue
                );

                var _val = $(itemInputID + "-rep").val();

                if ($.trim(val) != $.trim(_val) && $.trim(val) != "") {
                  $(itemInputID + "-rep")
                    .parents('div[class^="form-group"]')
                    .addClass("has-error");

                  submitReady = false;
                } else {
                  $(itemInputID + "-rep")
                    .parents('div[class^="form-group"]')
                    .removeClass("has-error");
                }
              }

              if (formItem.InputType == "FileBrowse") {
                activiyParam.FileIsExist = _fileExist[formItem.Name];

                activiyParam.FileAttachCode = _fileAttachCode[formItem.Name];

                var fileCaption = $("#form-group-" + formItem.FormItemID).find(
                  ".file-caption-name"
                );

                if (fileCaption.attr("title") == "خطای اعتبار سنجی") {
                  submitReady = false;
                }
              }

              var _display = $(itemInputID)
                .parents('div[class^="form-group"]')
                .css("display");

              if (
                ($.trim(val) == "" || val == null) &&
                jQuery.parseJSON(formItem.IsRequired) &&
                _display != "none"
              ) {
                if (formItem.InputType != "FileBrowse") {
                  $(itemInputID)
                    .parents('div[class^="form-group"]')
                    .addClass("has-error");

                  submitReady = false;
                } else {
                  if (_fileExist[formItem.Name] == "0") {
                    $(itemInputID)
                      .parents('div[class^="form-group"]')
                      .addClass("has-error");

                    submitReady = false;
                  }
                }
              } else {
                if (jQuery.parseJSON(formItem.IsRequired)) {
                  $(itemInputID)
                    .parents('div[class^="form-group"]')
                    .removeClass("has-error");
                }
              }

              if (
                formItem.InputType == "TextBox" ||
                formItem.InputType == "SecureBox" ||
                formItem.InputType == "PasswordBox" ||
                formItem.InputType == "AutoTextBox" ||
                formItem.InputType == "DateTimeBox"
              ) {
                if ($.trim(val) != "" && val != null) {
                  if (
                    val.length < parseInt(formItem.MinValueLenght) ||
                    val.length > parseInt(formItem.MaxValueLenght)
                  ) {
                    $(itemInputID)
                      .parents('div[class^="form-group"]')
                      .addClass("has-error");

                    submitReady = false;
                  } else {
                    $(itemInputID)
                      .parents('div[class^="form-group"]')
                      .removeClass("has-error");
                  }
                }
              }

              if (
                formItem.BaseDataType == "BIGINT" ||
                formItem.BaseDataType == "INT" ||
                formItem.BaseDataType == "MONEY"
              ) {
                if ($.trim(val) != "" && val != null) {
                  if (
                    parseInt(val) < parseInt(formItem.MinValue) ||
                    parseInt(val) > parseInt(formItem.MaxValue)
                  ) {
                    $(itemInputID)
                      .parents('div[class^="form-group"]')
                      .addClass("has-error");

                    submitReady = false;
                  } else {
                    $(itemInputID)
                      .parents('div[class^="form-group"]')
                      .removeClass("has-error");
                  }
                }
              }
            } else {
              if ($(itemInputID).is(":checked")) {
                activiyParam.ParamValue = "1";
              } else {
                activiyParam.ParamValue = "0";
              }
            }

            activiyParams[index] = activiyParam;

            if (_reportID != null) {
              $AdvancedSearch[index] = activiyParam;
            }
          }
        });

        //#endregion

        //#region Append Task Form Data

        if (_processStateID) {
          data.append("taskID", _taskID);

          data.append("processID", _prcStateOptions.ProcessID);

          var finalAction = JSON.stringify($("#process-final-action").val());

          if ($.trim(finalAction) == "" || finalAction == null) {
            $("#process-final-action")
              .parents('div[class^="form-group"]')
              .addClass("has-error");

            submitReady = false;
          } else {
            $("#process-final-action")
              .parents('div[class^="form-group"]')
              .removeClass("has-error");
          }

          if (Number(finalAction) > 100) {
            data.append("processTransaction", finalAction);

            data.append("taskStatus", 6);
          } else {
            data.append("processTransaction", 100);

            data.append("taskStatus", finalAction);
          }

          if (taskGroupID == null || !taskGroupID) {
            taskGroupID = 0;
          }

          data.append("taskGroup", taskGroupID);

          if (_prcs.TaskHasSpentTime == 0) {
            data.append("taskSpentDay", 0);

            data.append("taskSpentHour", 0);

            data.append("taskSpentMinute", 0);
          }

          if (_prcs.TaskHasSpentTime == 1 || _prcs.TaskHasSpentTime == 2) {
            data.append("taskSpentDay", $("#task-spent-day").val());

            data.append("taskSpentHour", $("#task-spent-hour").val());

            data.append("taskSpentMinute", $("#task-spent-minute").val());
          }

          if (_prcs.TaskHasSpentTime == 2) {
            if (
              $("#task-spent-day").val() == "0" ||
              $("#task-spent-hour").val() == "0" ||
              $("#task-spent-minute").val() == "0"
            ) {
              $("#task-spent-day")
                .parents('div[class^="form-group"]')
                .addClass("has-error");

              submitReady = false;
            } else {
              $("#task-spent-day")
                .parents('div[class^="form-group"]')
                .removeClass("has-error");
            }
          }

          if (_prcs.TaskHasReport == 0) {
            data.append("taskReport", "");
          }

          if (_prcs.TaskHasReport == 1 || _prcs.TaskHasReport == 2) {
            data.append("taskReport", $("#task-report").val());
          }

          if (_prcs.TaskHasReport == 2) {
            val = $("#task-report").val();

            if ($.trim(val) == "" || val == null) {
              $("#task-report")
                .parents('div[class^="form-group"]')
                .addClass("has-error");

              submitReady = false;
            } else {
              $("#task-report")
                .parents('div[class^="form-group"]')
                .removeClass("has-error");
            }
          }

          if (_prcs.TaskHasServics == 0) {
            data.append("taskServices", "");
          }

          if (_prcs.TaskHasReport == 1 || _prcs.TaskHasReport == 2) {
            data.append(
              "taskServices",
              JSON.stringify($("#task-services").val())
            );
          }

          if (_prcs.TaskHasReport == 2) {
            val = JSON.stringify($("#task-services").val());

            if ($.trim(val) == "" || val == null) {
              $("#task-services")
                .parents('div[class^="form-group"]')
                .addClass("has-error");

              submitReady = false;
            } else {
              $("#task-services")
                .parents('div[class^="form-group"]')
                .removeClass("has-error");
            }
          }

          var transacation = _prcTranscations.getListByFilter(
            "StateTransactionID",
            finalAction
          )[0];

          var taskAssignmentType = transacation.TaskAssignmentType.split("-");

          var startSLAStatus = transacation.StartSLAStatus.split("-");

          var resolveSLAStatus = transacation.ResolveSLAStatus.split("-");

          if (taskAssignmentType[0] == "UserBased") {
            if (
              taskAssignmentType[1] == "Individual" ||
              (taskAssignmentType[1] == "Collective" &&
                taskAssignmentType[2] != "User")
            ) {
              val = JSON.stringify($("#refer-group-1").val());

              data.append("referedGroup1", val);

              if ($.trim(val) == "" || val == null) {
                $("#refer-group-1")
                  .parents('div[class^="form-group"]')
                  .addClass("has-error");

                submitReady = false;
              } else {
                $("#refer-group-1")
                  .parents('div[class^="form-group"]')
                  .removeClass("has-error");
              }
            }

            if (taskAssignmentType[1] == "Individual") {
              if (taskAssignmentType[2] == "User") {
                val = JSON.stringify($("#refer-user-5").val());

                data.append("referedUser5", val);

                if ($.trim(val) == "" || val == null) {
                  $("#refer-user-5")
                    .parents('div[class^="form-group"]')
                    .addClass("has-error");

                  submitReady = false;
                } else {
                  $("#refer-user-5")
                    .parents('div[class^="form-group"]')
                    .removeClass("has-error");
                }
              } else {
                val = JSON.stringify($("#refer-user-1").val());

                data.append("referedUser1", val);

                if ($.trim(val) == "" || val == null) {
                  $("#refer-user-1")
                    .parents('div[class^="form-group"]')
                    .addClass("has-error");

                  submitReady = false;
                } else {
                  $("#refer-user-1")
                    .parents('div[class^="form-group"]')
                    .removeClass("has-error");
                }
              }
            }

            if (
              taskAssignmentType[1] == "Sequence" ||
              taskAssignmentType[1] == "Paralell"
            ) {
              val = JSON.stringify($("#refer-group-1").val());

              data.append("referedGroup1", val);

              if ($.trim(val) == "" || val == null) {
                $("#refer-group-1")
                  .parents('div[class^="form-group"]')
                  .addClass("has-error");

                submitReady = false;
              } else {
                $("#refer-group-1")
                  .parents('div[class^="form-group"]')
                  .removeClass("has-error");
              }

              val = JSON.stringify($("#refer-user-1").val());

              data.append("referedUser1", val);

              if ($.trim(val) == "" || val == null) {
                $("#refer-user-1")
                  .parents('div[class^="form-group"]')
                  .addClass("has-error");

                submitReady = false;
              } else {
                $("#refer-user-1")
                  .parents('div[class^="form-group"]')
                  .removeClass("has-error");
              }

              val = JSON.stringify($("#refer-group-2").val());

              data.append("referedGroup2", val);

              if ($.trim(val) == "" || val == null) {
                $("#refer-group-2")
                  .parents('div[class^="form-group"]')
                  .addClass("has-error");

                submitReady = false;
              } else {
                $("#refer-group-2")
                  .parents('div[class^="form-group"]')
                  .removeClass("has-error");
              }

              val = JSON.stringify($("#refer-user-2").val());

              data.append("referedUser2", val);

              if ($.trim(val) == "" || val == null) {
                $("#refer-user-2")
                  .parents('div[class^="form-group"]')
                  .addClass("has-error");

                submitReady = false;
              } else {
                $("#refer-user-2")
                  .parents('div[class^="form-group"]')
                  .removeClass("has-error");
              }

              data.append(
                "referedGroup3",
                JSON.stringify($("#refer-group-3").val())
              );

              data.append(
                "referedUser3",
                JSON.stringify($("#refer-user-3").val())
              );

              data.append(
                "referedGroup4",
                JSON.stringify($("#refer-group-4").val())
              );

              data.append(
                "referedUser4",
                JSON.stringify($("#refer-user-4").val())
              );
            }
          }

          if (
            startSLAStatus[0] == "UserBased" ||
            resolveSLAStatus[0] == "UserBased"
          ) {
            data.append("processSla", JSON.stringify($("#process-slas").val()));
          } else {
            data.append("processSla", 0);
          }

          data.append("startSlaDay", JSON.stringify($("#sla-start-day").val()));

          data.append(
            "startSlaHour",
            JSON.stringify($("#sla-start-hour").val())
          );

          data.append(
            "startSlaMinute",
            JSON.stringify($("#sla-start-minute").val())
          );

          data.append(
            "resolveSlaDay",
            JSON.stringify($("#sla-resolve-day").val())
          );

          data.append(
            "resolveSlaHour",
            JSON.stringify($("#sla-resolve-hour").val())
          );

          data.append(
            "resolveSlaMinute",
            JSON.stringify($("#sla-resolve-minute").val())
          );
        }

        //#endregion

        if (!submitReady) {
          if ($$Lang == "Fa") {
            $(bodyID + " #emessage").text(
              "*بعضی از موارد اجباری پر نشده یا مقادیر آن نامعتبر است"
            );
          } else {
            $(bodyID + " #emessage").text(
              "*Some items are not filled or has invalid values"
            );
          }

          $(bodyID + " #smessage").html("");

          return;
        } else {
          $(bodyID + " #emessage").text("");
        }

        if (_parObjKey) {
          if (
            _parObjKey != 0 &&
            (_parObjType == null || _parObjType === undefined)
          ) {
            activiyParam = new Object();

            activiyParam.ParamIndex = 0;

            activiyParam.ParamValue = _parObjKey;

            activiyParams[0] = activiyParam;
          }
        }

        var __objKeys = [];

        if (!jQuery.isArray(_objKeys)) {
          __objKeys[0] = _objKeys;
        } else {
          __objKeys = _objKeys;
        }

        if (_actContextID != null) {
          $(".wrapper").block({
            message: '<span class="message-form-block">..Processing<span>',
            baseZ: 10000,
          });
        }

        //#region Append File Form Data

        $.each(_formItems, function (index, formItem) {
          if (formItem.InputType == "FileBrowse") {
            var files = $("#form-item-" + formItem.FormItemID).get(0).files;

            if (files) {
              if (files.length > 0) {
                data.append("file" + index, files[0]);
              }
            }
          }
        });

        data.append("activiyParams", JSON.stringify(activiyParams));

        data.append("objectIDs", JSON.stringify(__objKeys));

        data.append("id", _formOptions.ActivityID);

        //#endregion

        if (_processStateID) {
          var $taExecutor = new tExecutor(
            _modalID,
            data,
            boxID,
            jQuery.parseJSON(_formOptions.ActionOnSuccess)
          );

          $taExecutor.submit();
        } else {
          if (
            _parObjType != null &&
            _parObjType !== undefined &&
            _formOptions.ActionOnSuccess.indexOf("redirectPage") == -1 &&
            _formOptions.ActionOnSuccess.indexOf("FormView") == -1 &&
            _formOptions.ActionOnSuccess.indexOf("1025951") == -1
          ) {
            //Sepad Compatibility

            _formOptions.ActionOnSuccess = '[["closeModalForm"]]';
          }

          if (_actContextID != null) {
            var $aExecutor = new aExecutor(
              _modalID,
              data,
              boxID,
              jQuery.parseJSON(_formOptions.ActionOnSuccess),
              _parContextID,
              _parObjType
            );

            $aExecutor.submit();
          }

          if (_reportID != null) {
            if (_modalID != 0) {
              $("#btnCnsModal" + _modalID).trigger("click");
            }

            $("#pageNumber").val(1);

            reloadReportData();

            $("#link-filter").css("font-weight", "bold");

            $("#link-filter").css("color", "#000000");
          }
        }
      } catch (e) {
        raiseError(e, bodyID);

        return;
      }
    });

    $("#closeBtnModal" + modalID).unbind("click");

    $("#closeBtnModal" + modalID).click(function () {
      _modalID = _modalID - 1;
    });

    $("#btnCnsModal" + modalID).unbind("click");

    $("#btnCnsModal" + modalID).click(function () {
      $("#closeBtnModal" + _modalID).trigger("click");
    });

    $("#btnRstModal" + modalID).unbind("click");

    $("#btnRstModal" + modalID).click(function () {
      if (_modalID != 0) {
        $("#btnCnsModal" + _modalID).trigger("click");
      }

      resetReport();
    });

    //#endregion
  };

  renderSelectList = function (itemObj, parentID, activityID) {
    try {
      var itemContent =
        '<div style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-check"></span></div><select ' +
        (itemObj.Visibility == "Disabled" ? "disabled" : "") +
        ' class="form-control form-input" id="form-item-' +
        itemObj.FormItemID +
        '"> </select>';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '</div><small class="text-muted">' + itemObj.Description + "</small>";
      }

      if (jQuery.parseJSON(itemObj.HasAddon)) {
        var _formAddon = new iData(
          "f0a087e3-3c5c-4ea7-a9c7-e80f19ff7726",
          itemObj.FormItemID
        );

        _formAddon = _formAddon.getObject();

        if (_formAddon.Type == "SmartSearch") {
          itemContent +=
            '<div class="input-group-addon"><span class="glyphicon glyphicon-search" onclick="renderModalGridWithContext(' +
            (parseInt(_modalID) + 1) +
            "," +
            _formAddon.LanchedContextID +
            ",0,null,'" +
            getDefaultValue(itemObj) +
            '\')" style="cursor:pointer"></span></div>';
        }

        if (_formAddon.Type == "RepeatItem") {
          itemContent +=
            '<div class="input-group-addon" onclick="' +
            _formAddon.ActionOnClick +
            ';setTimeout(\'alignSideBarHeight();\', 1 * 100);"><span class="glyphicon glyphicon-plus" style="cursor:pointer" title="' +
            _formAddon.Label +
            '"></span></div>';
        }

        if (_formAddon.Type == "CalculateItem") {
          itemContent +=
            '<div class="input-group-addon" onclick="' +
            _formAddon.ActionOnClick +
            ';"><span class="glyphicon glyphicon-retweet" style="cursor:pointer" title="' +
            _formAddon.Label +
            '"></span></div>';
        }
      } else {
        itemContent += "</div>";
      }

      $(parentID).append(itemContent);

      if (
        itemObj.Name == _parObjType ||
        itemObj.Name == "Parent_" + _parObjType
      ) {
        $("#form-item-" + itemObj.FormItemID).prop("disabled", true);
      }

      if (itemObj.Visibility == "Disabled") {
        $("#form-item-" + itemObj.FormItemID).prop("disabled", true);
      }

      if (itemObj.Visibility.indexOf("if") != -1) {
        var inlineFunction = new Function(itemObj.Visibility);

        inlineFunction();
      }

      var $selectList = new selectList(
        itemObj.ActionControlID,
        itemObj.EnumTypeID
      );

      var filterVal1 = "";

      if (itemObj.ParentName != "") {
        if (
          itemObj.ParentName == _parObjType ||
          itemObj.ParentName == "Parent_" + _parObjType
        ) {
          filterVal1 = _parObjKey;
        } else {
          if (itemObj.ParentName == "ObjectID") {
            filterVal1 = _objKeys;
          } else {
            filterVal1 = $(
              "#form-item-" + $$FormItems[itemObj.ParentName].FormItemID
            ).val();

            if (
              filterVal1 == null ||
              filterVal1 == "" ||
              filterVal1 == "0" ||
              filterVal1 === undefined
            ) {
              try {
                if (
                  $$AjaxSelects[
                    "#form-item-" + $$FormItems[itemObj.ParentName].FormItemID
                  ].status == 0
                ) {
                  filterVal1 =
                    $$AjaxSelects[
                      "#form-item-" + $$FormItems[itemObj.ParentName].FormItemID
                    ].defaultValue;
                }
              } catch (e) {}
            }
          }
        }
      }

      var filterVal2 = "";

      if (itemObj.ParentName2 != "") {
        filterVal2 = $(
          "#form-item-" + $$FormItems[itemObj.ParentName2].FormItemID
        ).val();

        if (
          filterVal2 == null ||
          filterVal2 == "" ||
          filterVal2 == "0" ||
          filterVal1 === undefined
        ) {
          try {
            if (
              $$AjaxSelects[
                "#form-item-" + $$FormItems[itemObj.ParentName2].FormItemID
              ].status == 0
            ) {
              filterVal2 =
                $$AjaxSelects[
                  "#form-item-" + $$FormItems[itemObj.ParentName2].FormItemID
                ].defaultValue;
            }
          } catch (e) {}
        }
      }

      filterVal1 = filterVal1 == "" || filterVal1 == null ? "0" : filterVal1;

      filterVal2 = filterVal2 == "" || filterVal2 == null ? "0" : filterVal2;

      value = getDefaultValue(itemObj);

      if (itemObj.Visibility == "VisibleIfValue") {
        if (value == null || value == "" || value == "0") {
          $("#form-group-" + itemObj.FormItemID).css("display", "none");
        }
      }

      $selectList.renderContext(
        "#form-item-" + itemObj.FormItemID,
        itemObj.ReferEntityMultipleAllow,
        activityID,
        jQuery.parseJSON(itemObj.IsRequired),
        itemObj.ActionOnChange,
        value,
        filterVal1,
        filterVal2,
        itemObj.Description
      );
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderTextBox = function (itemObj, parentID, activityID) {
    try {
      var placeholder = "";

      if (!jQuery.parseJSON(itemObj.IsRequired) && _reportID == null) {
        placeholder = localize("اختیاری");
      }

      var toggle = "";

      if (itemObj.UnitToDisplay == "ریال") {
        itemObj.UnitToDisplay = $$Currency;
      }

      var itemContent =
        toggle +
        '<div style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        (itemObj.UnitToDisplay != ""
          ? " (" + itemObj.UnitToDisplay + ") "
          : "") +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-edit"></span></div><input type="text" title="' +
        (_reportID == null ? itemObj.Name : "") +
        '" class="form-control form-input" id="form-item-' +
        itemObj.FormItemID +
        '" placeholder="' +
        placeholder +
        '">';

      if (jQuery.parseJSON(itemObj.HasAddon)) {
        var _formAddon = new iData(
          "f0a087e3-3c5c-4ea7-a9c7-e80f19ff7726",
          itemObj.FormItemID
        );

        _formAddon = _formAddon.getObject();

        if (_formAddon.Type == "SmartSearch") {
          itemContent +=
            '<div class="input-group-addon"><span class="glyphicon glyphicon-search" onclick="renderModalGridWithContext(' +
            (parseInt(_modalID) + 1) +
            "," +
            _formAddon.LanchedContextID +
            ",0,null,'" +
            getDefaultValue(itemObj) +
            '\')" style="cursor:pointer"></span></div>';
        }

        if (_formAddon.Type == "RepeatItem") {
          itemContent +=
            '<div class="input-group-addon" onclick="' +
            _formAddon.ActionOnClick +
            ';setTimeout(\'alignSideBarHeight();\', 1 * 100);"><span class="glyphicon glyphicon-plus" style="cursor:pointer" title="' +
            _formAddon.Label +
            '"></span></div>';
        }

        if (_formAddon.Type == "CalculateItem") {
          itemContent +=
            '<div class="input-group-addon" onclick="' +
            _formAddon.ActionOnClick +
            ';"><span class="glyphicon glyphicon-retweet" style="cursor:pointer" title="' +
            _formAddon.Label +
            '"></span></div>';
        }
      } else {
        itemContent += toggle + "</div>";
      }

      if (
        itemObj.SubTextVisible ||
        (itemObj.Description != "" && itemObj.Description != null)
      ) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      var itemInputID = "#form-item-" + itemObj.FormItemID;

      $(parentID).append(itemContent);

      if (
        $.parseJSON(_isDefault.toLowerCase()) &&
        (itemObj.Name == "Label" || itemObj.Name == "ChangeLabel")
      ) {
        $(itemInputID).prop("disabled", true);
      }

      if (itemObj.AttributeTypeName == "LocalString" && $$Lang != "Fa") {
        itemObj.RegexFormat = "";
      }

      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        if (
          itemObj.RegexFormat != "" &&
          itemObj.MaskAlias == "" &&
          itemObj.MaskFormat == ""
        ) {
          $(itemInputID).attr("data-inputmask-regex", itemObj.RegexFormat);

          $(itemInputID).inputmask("Regex");
        }

        if (itemObj.MaskAlias != "") {
          $(itemInputID).attr(
            "data-inputmask",
            '"alias": "' + itemObj.MaskAlias + '"'
          );

          $(itemInputID).inputmask();
        }

        if (itemObj.MaskFormat != "") {
          $(itemInputID).attr(
            "data-inputmask",
            '"mask": "' + itemObj.MaskFormat + '"'
          );

          $(itemInputID).inputmask();
        }
      }

      if (itemObj.Direction == "rtl" && $$Dir == "RTL") {
        $(itemInputID).attr("dir", "rtl");

        $(itemInputID).attr("data-inputmask", "'type':'reverse'");

        $(itemInputID).css("text-align", "right");
      } else {
        $(itemInputID).attr("dir", "ltr");

        $(itemInputID).css("text-align", "left");
      }

      if (itemObj.MaxValueLenght != "") {
        $(itemInputID).attr("maxlength", itemObj.MaxValueLenght);
      }

      if (jQuery.parseJSON(itemObj.IsReadOnly)) {
        $(itemInputID).attr("readonly", "readonly");
      }

      if (itemObj.Width != "") {
        $(itemInputID).css("width", itemObj.Width);
      }

      if (itemObj.InputType == "AutoTextBox") {
        var filterVal1 = "";

        if (itemObj.ParentName != "") {
          if (
            itemObj.ParentName == _parObjType ||
            itemObj.ParentName == "Parent_" + _parObjType
          ) {
            filterVal1 = _parObjKey;
          } else {
            filterVal1 = $(
              "#form-item-" + $$FormItems[itemObj.ParentName].FormItemID
            ).val();

            if (
              filterVal1 == null ||
              filterVal1 == "" ||
              filterVal1 == "0" ||
              filterVal1 === undefined
            ) {
              try {
                if (
                  $$AjaxSelects[
                    "#form-item-" + $$FormItems[itemObj.ParentName].FormItemID
                  ].status == 0
                ) {
                  filterVal1 =
                    $$AjaxSelects[
                      "#form-item-" + $$FormItems[itemObj.ParentName].FormItemID
                    ].defaultValue;
                }
              } catch (e) {}
            }
          }
        }

        filterVal1 = filterVal1 == "" || filterVal1 == null ? "0" : filterVal1;

        var $autoComplete = new autoComplete(
          itemObj.EntityAttributeID,
          itemObj.ActionControlID
        );

        $autoComplete.renderContext(
          "#form-item-" + itemObj.FormItemID,
          activityID,
          filterVal1,
          itemObj.ParentName
        );
      }

      $(itemInputID).val(getDefaultValue(itemObj));

      if (itemObj.ActionOnChange != "") {
        $(itemInputID).change(function () {
          var inlineFunction = new Function(
            $$FormItems[this.title].ActionOnChange
          );

          inlineFunction();
        });
      }

      if (itemObj.Visibility == "Disabled") {
        $(itemInputID).prop("disabled", true);
        $(itemInputID).addClass("form-input-dis");
        $(itemInputID).removeClass("form-input");
      }
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderNumericRangeBox = function (itemObj, parentID) {
    try {
      var itemContent =
        '<div style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-edit"></span></div><input type="text" class="form-control form-input" style="width:50%;margin:0px 0px 0px 0%" id="form-item-from-' +
        itemObj.FormItemID +
        '" placeholder="از"><input type="text" class="form-control form-input" style="width:50%" id="form-item-to-' +
        itemObj.FormItemID +
        '" placeholder="تا" ></div>';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      var itemInputID = "#form-item-from-" + itemObj.FormItemID;

      var itemInputID2 = "#form-item-to-" + itemObj.FormItemID;

      $(parentID).append(itemContent);

      if (itemObj.RegexFormat != "") {
        $(itemInputID).attr("data-inputmask-regex", itemObj.RegexFormat);

        $(itemInputID).inputmask("Regex");

        $(itemInputID2).attr("data-inputmask-regex", itemObj.RegexFormat);

        $(itemInputID2).inputmask("Regex");
      }

      $(itemInputID).attr("dir", "ltr");

      $(itemInputID).css("text-align", "left");

      $(itemInputID2).attr("dir", "ltr");

      $(itemInputID2).css("text-align", "left");

      if (itemObj.MaxValueLenght != "") {
        $(itemInputID).attr("maxlength", itemObj.MaxValueLenght);

        $(itemInputID2).attr("maxlength", itemObj.MaxValueLenght);
      }
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderFileBrowse = function (itemObj, parentID) {
    try {
      itemObj.DefaultValue = getDefaultValue(itemObj);

      var index = itemObj.DefaultValue.indexOf("data-file-attach-code");

      if (index > -1) {
        _fileExist[itemObj.Name] = "1";

        var index2 = itemObj.DefaultValue.indexOf("' title");

        _fileAttachCode[itemObj.Name] = itemObj.DefaultValue.substring(
          23 + index,
          index2
        );

        itemObj.DefaultValue =
          '<img src="App_Res/' +
          itemObj.LocationPath.replace("../../App_Res/", "") +
          _fileAttachCode[itemObj.Name] +
          '"/>';
      }

      if (itemObj.DefaultValue == "") {
        _fileExist[itemObj.Name] = "0";

        _fileAttachCode[itemObj.Name] = "";

        itemObj.DefaultValue = null;
      }

      var placeholder = "";

      if (!jQuery.parseJSON(itemObj.IsRequired)) {
        placeholder =
          "<span class='form-input-placeholder'>" +
          localize("اختیاری") +
          "</span>";
      }

      var itemContent =
        '<div style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '" data-item-name="' +
        itemObj.Name +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div><input type="file"  class="form-control form-input file"  data-show-upload="false" id="form-item-' +
        itemObj.FormItemID +
        '"></div>';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      if (itemObj.AttributeTypeName == "Image") {
        var maxSize = itemObj.MaxValue.split("*");

        var minSize = itemObj.MinValue.split("*");

        $("#form-item-" + itemObj.FormItemID).fileinput({
          maxImageWidth: maxSize[0],
          maxImageHeight: maxSize[1],
          minImageWidth: minSize[0],
          minImageHeight: minSize[1],
          allowedFileExtensions: jQuery.parseJSON(itemObj.RegexFormat),
          allowedFileTypes: ["image"],
          showPreview: true,
          maxFileSize: itemObj.MaxValueLenght,
          initialPreview: [itemObj.DefaultValue],
        });
      } else {
        $("#form-item-" + itemObj.FormItemID).fileinput({
          allowedFileExtensions: jQuery.parseJSON(itemObj.RegexFormat),
          maxFileSize: itemObj.MaxValueLenght,
        });
      }

      if (itemObj.DefaultValue == null) {
        $("#form-group-" + itemObj.FormItemID + " .file-caption-name").html(
          placeholder
        );
      }

      if (itemObj.Width != "") {
        $("#form-item-" + itemObj.FormItemID).css("width", itemObj.Width);
      }

      $("#form-item-" + itemObj.FormItemID).on(
        "fileimageloaded",
        function (event, previewId) {
          setTimeout("alignSideBarHeight();", 1 * 100);
        }
      );

      $("#form-item-" + itemObj.FormItemID).on(
        "fileloaded",
        function (event, previewId) {
          setTimeout("alignSideBarHeight();", 1 * 100);
        }
      );

      $("#form-item-" + itemObj.FormItemID).on(
        "fileerror",
        function (event, previewId) {
          setTimeout("alignSideBarHeight();", 1 * 100);
        }
      );
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderCheckBox = function (itemObj, parentID) {
    try {
      var itemContent =
        '<div class="form-group" style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" id="form-group-' +
        itemObj.FormItemID +
        '"><div class="checkbox"><label for="form-item-' +
        itemObj.FormItemID +
        '" class="input-checkbox-label"> <input type="checkbox" title="' +
        itemObj.Name +
        '" id="form-item-' +
        itemObj.FormItemID +
        '"/>&nbsp;' +
        itemObj.Label +
        "</label></div>";

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      if (getDefaultValue(itemObj) == "True") {
        $("#form-item-" + itemObj.FormItemID).attr("checked", "checked");
      }

      if (itemObj.Visibility == "Disabled") {
        $("#form-item-" + itemObj.FormItemID).attr("disabled", "disabled");
      }

      $("#form-item-" + itemObj.FormItemID)
        .iCheck({
          checkboxClass: "icheckbox_square-green",

          radioClass: "iradio_square-green",
        })
        .on("ifChanged", function (e) {
          var isChecked = e.currentTarget.checked;

          if ($$FormItems[e.currentTarget.title] === undefined) {
            return;
          }

          if ($$FormItems[e.currentTarget.title].ActionOnChange == "") {
            return;
          }

          $.each(
            jQuery.parseJSON($$FormItems[e.currentTarget.title].ActionOnChange),
            function (index, event) {
              if (event.value.indexOf("[" + isChecked + "]") != -1) {
                $.each(event.actions, function (index, action) {
                  if (action.targetType == "FormItem") {
                    if (action.actionType == "Hide") {
                      $(
                        "#form-group-" + $$FormItems[action.target].FormItemID
                      ).css("display", "none");
                    }

                    if (action.actionType == "Show") {
                      $(
                        "#form-group-" + $$FormItems[action.target].FormItemID
                      ).css("display", "block");
                    }

                    if (action.actionType == "ChangeValue") {
                      var inlineFunction = new Function(action.actionCallback);

                      inlineFunction();
                    }
                  }

                  if (action.targetType == "FormGroupBox") {
                    if (action.actionType == "Hide") {
                      $("#form-group-" + $$FormGroups[action.target]).css(
                        "display",
                        "none"
                      );
                    }

                    if (action.actionType == "Show") {
                      $("#form-group-" + $$FormGroups[action.target]).css(
                        "display",
                        "block"
                      );
                    }
                  }
                });
              }
            }
          );
        });

      if (itemObj.ActionOnChange != "") {
        setTimeout(
          "triggerDefaultEvent('" +
            itemObj.Name +
            "','" +
            getDefaultValue(itemObj).toLowerCase() +
            "')",
          500
        );
      }
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderRadioButtonList = function (itemObj, parentID) {
    try {
      var itemContent =
        '<div class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '"><label>' +
        itemObj.Label +
        "</label><div>";

      var $radioButtonList = new radioButtonList(itemObj.EnumTypeID);

      itemContent += $radioButtonList.renderContext(
        itemObj.FormItemID,
        itemObj.DefaultValue
      );

      itemContent +=
        '</div><input type="text" id="form-item-' +
        itemObj.FormItemID +
        '" value="' +
        itemObj.DefaultValue +
        '">';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      $(
        "input[type=radio][name=optionsRadios-" + itemObj.FormItemID + "]"
      ).change(function () {
        if ($(this).is(":checked")) {
          $("#form-item-" + itemObj.FormItemID).val(this.value);
        }
      });

      $(
        "input[type=radio][name=optionsRadios-" + itemObj.FormItemID + "]"
      ).iCheck({
        checkboxClass: "icheckbox_square-green",

        radioClass: "iradio_square-green",

        increaseArea: "20%", // optional
      });
    } catch (e) {
      itemContent += "</div></div>";

      $(parentID).append(itemContent);

      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderDateBox = function (itemObj, parentID) {
    try {
      var placeholder = "";

      if (!jQuery.parseJSON(itemObj.IsRequired)) {
        placeholder = localize("اختیاری");
      }

      var itemContent =
        '<div style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div class="input-group"><div id="picker-' +
        itemObj.FormItemID +
        '" data-mdpersiandatetimepickershowing="false" title="" data-original-title="" data-mdpersiandatetimepickerselecteddatetime="{&quot;Year&quot;:1393,&quot;Month&quot;:10,&quot;Day&quot;:9,&quot;Hour&quot;:0,&quot;Minute&quot;:0,&quot;Second&quot;:0}" data-mdpersiandatetimepicker="" style="cursor: pointer;" class="input-group-addon" data-mddatetimepicker="true" data-targetselector="#form-item-' +
        itemObj.FormItemID +
        '" data-trigger="click"  data-placement="top" data-englishnumber="true" ><span class="glyphicon glyphicon-calendar"></span></div><input type="text" class="form-control form-input" id="form-item-' +
        itemObj.FormItemID +
        '" placeholder="' +
        placeholder +
        '" data-mdpersiandatetimepickershowing="false" title="" data-original-title="" data-mdpersiandatetimepickerselecteddatetime="{&quot;Year&quot;:1393,&quot;Month&quot;:10,&quot;Day&quot;:9,&quot;Hour&quot;:0,&quot;Minute&quot;:0,&quot;Second&quot;:0}" data-mdpersiandatetimepicker="" data-mddatetimepicker="true" data-targetselector="#form-item-' +
        itemObj.FormItemID +
        '" data-trigger="click"  data-placement="top" data-englishnumber="true" dir="ltr"></div>';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      var pickerID = "#picker-" + itemObj.FormItemID;

      var itemInputID = "#form-item-" + itemObj.FormItemID;

      if (itemObj.Width != "") {
        $(itemInputID).css("width", itemObj.Width);
      }

      $(itemInputID).css("text-align", "left");

      if (itemObj.InputType == "DateTimeBox") {
        $(pickerID).attr("data-enabletimepicker", "true");

        $(itemInputID).attr("data-enabletimepicker", "true");

        $(itemInputID).attr("data-inputmask", '"mask": "x/m/d h:s"');

        $(itemInputID).inputmask();
      } else {
        $(itemInputID).attr("data-inputmask", '"alias": "shamsi"');

        $(itemInputID).inputmask();
      }

      EnableMdDateTimePickers();

      $(itemInputID).val(getDefaultValue(itemObj));
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderDateRangeBox = function (itemObj, parentID) {
    try {
      var placeholder = "";

      if (!jQuery.parseJSON(itemObj.IsRequired)) {
        placeholder = localize("اختیاری");
      }

      var itemContent =
        '<div class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        "</label>";

      itemContent +=
        '<div class="input-group"><div id="picker-' +
        itemObj.FormItemID +
        '" data-mdpersiandatetimepickershowing="false" title="" data-original-title="" data-mdpersiandatetimepickerselecteddatetime="{&quot;Year&quot;:1393,&quot;Month&quot;:10,&quot;Day&quot;:9,&quot;Hour&quot;:0,&quot;Minute&quot;:0,&quot;Second&quot;:0}" data-mdpersiandatetimepicker="" style="cursor: pointer;" class="input-group-addon" data-mddatetimepicker="true" data-targetselector="#form-item-from-' +
        itemObj.FormItemID +
        '" data-trigger="click"  data-placement="top" data-englishnumber="true"  ><span class="glyphicon glyphicon-calendar"></span></div><input type="text" class="form-control form-input" id="form-item-from-' +
        itemObj.FormItemID +
        '" placeholder="از" dir="ltr" data-mdpersiandatetimepickershowing="false" title="" data-original-title="" data-mdpersiandatetimepickerselecteddatetime="{&quot;Year&quot;:1393,&quot;Month&quot;:10,&quot;Day&quot;:9,&quot;Hour&quot;:0,&quot;Minute&quot;:0,&quot;Second&quot;:0}" data-mdpersiandatetimepicker="" data-mddatetimepicker="true" data-targetselector="#form-item-from-' +
        itemObj.FormItemID +
        '" data-trigger="click"  data-placement="top"  data-englishnumber="true">';

      itemContent +=
        '<div id="picker-' +
        itemObj.FormItemID +
        '" data-mdpersiandatetimepickershowing="false" title="" data-original-title="" data-mdpersiandatetimepickerselecteddatetime="{&quot;Year&quot;:1393,&quot;Month&quot;:10,&quot;Day&quot;:9,&quot;Hour&quot;:0,&quot;Minute&quot;:0,&quot;Second&quot;:0}" data-mdpersiandatetimepicker="" style="cursor: pointer;" class="input-group-addon" data-mddatetimepicker="true" data-targetselector="#form-item-to-' +
        itemObj.FormItemID +
        '" data-trigger="click"  data-placement="top" data-englishnumber="true" ><span class="glyphicon glyphicon-calendar"></span></div><input type="text" class="form-control form-input" id="form-item-to-' +
        itemObj.FormItemID +
        '" placeholder="تا" dir="ltr"  data-mdpersiandatetimepickershowing="false" title="" data-original-title="" data-mdpersiandatetimepickerselecteddatetime="{&quot;Year&quot;:1393,&quot;Month&quot;:10,&quot;Day&quot;:9,&quot;Hour&quot;:0,&quot;Minute&quot;:0,&quot;Second&quot;:0}" data-mdpersiandatetimepicker="" data-mddatetimepicker="true" data-targetselector="#form-item-to-' +
        itemObj.FormItemID +
        '" data-trigger="click"  data-placement="top" data-englishnumber="true"></div>';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      var itemInputID = "#form-item-from-" + itemObj.FormItemID;

      var itemInputID2 = "#form-item-to-" + itemObj.FormItemID;

      $(itemInputID).css("text-align", "left");

      $(itemInputID).attr("data-inputmask", '"alias": "shamsi"');

      $(itemInputID).inputmask();

      $(itemInputID2).css("text-align", "left");

      $(itemInputID2).attr("data-inputmask", '"alias": "shamsi"');

      $(itemInputID2).inputmask();

      EnableMdDateTimePickers();
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  //Not implemented
  renderTreeSelectList = function (itemObj, parentID) {
    try {
      var itemContent =
        '<div class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-share"></span></div><select class="form-control form-input" id="form-item-' +
        itemObj.FormItemID +
        '"> </select></div>';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderSecureBox = function (itemObj, parentID) {
    try {
      var placeholder = "";

      if (!jQuery.parseJSON(itemObj.IsRequired)) {
        placeholder = localize("اختیاری");
      }

      var itemContent =
        '<div class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div><input type="password" class="form-control form-input" id="form-item-' +
        itemObj.FormItemID +
        '" placeholder="' +
        placeholder +
        '"></div>';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      var itemInputID = "#form-item-" + itemObj.FormItemID;

      if (itemObj.Width != "") {
        $(itemInputID).css("width", itemObj.Width);
      }

      $(itemInputID).attr("dir", "ltr");

      $(itemInputID).css("text-align", "left");

      $(itemInputID).val("xxxxxxxxxxxxxxxxxxxxxxxxxx");
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderPasswordBox = function (itemObj, parentID) {
    try {
      var placeholder = "";

      if (!jQuery.parseJSON(itemObj.IsRequired)) {
        placeholder = localize("اختیاری");
      }

      var itemContent =
        '<div class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div><input type="password" class="form-control form-input" id="form-item-' +
        itemObj.FormItemID +
        '" placeholder="' +
        placeholder +
        '"></div></div>';

      itemContent +=
        '<div class="form-group"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        localize("تکرار ") +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div><input type="password" class="form-control form-input" id="form-item-' +
        itemObj.FormItemID +
        '-rep" placeholder="' +
        placeholder +
        '"></div>';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      var itemInputID = "#form-item-" + itemObj.FormItemID;

      if (itemObj.Width != "") {
        $(itemInputID).css("width", itemObj.Width);

        $(itemInputID + "-rep").css("width", itemObj.Width);
      }

      $(itemInputID).attr("dir", "ltr");

      $(itemInputID).css("text-align", "left");

      $(itemInputID).val("");

      $(itemInputID + "-rep").attr("dir", "ltr");

      $(itemInputID + "-rep").css("text-align", "left");

      $(itemInputID + "-rep").val("");
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderTextView = function (itemObj, parentID) {
    try {
      var value = getDefaultValue(itemObj);

      if (itemObj.Visibility == "VisibleIfValue") {
        if (value == null || value == "") {
          return;
        }
      }

      if (itemObj.AttributeTypeName == "Boolean") {
        if (value == "True") {
          value =
            '<input class="view-checkbox" type="checkbox" checked disabled/>';
        } else {
          value = '<input class="view-checkbox" type="checkbox" disabled/>';
        }
      }

      var itemContent =
        '<div class="form-group" id="form-group-' +
        itemObj.FormItemID +
        '">' +
        (itemObj.AttributeTypeName == "Boolean" ? value : "") +
        '&nbsp;<label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        "&nbsp;" +
        (itemObj.AttributeTypeName == "Boolean" ? "" : ":") +
        '&nbsp;</label><span class="form-text-view" id="form-item-' +
        itemObj.FormItemID +
        '"></span>';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      if (itemObj.Width != "") {
        $("#form-item-" + itemObj.FormItemID).css("width", itemObj.Width);
      }

      if (_objKeys.length > 1) {
        $("#form-item-" + itemObj.FormItemID).html(
          _objKeys.length + localize("مورد ")
        );
      }

      if (itemObj.AttributeTypeName != "Boolean") {
        if (_objKeys.length == 1) {
          $("#form-item-" + itemObj.FormItemID).html(value);
        }
      }
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderTaskProceedingsArea = function (parentID) {
    if (!_prcStateOptions.StateHasTask) {
      return;
    }

    if (_prcStateOptions.TaskHasServics > 0) {
      $(parentID).append(
        '<div class="form-group">' +
          '<label>خدمات انجام شده</label><div class="input-group">' +
          '<div class="input-group-addon"><span class="glyphicon glyphicon-check"></span></div>' +
          '<select class="form-control form-input" id="task-services"></select></div>' +
          "</div>"
      );
    }

    if (_prcStateOptions.TaskHasReport > 0) {
      $(parentID).append(
        '<div class="form-group">' +
          '<label>توضیحات</label><div class="input-group">' +
          '<div class="input-group-addon"><span class="glyphicon glyphicon-edit"></span></div>' +
          '<textarea class="form-control form-input" id="task-report" rows="5"></textarea></div>' +
          "</div>"
      );
    }

    if (_prcStateOptions.TaskHasSpentTime > 0) {
      $(parentID).append(
        '<div class="form-group"><label>زمان صرف شده</label>' +
          '<div class="row">' +
          '<div class="col-md-2" class="form-time-label">' +
          '<select class="form-control form-input" id="task-spent-day"></select></div>' +
          '<div class="col-md-1" class="form-time-box">&nbsp;&nbsp; روز </div>' +
          '<div class="col-md-2" class="form-time-label">' +
          '<select class="form-control form-input" id="task-spent-hour"></select></div>' +
          '<div class="col-md-2" class="form-time-box">&nbsp;&nbsp; ساعت </div>' +
          '<div class="col-md-2" class="form-time-label">' +
          '<select class="form-control form-input" id="task-spent-minute"></select></div>' +
          '<div class="col-md-1"  class="form-time-box">&nbsp;&nbsp; دقیقه </div>' +
          "</div></div>"
      );

      for (i = 0; i < 8; i++) {
        $("#task-spent-day").append(
          $("<option></option>").attr("value", i).text(i)
        );

        $("#task-spent-hour").append(
          $("<option></option>").attr("value", i).text(i)
        );
      }

      for (i = 0; i < 12; i++) {
        $("#task-spent-minute").append(
          $("<option></option>")
            .attr("value", i * 5)
            .text(i * 5)
        );
      }
    }

    $(parentID).append(
      '<div class="form-group"><label>سایر فرم ها</label><div class="row" id="row-links"></div></div>'
    );

    $.each(_prcStateActLinks, function (index, actLink) {
      $("#row-links").append(
        '<div class="col-md-3"><a class="form-link" data-context-id=' +
          actLink.ActivityContextID +
          ' id="act-link-' +
          actLink.ActivityContextID +
          '"><span class="fa ' +
          actLink.Icon +
          '"></span>&nbsp;' +
          actLink.Label +
          "</a></div>"
      );

      $("#act-link-" + actLink.ActivityContextID).click(function () {});
    });
  };

  renderProcessStatingArea = function (parentID) {
    if (_prcStateOptions.IsStartState && _prcTranscations.getLength() == 1) {
      return;
    }

    $(parentID).append(
      '<div class="form-group"><label>وضعیت جدید</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-check"></span></div><select id="process-final-actions" class="form-control form-input"></select></div></div>'
    );

    var content = '<div class="form-group">';

    content +=
      '<div class="row" id="refer-area-1"><div class="col-md-1" class="form-taskrefer-setp">&nbsp;گام 1&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-1" id="taskrefer-label-group-1" class="form-taskrefer-label">تیم&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-group-1" class="form-taskrefer-box">' +
      '<select class="form-control form-input" id="refer-group-1"></select></div>' +
      '<div class="col-md-2" id="taskrefer-label-user-1" class="form-taskrefer-label">&nbsp;&nbsp;کارشناس&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-user-1" class="form-taskrefer-box">' +
      '<select class="form-control form-input" id="refer-user-1"></select></div>' +
      "<br /> " +
      "</div>";

    content +=
      '<div class="row" id="refer-area-2"><div class="col-md-2" class="form-taskrefer-setp">&nbsp;گام 2&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" id="taskrefer-label-group-2" class="form-taskrefer-label">تیم&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-group-2" class="form-taskrefer-box">' +
      '<select class="form-control form-input" id="refer-group-2"></select></div>' +
      '<div class="col-md-2" id="taskrefer-label-user-2" class="form-taskrefer-label">&nbsp;&nbsp;کارشناس&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-user-2" class="form-taskrefer-box">' +
      '<select class="form-control form-input" id="refer-user-2"></select></div>' +
      "<br /> " +
      "</div>";

    content +=
      '<div class="row" id="refer-area-3"><div class="col-md-3" class="form-taskrefer-setp">&nbsp;گام 3&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" id="taskrefer-label-group-3" class="form-taskrefer-label">تیم&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-group-3" class="form-taskrefer-box">' +
      '<select class="form-control form-input" id="refer-group-3"></select></div>' +
      '<div class="col-md-2" id="taskrefer-label-user-3" class="form-taskrefer-label">&nbsp;&nbsp;کارشناس&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-user-3" class="form-taskrefer-box">' +
      '<select class="form-control form-input" id="refer-user-3"></select></div>' +
      "<br /> " +
      "</div>";

    content +=
      '<div class="row" id="refer-area-4"><div class="col-md-4" class="form-taskrefer-setp">&nbsp;گام 4&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" id="taskrefer-label-group-4" class="form-taskrefer-label">تیم&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-group-4" class="form-taskrefer-box">' +
      '<select class="form-control form-input" id="refer-group-4"></select></div>' +
      '<div class="col-md-2" id="taskrefer-label-user-4" class="form-taskrefer-label">&nbsp;&nbsp;کارشناس&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-user-4" class="form-taskrefer-box">' +
      '<select class="form-control form-input" id="refer-user-4"></select></div>' +
      "<br /> " +
      "</div>";

    content +=
      '<div class="row" id="refer-area-5"><div class="col-md-5" class="form-taskrefer-setp">&nbsp;ارجاع گیرنده&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" id="taskrefer-label-user-5" class="form-taskrefer-label">&nbsp;&nbsp;کاربر&nbsp;&nbsp;</div>' +
      '<div class="col-md-5" id="taskrefer-box-user-5" class="form-taskrefer-box">' +
      '<select class="form-control form-input" id="refer-user-5"></select></div>' +
      "<br /> " +
      "</div>";

    content += "</div>";

    $(parentID).append(content);

    $(parentID).append(
      '<div class="form-group" id="sla-type-area"><label>تعیین SLA</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-check"></span></div><select id="process-slas" class="form-control form-input"></select></div></div>'
    );

    content = '<div class="form-group">';

    content +=
      '<div class="row" id="sla-area-1"><div class="col-md-2" class="form-sla-setp">&nbsp;مهلت مراجعه&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input" id="sla-start-day"></select></div>' +
      '<div class="col-md-1" class="form-time-box">&nbsp;&nbsp; روز </div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input" id="sla-start-hour"></select></div>' +
      '<div class="col-md-2" class="form-time-box">&nbsp;&nbsp; ساعت </div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input" id="sla-start-minute"></select></div>' +
      '<div class="col-md-1"  class="form-time-box">&nbsp;&nbsp; دقیقه </div>' +
      "</div><br />";

    content +=
      '<div class="row" id="sla-area-2"><div class="col-md-2" class="form-sla-setp">&nbsp;مهلت انجام&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input" id="sla-resolve-day"></select></div>' +
      '<div class="col-md-1" class="form-time-box">&nbsp;&nbsp; روز </div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input" id="sla-resolve-hour"></select></div>' +
      '<div class="col-md-2" class="form-time-box">&nbsp;&nbsp; ساعت </div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input" id="sla-resolve-minute"></select></div>' +
      '<div class="col-md-1"  class="form-time-box">&nbsp;&nbsp; دقیقه </div>' +
      "</div>";

    content += "</div>";

    $(parentID).append(content);

    for (i = 0; i < 8; i++) {
      $("#sla-start-day").append(
        $("<option></option>").attr("value", i).text(i)
      );

      $("#sla-start-hour").append(
        $("<option></option>").attr("value", i).text(i)
      );

      $("#sla-resolve-day").append(
        $("<option></option>").attr("value", i).text(i)
      );

      $("#sla-resolve-hour").append(
        $("<option></option>").attr("value", i).text(i)
      );
    }

    for (i = 0; i < 12; i++) {
      $("#sla-start-minute").append(
        $("<option></option>")
          .attr("value", i * 5)
          .text(i * 5)
      );

      $("#sla-resolve-minute").append(
        $("<option></option>")
          .attr("value", i * 5)
          .text(i * 5)
      );
    }

    if (!_prcStateOptions.IsStartState) {
      $.each(_prcTaskStatuses, function (index, taskStatus) {
        $("#process-final-actions").append(
          $("<option></option>")
            .attr("value", taskStatus.TaskStatusID)
            .text(taskStatus.Label)
        );
      });
    }

    $.each(_prcTranscations.getList(), function (index, transacation) {
      $("#process-final-actions").append(
        $("<option></option>")
          .attr("value", transacation.StateTransactionID)
          .text(transacation.Label)
      );
    });

    $("#process-final-actions").change(function () {
      if (this.value < 100) {
        return; //action is a internal task status
      }

      var transacation = _prcTranscations.getListByFilter(
        "StateTransactionID",
        this.value
      )[0];

      var taskAssignmentType = transacation.TaskAssignmentType.split("-");

      var startSLAStatus = transacation.StartSLAStatus.split("-");

      var resolveSLAStatus = transacation.ResolveSLAStatus.split("-");

      if (taskAssignmentType[0] == "UserBased") {
        if (
          taskAssignmentType[1] == "Individual" ||
          taskAssignmentType[1] == "Collective"
        ) {
          if (
            taskAssignmentType[2] == "ToGroupedUser" ||
            taskAssignmentType[2] == "ToSelfgroupUser" ||
            taskAssignmentType[2] == "ToGroup"
          ) {
            $("#refer-area-1").show();

            $("#refer-area-2").hide();

            $("#refer-area-3").hide();

            $("#refer-area-4").hide();

            $("#refer-area-5").hide();
          }

          if (taskAssignmentType[2] == "User") {
            $("#refer-area-1").hide();

            $("#refer-area-2").hide();

            $("#refer-area-3").hide();

            $("#refer-area-4").hide();

            $("#refer-area-5").show();

            var $selectList = new selectList(4, null);

            $selectList.renderContext(
              "#refer-user-5",
              false,
              _formOptions.ActivityID,
              true,
              ""
            );
          }
        }

        if (taskAssignmentType[1] == "Collective") {
          if (taskAssignmentType[2] == "ToGroup") {
            $("#taskrefer-label-group-1").show();

            $("#taskrefer-box-group-1").show();

            $("#taskrefer-label-user-1").hide();

            $("#taskrefer-box-user-1").hide();

            if ($("#refer-group-1").children("option").length == 0) {
              var $selectList = new selectList(1, null);

              $selectList.renderContext(
                "#refer-group-1",
                false,
                _formOptions.ActivityID,
                true,
                "",
                "ToGroupedUser"
              );
            }
          }
        }

        if (taskAssignmentType[1] == "Individual") {
          if (
            taskAssignmentType[2] == "ToGroupedUser" ||
            taskAssignmentType[2] == "ToSelfgroupUser"
          ) {
            $("#taskrefer-label-group-1").show();

            $("#taskrefer-box-group-1").show();

            $("#taskrefer-label-user-1").show();

            $("#taskrefer-box-user-1").show();
          }

          if (taskAssignmentType[2] == "ToGroupedUser") {
            var $selectList = new selectList(1, null);

            $selectList.renderContext(
              "#refer-group-1",
              false,
              _formOptions.ActivityID,
              true,
              "",
              "ToGroupedUser"
            );
          }

          if (taskAssignmentType[2] == "ToSelfgroupUser") {
            var $selectList = new selectList(1, null);

            $selectList.renderContext(
              "#refer-group-1",
              false,
              _formOptions.ActivityID,
              true,
              "",
              "ToSelfgroupUser"
            );
          }
        }

        if (
          taskAssignmentType[1] == "Sequence" ||
          taskAssignmentType[1] == "Paralell"
        ) {
          if (
            taskAssignmentType[2] == "ToGroupedUser" ||
            taskAssignmentType[2] == "ToSelfgroupUser"
          ) {
            $("#refer-area-1").show();

            $("#refer-area-2").show();

            $("#refer-area-3").show();

            $("#refer-area-4").show();

            $("#refer-area-5").hide();
          }

          if (taskAssignmentType[2] == "ToGroupedUser") {
            var $selectList = new selectList(1, null);

            $selectList.renderContext(
              "#refer-group-1",
              false,
              _formOptions.ActivityID,
              true,
              "",
              "ToGroupedUser"
            );

            $selectList.renderContext(
              "#refer-group-2",
              false,
              _formOptions.ActivityID,
              true,
              "",
              "ToGroupedUser"
            );

            $selectList.renderContext(
              "#refer-group-3",
              false,
              _formOptions.ActivityID,
              true,
              "",
              "ToGroupedUser"
            );

            $selectList.renderContext(
              "#refer-group-4",
              false,
              _formOptions.ActivityID,
              true,
              "",
              "ToGroupedUser"
            );
          }

          if (taskAssignmentType[2] == "ToSelfgroupUser") {
            var $selectList = new selectList(1, null);

            $selectList.renderContext(
              "#refer-group-1",
              false,
              _formOptions.ActivityID,
              true,
              "",
              "ToSelfgroupUser"
            );

            $selectList.renderContext(
              "#refer-group-2",
              false,
              _formOptions.ActivityID,
              true,
              "",
              "ToSelfgroupUser"
            );

            $selectList.renderContext(
              "#refer-group-3",
              false,
              _formOptions.ActivityID,
              true,
              "",
              "ToSelfgroupUser"
            );

            $selectList.renderContext(
              "#refer-group-4",
              false,
              _formOptions.ActivityID,
              true,
              "",
              "ToSelfgroupUser"
            );
          }
        }
      }

      if (
        startSLAStatus[0] == "UserBased" ||
        resolveSLAStatus[0] == "UserBased"
      ) {
        $("#sla-type-area").show();

        var $selectList = new selectList(3, null);

        $selectList.renderContext(
          "#process-slas",
          false,
          _formOptions.ActivityID,
          true,
          "1"
        ); //Open >> without SLA
      } else {
        $("#sla-type-area").hide();
      }
    });

    $("#process-slas").change(function () {
      var slaExpression = $("#process-slas :selected").text();

      if (slaExpression.indexOf("مراجعه") == -1) {
        $("#sla-area-1").show();
      } else {
        $("#sla-area-1").hide();
      }

      if (slaExpression.indexOf("انجام") == -1) {
        $("#sla-area-2").show();
      } else {
        $("#sla-area-2").hide();
      }

      if (slaExpression.indexOf("بدون") > -1) {
        $("#sla-area-1").hide();

        $("#sla-area-2").hide();
      }
    });

    $("#refer-group-1").change(function () {
      var $selectList = new selectList(2, null);

      $selectList.renderContext(
        "#refer-user-1",
        false,
        _formOptions.ActivityID,
        true,
        "",
        $("#refer-group-1").val()
      );
    });

    $("#refer-group-2").change(function () {
      var $selectList = new selectList(2, null);

      $selectList.renderContext(
        "#refer-user-2",
        false,
        _formOptions.ActivityID,
        true,
        "",
        $("#refer-group-2").val()
      );
    });

    $("#refer-group-3").change(function () {
      var $selectList = new selectList(2, null);

      $selectList.renderContext(
        "#refer-user-3",
        false,
        _formOptions.ActivityID,
        true,
        "",
        $("#refer-group-3").val()
      );
    });

    $("#refer-group-4").change(function () {
      var $selectList = new selectList(2, null);

      $selectList.renderContext(
        "#refer-user-4",
        false,
        _formOptions.ActivityID,
        true,
        "",
        $("#refer-group-4").val()
      );
    });
  };

  renderTextArea = function (itemObj, parentID) {
    try {
      var placeholder = "";

      if (!jQuery.parseJSON(itemObj.IsRequired) && _reportID == null) {
        placeholder = localize("اختیاری");
      }

      var itemContent =
        '<div class="form-group"  style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-edit"></span></div><textarea class="form-control form-input" id="form-item-' +
        itemObj.FormItemID +
        '" placeholder="' +
        placeholder +
        '" rows="7"></textarea></div>';

      if (
        itemObj.SubTextVisible ||
        (itemObj.Description != "" && itemObj.Description != null)
      ) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      var itemInputID = "#form-item-" + itemObj.FormItemID;

      if (itemObj.Width != "") {
        $(itemInputID).css("width", itemObj.Width);
      }

      if (itemObj.Direction == "rtl" && $$Dir == "RTL") {
        $(itemInputID).attr("dir", "rtl");

        $(itemInputID).css("text-align", "right");
      } else {
        $(itemInputID).attr("dir", "ltr");

        $(itemInputID).css("text-align", "left");
      }

      $("#form-item-" + itemObj.FormItemID).val(
        getDefaultValue(itemObj).replace(/<br\/>/g, "\n")
      );
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  renderSignatureBox = function (itemObj, parentID) {
    try {
      var placeholder = "";

      if (!jQuery.parseJSON(itemObj.IsRequired)) {
        placeholder = localize("اختیاری");
      }

      var itemContent =
        '<div class="form-group"  style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-pencil"></span></div><div class="form-control form-input" id="form-item-' +
        itemObj.FormItemID +
        '" style="height:300px;text-align:center;cursor: url(App_Res/Images/Page/16/Edit.png), auto;">' +
        placeholder +
        '</div><div class="input-group-addon" onclick=""><span class="glyphicon glyphicon-erase" style="cursor:pointer" title="از نو" onclick="$(\'#form-item-' +
        itemObj.FormItemID +
        "').html('');$('#form-item-" +
        itemObj.FormItemID +
        "').jSignature()\"></span></div></div>";

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      if (itemObj.Width != "") {
        $("#form-item-" + itemObj.FormItemID).css("width", itemObj.Width);
      }

      var value = getDefaultValue(itemObj);

      if (value == "" || value == null) {
        $("#form-item-" + itemObj.FormItemID).jSignature();
      } else {
        $("#form-item-" + itemObj.FormItemID).html(getDefaultValue(itemObj));
      }
    } catch (e) {
      raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  };

  getDefaultValue = function (itemObj) {
    var defaultValue = itemObj.DefaultValue;

    if (_data) {
      if (itemObj.DataName.indexOf("Setting") == -1) {
        defaultValue = _data[itemObj.DataName];
      } else {
        defaultValue = _data[itemObj.Name];
      }
    }

    if (defaultValue == "") {
      if (
        itemObj.Name == _parObjType ||
        itemObj.Name == "Parent_" + _parObjType
      ) {
        defaultValue = JSON.stringify(_parObjKey);

        //Sepad Compatibility
        if (_parObjType == "CallID") {
          defaultValue = JSON.stringify(_objKeys[0]);
        }

        defaultValue = jQuery.parseJSON(defaultValue);
      }
    }

    if (
      itemObj.AttributeTypeName == "ShortTime" &&
      defaultValue === undefined
    ) {
      defaultValue = "00:00";
    }

    if (defaultValue == null) return "";

    if (!isNaN(defaultValue)) {
      defaultValue = defaultValue.toString();
    }

    defaultValue = defaultValue.trim();

    $$PageParams[itemObj.Name] = defaultValue;

    if (itemObj.AttributeTypeName == "LongTime" && defaultValue == "") {
      defaultValue = "000:00";
    }

    return htmlDecode(defaultValue);
  };

  function htmlDecode(value) {
    return $("<textarea/>").html(value).text();
  }
}

function triggerDefaultEvent(target, defValue) {
  var _isChecked = defValue;

  $.each(
    jQuery.parseJSON($$FormItems[target].ActionOnChange),
    function (index, event) {
      if (event.value.indexOf("[" + _isChecked + "]") != -1) {
        $.each(event.actions, function (index, action) {
          if (action.targetType == "FormItem") {
            if (action.actionType == "Hide") {
              $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                "display",
                "none"
              );
            }

            if (action.actionType == "Show") {
              $("#form-group-" + $$FormItems[action.target].FormItemID).css(
                "display",
                "block"
              );
            }
          }

          if (action.targetType == "FormGroupBox") {
            if (action.actionType == "Hide") {
              $("#form-group-" + $$FormGroups[action.target]).css(
                "display",
                "none"
              );
            }

            if (action.actionType == "Show") {
              $("#form-group-" + $$FormGroups[action.target]).css(
                "display",
                "block"
              );
            }
          }
        });
      }
    }
  );
}

function $fi(target) {
  return $("#form-item-" + $$FormItems[target].FormItemID);
}

function $fig(target) {
  return $("#form-group-" + $$FormItems[target].FormItemID);
}

function $gfi(target) {
  if ($$FormItems[target].InputType != "CheckBox") {
    return $("#form-item-" + $$FormItems[target].FormItemID).val();
  } else {
    return $gcfi(target);
  }
}

function $sfi(target, val) {
  $("#form-item-" + $$FormItems[target].FormItemID).val(val);
}

function $sfiCss(target, name, val) {
  $("#form-group-" + $$FormItems[target].FormItemID).css(name, val);
}

function $gcfi(target) {
  if ($("#form-item-" + $$FormItems[target].FormItemID).is(":checked")) {
    return 1;
  } else {
    return 0;
  }
}

function $activityParams(targets) {
  var activiyParams = new Array();

  $.each(targets, function (index, target) {
    activiyParams.push({
      ParamIndex: 0,
      ParamName: target,
      ParamValue: $gfi(target),
      FileIsExist: 2,
      FileAttachCode: "",
    });
  });

  return activiyParams;
}

function localize(value) {
  if ($$Lang != "Fa") {
    //En, Ar, ...

    switch (value) {
      case "اختیاری":
        return "Optional";
    }
  }

  return value;
}

function isCanvasBlank(canvas) {
  canvas = canvas.get(0);

  try {
    const context = canvas.getContext("2d");

    const pixelBuffer = new Uint32Array(
      context.getImageData(
        0,
        0,
        canvas.width - 200,
        canvas.height - 100
      ).data.buffer
    );
    return !pixelBuffer.some((color) => color !== 0);
  } catch {
    return false;
  }
}

function $fiToggle(target, s, e) {
  if ($fig(target + "_" + s).css("display") == "none") {
    $fig(target + "_" + s).css("display", "block");
  } else {
    for (i = s; i <= e; i++) {
      if ($fig(target + "_" + i).css("display") == "block") {
        $fig(target + "_" + i).css("display", "none");

        $fi(target + "_" + i).selectpicker("val", null);

        $fig(target + "_" + i)
          .find(".input-group-addon")
          .find(">:first-child")
          .removeClass("glyphicon-minus");

        $fig(target + "_" + i)
          .find(".input-group-addon")
          .find(">:first-child")
          .addClass("glyphicon-plus");
      }
    }
  }
}
