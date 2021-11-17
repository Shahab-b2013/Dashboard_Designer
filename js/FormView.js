function FormView() {
  var _reportID = +"125" >= 3000000 ? id : 5;

  var _objKeys = "";

  var _parObjType = -1;

  var _json = {
    FormID: 1010300,
    Name: "Create New User",
    ItemsGrouping: true,
    ColumnLayout: "OnceColumn",
    ColumnWidth: "default",
    Label: "داشبورد",
    Icon: "User.png",
    ActivityID: 1010300,
    DataActivityID: "",
    charts: [
      {
        FormItemID: 101030007,
        ActivityParamID: 101030007,
        ActionControlID: "",
        Label: "پست الکترونیکی",
        FormID: 1010300,
        ColumnIndex: 0,
        ActivityID: 1010300,
        EntityAttributeID: 1010310,
        FormGroupBoxID: 10103000,

        id: "highcharts-5vfb926-165-",
        name: "",
        text: "",
        type: "pie",
        categoryLabel: "#empty",
        valueLabel: "#empty",
        categoryName: "",
        categoryExpression: "[data2]",
        seriesType: "",
        version: "",
        series: [
          {
            name: "",
            text: "",
            dataExpression: "Sum([data2])",
            plotType: "pie",
            StlyeColor: "#8eb4f1",
            version: "",
          },
        ],
        style: localStorage.getItem("oldChart"),
      },
      {
        FormItemID: 101030007,
        ActivityParamID: 101030007,
        ActionControlID: "",
        Label: "پست الکترونیکی",
        FormID: 1010300,
        ColumnIndex: 1,
        ActivityID: 1010300,
        EntityAttributeID: 1010310,
        FormGroupBoxID: 10103000,

        id: "highcharts-5vfb926-165-",
        name: "",
        text: "",
        type: "pie",
        categoryLabel: "#empty",
        valueLabel: "#empty",
        categoryName: "",
        categoryExpression: "[data2]",
        seriesType: "",
        version: "",
        series: [
          {
            name: "",
            text: "",
            dataExpression: "Sum([data2])",
            plotType: "pie",
            StlyeColor: "#8eb4f1",
            version: "",
          },
        ],
        style: sessionStorage.getItem("oldChart"),
      },
      {
        FormItemID: 101030007,
        ActivityParamID: 101030007,
        ActionControlID: "",
        Label: "پست الکترونیکی",
        Type: "pie",
        FormID: 1010300,
        ColumnIndex: 0,
        ActivityID: 1010300,
        EntityAttributeID: 1010310,
        FormGroupBoxID: 10103001,

        id: "highcharts-5vfb926-165-",
        name: "",
        text: "",
        type: "pie",
        categoryLabel: "#empty",
        valueLabel: "#empty",
        categoryName: "",
        categoryExpression: "[data2]",
        seriesType: "",
        version: "",
        series: [
          {
            name: "",
            text: "",
            dataExpression: "Sum([data2])",
            plotType: "pie",
            StlyeColor: "#8eb4f1",
            version: "",
          },
        ],
        style: sessionStorage.getItem("oldChart"),
      },
      {
        FormItemID: 101030007,
        ActivityParamID: 101030007,
        ActionControlID: "",
        Label: "پست الکترونیکی",
        Type: "pie",
        FormID: 1010300,
        ColumnIndex: 1,
        ActivityID: 1010300,
        EntityAttributeID: 1010310,
        FormGroupBoxID: 10103001,

        id: "highcharts-5vfb926-165-",
        name: "",
        text: "",
        type: "pie",
        categoryLabel: "#empty",
        valueLabel: "#empty",
        categoryName: "",
        categoryExpression: "[data2]",
        seriesType: "",
        version: "",
        series: [
          {
            name: "",
            text: "",
            dataExpression: "Sum([data2])",
            plotType: "pie",
            StlyeColor: "#8eb4f1",
            version: "",
          },
        ],
        style: sessionStorage.getItem("oldChart"),
      },
    ],
    // {
    //   id: "highcharts-5vfb926-165-",
    //   name: "",
    //   text: "",
    //   type: "pie",
    //   categoryLabel: "#empty",
    //   valueLabel: "#empty",
    //   categoryName: "",
    //   categoryExpression: "[data2]",
    //   seriesType: "",
    //   version: "",
    //   series: [
    //     {
    //       name: "",
    //       text: "",
    //       dataExpression: "Sum([data2])",
    //       plotType: "pie",
    //       StlyeColor: "#8eb4f1",
    //       version: "",
    //     },
    //   ],
    //   style:

    //   },
    // {
    //       id: "highcharts-sltsk21-124-",
    //       name: "",
    //       text: "sef",
    //       type: "areaspline",
    //       categoryLabel: "#empty",
    //       valueLabel: "#empty",
    //       categoryName: "",
    //       categoryExpression: "[data2]",
    //       seriesType: "",
    //       version: "23",
    //       series: [
    //         {
    //           name: "",
    //           text: "",
    //           dataExpression: "Sum([data2])",
    //           plotType: "areaspline",
    //           StlyeColor: "#bbc2ce",
    //           version: "23",
    //         },
    //       ],
    //       style:
    //        ;;parent=35;x=910;y=0;width=460;height=400;",
    //     },
    //   ],

    FormGroupBoxs: [
      {
        FormGroupBoxID: 10103000,
        FormID: 1010300,
        Name: "Personal Info",
        Label: "",
        GroupIndex: 0,
        GroupDisplayMode: "GroupWithBox",
        ColumnLayout: "OnceColumn",
        ColumnWidth: "default",
        Visibility: "",
        Enabled: true,
        Version: "1.1.0.core",
        Description: "",
      },

      {
        FormGroupBoxID: 10103001,
        FormID: 1010300,
        Name: "Job Info",
        Label: "اطلاعات سازمانی",
        GroupIndex: 1,
        GroupDisplayMode: "GroupWithBox",
        ColumnLayout: "TwoColumn",
        ColumnWidth: "default",
        Visibility: "",
        Enabled: true,
        Version: "1.1.0.core",
        Description: "",
      },
      // {
      //   FormGroupBoxID: 10103002,
      //   FormID: 1010300,
      //   Name: "Contact Info",
      //   Label: "اطلاعات تماس",
      //   GroupIndex: 2,
      //   GroupDisplayMode: "GroupWithBox",
      //   ColumnLayout: "TwoColumn",
      //   ColumnWidth: "default",
      //   Visibility: "",
      //   Enabled: true,
      //   Version: "1.1.0.core",
      //   Description: "",
      // },
      // {
      //   FormGroupBoxID: 10103003,
      //   FormID: 1010300,
      //   Name: "Other Info",
      //   Label: "سایر",
      //   GroupIndex: 3,
      //   GroupDisplayMode: "GroupWithBox",
      //   ColumnLayout: "OnceColumn",
      //   ColumnWidth: "default",
      //   Visibility: "",
      //   Enabled: true,
      //   Version: "1.1.0.core",
      //   Description: "",
      // },
    ],
  };
  var _formGroups = _json;
  var content;
  var bodyID = "#geContent";

  //#region Render Form Items Layout & Grouping

  if (_formGroups.ItemsGrouping) {
    // _formGroups = _form.groups;

    try {
      $.each(_formGroups.FormGroupBoxs, function (index, formGroup) {
        content =
          '<div  style="' +
          (formGroup.Visibility == "DefaultHidden" ? "display:none" : "") +
          '" id="form-group-' +
          formGroup.FormGroupBoxID +
          '"  class="row form-group-box"  ondragleave="onMouseOut(event)">';

        var columnWidth = formGroup.ColumnWidth;

        if (formGroup.ColumnLayout == "OnceColumn") {
          if (columnWidth == "default") {
            columnWidth = "col-lg-12";
          }

          content +=
            '<div class="' +
            columnWidth +
            ' col-sm-12  col-xs-12 form-group-body"  ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-0" style="height:370px;margin-bottom:10px;white-space:pre-wrap;text-align:center;"></div>';
        }

        if (formGroup.ColumnLayout == "TwoColumn") {
          columnWidth = "col-md-5";

          content +=
            '<div class="' +
            columnWidth +
            " form-group-body" +
            '"' +
            'ondrop="drop(event)" ondragover="allowDrop(event)"' +
            ' id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-0" style="height:370px;margin-bottom:10px;"> </div><div class="' +
            columnWidth +
            " form-group-body" +
            '"' +
            'ondrop="drop(event)" ondragover="allowDrop(event)"' +
            ' id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-1" style="height:370px;margin-bottom:10px;"></div>';
        }

        if (formGroup.ColumnLayout == "ThreeColumn") {
          if (formGroup.GroupDisplayMode == "GroupWithBox") {
            columnWidth = "col-md-3";
          } else {
            columnWidth = "col-md-3";
          }

          content +=
            '</div><div class="' +
            columnWidth +
            " form-group-body" +
            '"ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-0" style="height:370px;margin-bottom:10px;"></div><div class="' +
            columnWidth +
            " form-group-body" +
            '"ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-1" style="height:370px;margin-bottom:10px;"> </div><div class="' +
            columnWidth +
            " form-group-body" +
            '"ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-2" style="height:370px;margin-bottom:10px;"></div></div>';
        }

        //btn json default
        content += Group_Btn(formGroup.FormGroupBoxID);

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
      //   raiseError(e, bodyID);

      return;
    }
  }

  //#endregion

  //#region Render Form Items

  var parentID = "";
  var _formItems = _json;
  var itemsGrouping = _formGroups.ItemsGrouping;
  $("#ContentHeader").html(_formItems.Label);

  $.each(_formItems.charts, function (index, formItem) {
    if (itemsGrouping) {
      parentID =
        "form-group-body-" +
        formItem.FormGroupBoxID +
        "-" +
        formItem.ColumnIndex;
    } else {
      parentID =
        "form-group-mbody-" + formItem.FormID + "-" + formItem.ColumnIndex;
    }

    createImgChart(null, formItem, parentID,formItem.style);
  });
}
function rowbtnOn(e) {
  $("#rowbtn-" + e.target.id).css("display", "block");
}
function rowbtnOn2(e) {
  $("#" + e.target.id).css("display", "block");
}
function rowbtnOff(e) {
  $("#rowbtn-" + e.target.id).css("display", "none");
}
function chartDelete(e) {
  //img remove
  let parent = $("#" + e.target.id).parent()[0].id;
  let div =
    '<div id="myModal" class="modal" style="">' +
    '<div id="chartModal" class="" style="font-size:16px;color:#000;font-style:normal;position: relative;width:30%;top:30%;background-color:#fff; margin: auto; overflow: auto; border: 1px solid #ccc; border-radius: 4px;">' +
    '<div id="contentM" class="row col-lg-12" style="padding: 10px 16px 0px 0px;margin: 20px 0px 40px 0px;">آیا از حذف ای چارت جاری مطمعن هستید ؟</div><hr style="margin:0px;width:100%;">' +
    '<div class="row" style="padding:16px;margin:0px"><span id="del" class="btn btn-danger"  onclick="del()"> حذف</span>' +
    '<span id="closed" class="btn btn-secondary" style="width:60px;margin-Right:10px;" onclick="closed()"> لغو</span></div></div></div>';

  $("#" + parent).append(div);
  // Get the modal
  $("#myModal").css("display", "block");
  // }
}
function del() {
  let parent = $("#myModal").parent()[0].id;
  let imgid = parent.replaceAll("rowbtn-img-", "img-");
  $("#" + imgid).remove();

  //rowbtn remove
  let rowbtn = imgid.replaceAll("img-", "rowbtn-img-");
  $("#" + rowbtn).remove();
}
function closed() {
  $("#myModal").css("display", "none");
}
