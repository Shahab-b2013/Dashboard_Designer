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
    Label: "ایجاد کاربر جدید",
    Icon: "User.png",
    ActivityID: 1010300,
    DataActivityID: "",
    FormItems: [
      {
        FormItemID: 101030000,
        ActivityParamID: 101030000,
        ActionControlID: "",
        Name: "FirstName",
        Label: "نام",
        InputType: "TextBox",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "",
        AttributeTypeName: "String",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 0,
        IsRequired: true,
        MinValueLenght: "1",
        MaxValueLenght: "500",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "FirstName",
        ActivityID: 1010300,
        EntityAttributeID: 1010301,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "rtl",
        Addon: "edit",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 0,
        ColumnIndex: 0,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103000,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_FirstName",
        LocationPath: "",
      },
      {
        FormItemID: 101030001,
        ActivityParamID: 101030001,
        ActionControlID: "",
        Name: "LastName",
        Label: "نام خانوادگی",
        InputType: "TextBox",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "",
        AttributeTypeName: "String",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 1,
        IsRequired: true,
        MinValueLenght: "1",
        MaxValueLenght: "500",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "LastName",
        ActivityID: 1010300,
        EntityAttributeID: 1010302,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "rtl",
        Addon: "edit",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 1,
        ColumnIndex: 0,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103000,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_LastName",
        LocationPath: "",
      },
      {
        FormItemID: 101030002,
        ActivityParamID: 101030002,
        ActionControlID: "",
        Name: "UserName",
        Label: "شناسه کاربری",
        InputType: "TextBox",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "",
        AttributeTypeName: "LatinString",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 2,
        IsRequired: true,
        MinValueLenght: "1",
        MaxValueLenght: "500",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "UserName",
        ActivityID: 1010300,
        EntityAttributeID: 1010303,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "ltr",
        Addon: "edit",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 2,
        ColumnIndex: 0,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: true,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103000,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "English characters",
        DataName: "Sys_Users_UserName",
        LocationPath: "",
      },
      {
        FormItemID: 101030003,
        ActivityParamID: 101030003,
        ActionControlID: "",
        Name: "Password",
        Label: "رمز عبور",
        InputType: "PasswordBox",
        UnitToDisplay: "",
        FormatToDisplay: "Hidden",
        RegexFormat: "encrypted",
        AttributeTypeName: "Password",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 3,
        IsRequired: true,
        MinValueLenght: "8",
        MaxValueLenght: "50",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "Password",
        ActivityID: 1010300,
        EntityAttributeID: 1010305,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "ltr",
        Addon: "key",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 3,
        ColumnIndex: 0,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: true,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103000,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "Use at least 8 characters",
        DataName: "Sys_Users_Password",
        LocationPath: "",
      },
      {
        FormItemID: 101030004,
        ActivityParamID: 101030004,
        ActionControlID: "",
        Name: "JobTitle",
        Label: "عنوان شغلی",
        InputType: "TextBox",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "",
        AttributeTypeName: "String",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 4,
        IsRequired: true,
        MinValueLenght: "1",
        MaxValueLenght: "500",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "JobTitle",
        ActivityID: 1010300,
        EntityAttributeID: 1010307,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "rtl",
        Addon: "edit",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 4,
        ColumnIndex: 0,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103001,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_JobTitle",
        LocationPath: "",
      },
      {
        FormItemID: 101030006,
        ActivityParamID: 101030006,
        ActionControlID: "",
        Name: "EmployeeID",
        Label: "کد پرسنلی",
        InputType: "TextBox",
        UnitToDisplay: "",
        FormatToDisplay: "Numeric",
        RegexFormat: "([0-9])*",
        AttributeTypeName: "BigInteger",
        BaseDataType: "BIGINT",
        ParamIndex: 6,
        IsRequired: false,
        MinValueLenght: "1",
        MaxValueLenght: "18",
        MinValue: "-9223372036854775808",
        MaxValue: "9223372036854775807",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "EmployeeID",
        ActivityID: 1010300,
        EntityAttributeID: 1010309,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "ltr",
        Addon: "edit",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 6,
        ColumnIndex: 0,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103001,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_EmployeeID",
        LocationPath: "",
      },
      {
        FormItemID: 101030007,
        ActivityParamID: 101030007,
        ActionControlID: "",
        Name: "EmailID",
        Label: "پست الکترونیکی",
        InputType: "TextBox",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "",
        AttributeTypeName: "EmailID",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 7,
        IsRequired: false,
        MinValueLenght: "6",
        MaxValueLenght: "50",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "EmailID",
        ActivityID: 1010300,
        EntityAttributeID: 1010310,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "ltr",
        Addon: "send-o",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 7,
        ColumnIndex: 0,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103002,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_EmailID",
        LocationPath: "",
      },
      {
        FormItemID: 101030009,
        ActivityParamID: 101030009,
        ActionControlID: "",
        Name: "TellNo",
        Label: "شماره تلفن",
        InputType: "TextBox",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "",
        AttributeTypeName: "Phone",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 9,
        IsRequired: false,
        MinValueLenght: "1",
        MaxValueLenght: "50",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "TellNo",
        ActivityID: 1010300,
        EntityAttributeID: 1010312,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "ltr",
        Addon: "fax",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 9,
        ColumnIndex: 0,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103002,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_TellNo",
        LocationPath: "",
      },
      {
        FormItemID: 101030011,
        ActivityParamID: 101030011,
        ActionControlID: "",
        Name: "FaceImage",
        Label: "تصویر کاربر",
        InputType: "FileBrowse",
        UnitToDisplay: "",
        FormatToDisplay: "Image",
        RegexFormat: '["jpg", "png", "gif","jpeg"]',
        AttributeTypeName: "Image",
        BaseDataType: "VARBINARY(MAX)",
        ParamIndex: 11,
        IsRequired: false,
        MinValueLenght: "1",
        MaxValueLenght: "1024",
        MinValue: "50*50",
        MaxValue: "2000*2000",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "FaceImage",
        ActivityID: 1010300,
        EntityAttributeID: 1010314,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "ltr",
        Addon: "link",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 11,
        ColumnIndex: 0,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103003,
        DefaultValue: "default1",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_FaceImage",
        LocationPath: "../../App_Res/Images/Users/",
      },
      {
        FormItemID: 101030005,
        ActivityParamID: 101030005,
        ActionControlID: "",
        Name: "BusinessImpact",
        Label: "اهمیت کاربر",
        InputType: "SelectList",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "",
        AttributeTypeName: "String",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 5,
        IsRequired: true,
        MinValueLenght: "1",
        MaxValueLenght: "500",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "BusinessImpact",
        ActivityID: 1010300,
        EntityAttributeID: 1010308,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "rtl",
        Addon: "edit",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 5,
        ColumnIndex: 1,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103001,
        DefaultValue: "",
        EnumTypeID: "1",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_BusinessImpact",
        LocationPath: "",
      },
      {
        FormItemID: 101030008,
        ActivityParamID: 101030008,
        ActionControlID: "",
        Name: "MobileNo",
        Label: "شماره موبایل",
        InputType: "TextBox",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "[0][9]([0-9])*",
        AttributeTypeName: "Mobile",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 8,
        IsRequired: false,
        MinValueLenght: "11",
        MaxValueLenght: "11",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "MobileNo",
        ActivityID: 1010300,
        EntityAttributeID: 1010311,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "ltr",
        Addon: "phone",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 8,
        ColumnIndex: 1,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103002,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_MobileNo",
        LocationPath: "",
      },
      {
        FormItemID: 101030010,
        ActivityParamID: 101030010,
        ActionControlID: "",
        Name: "FaxNo",
        Label: "شماره تست",
        InputType: "NumericRangeBox",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "",
        AttributeTypeName: "Phone",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 10,
        IsRequired: false,
        MinValueLenght: "1",
        MaxValueLenght: "50",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "FaxNo",
        ActivityID: 1010300,
        EntityAttributeID: 1010313,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "ltr",
        Addon: "fax",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 10,
        ColumnIndex: 1,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103002,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_FaxNo",
        LocationPath: "",
      },
      {
        FormItemID: 1010300111,
        ActivityParamID: 1010300111,
        ActionControlID: "",
        Name: "FaxNo",
        Label: "شماره فکس",
        InputType: "RadioButtonList",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "",
        AttributeTypeName: "Phone",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 10,
        IsRequired: false,
        MinValueLenght: "1",
        MaxValueLenght: "50",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "FaxNo",
        ActivityID: 1010300,
        EntityAttributeID: 1010313,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "ltr",
        Addon: "fax",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 10,
        ColumnIndex: 1,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103002,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_FaxNo",
        LocationPath: "",
      },
      {
        FormItemID: 1010300112,
        ActivityParamID: 1010300112,
        ActionControlID: "",
        Name: "FaxNo",
        Label: "dشماره فکس",
        InputType: "CheckBox",
        UnitToDisplay: "",
        FormatToDisplay: "",
        RegexFormat: "",
        AttributeTypeName: "Phone",
        BaseDataType: "NVARCHAR(500)",
        ParamIndex: 10,
        IsRequired: false,
        MinValueLenght: "1",
        MaxValueLenght: "50",
        MinValue: "",
        MaxValue: "",
        Enabled: true,
        IsReadOnly: false,
        FormID: 1010300,
        ParamName: "FaxNo",
        ActivityID: 1010300,
        EntityAttributeID: 1010313,
        ReferEntityDisableAllow: false,
        ReferEntityMultipleAllow: false,
        Direction: "ltr",
        Addon: "fax",
        MaskFormat: "",
        MaskAlias: "",
        RowIndex: 10,
        ColumnIndex: 1,
        DisplayMode: "Vertical",
        Width: "",
        SubTextVisible: false,
        ActionOnChange: "",
        Visibility: "",
        ParentName: "",
        ParentName2: "",
        HasAddon: false,
        FormGroupBoxID: 10103002,
        DefaultValue: "",
        EnumTypeID: "",
        Version: "1.1.0.core",
        Description: "",
        DataName: "Sys_Users_FaxNo",
        LocationPath: "",
      },
    ],
    FormGroupBoxs: [
      {
        FormGroupBoxID: 10103000,
        FormID: 1010300,
        Name: "Personal Info",
        Label: "اطلاعات کاربری",
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
        ColumnLayout: "OnceColumn",
        ColumnWidth: "default",
        Visibility: "",
        Enabled: true,
        Version: "1.1.0.core",
        Description: "",
      },
      {
        FormGroupBoxID: 10103002,
        FormID: 1010300,
        Name: "Contact Info",
        Label: "اطلاعات تماس",
        GroupIndex: 2,
        GroupDisplayMode: "GroupWithBox",
        ColumnLayout: "TwoColumn",
        ColumnWidth: "default",
        Visibility: "",
        Enabled: true,
        Version: "1.1.0.core",
        Description: "",
      },
      {
        FormGroupBoxID: 10103003,
        FormID: 1010300,
        Name: "Other Info",
        Label: "سایر",
        GroupIndex: 3,
        GroupDisplayMode: "GroupWithBox",
        ColumnLayout: "OnceColumn",
        ColumnWidth: "default",
        Visibility: "",
        Enabled: true,
        Version: "1.1.0.core",
        Description: "",
      },
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
          '"  class="row form-group-box"  ondrop="drop(event)" ondragover="allowDrop(event)">';

        // $$FormGroups[formGroup.Name] = formGroup.FormGroupBoxID;

        if (formGroup.GroupDisplayMode == "GroupWithBox") {
          content +=
            '<div class="col-lg-2 col-md-2 group-info noDrop" ondragover="allowDrop(event)" id="group-info-' +
            formGroup.FormGroupBoxID +
            '"' +
            '><h4 class="group-title">' +
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
            ' col-sm-12  col-xs-12 form-group-body" ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-0"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)" id="miniDiv-1' +
            formGroup.FormGroupBoxID +
            '"></div>';
        }

        if (formGroup.ColumnLayout == "TwoColumn") {
          columnWidth = "col-md-4";

          content +=
            '<div class="' +
            columnWidth +
            " form-group-body" +
            '"' +
            ' ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)"' +
            ' id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-0"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)" id="miniDiv-2-0' +
            formGroup.FormGroupBoxID +
            '"></div><div class="' +
            columnWidth +
            " form-group-body" +
            '"' +
            ' ondragenter="dragEnter(event)" ondragleave="dragLeave(event)" onmouseout="onMouseOut(event)" ondrop="drop(event)" ondragover="allowDrop(event)"' +
            ' id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-1"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)" id="miniDiv-2-1' +
            formGroup.FormGroupBoxID +
            '"></div>';
        }

        if (formGroup.ColumnLayout == "ThreeColumn") {
          if (formGroup.GroupDisplayMode == "GroupWithBox") {
            columnWidth = "col-md-2";
          } else {
            columnWidth = "col-md-3";
          }

          content +=
            '</div><div class="' +
            columnWidth +
            " form-group-body" +
            '"ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-0"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)" id="miniDiv-3-0' +
            formGroup.FormGroupBoxID +
            '"></div><div class="' +
            columnWidth +
            " form-group-body" +
            '"ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-1"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)" id="miniDiv-3-1' +
            formGroup.FormGroupBoxID +
            '"></div><div class="' +
            columnWidth +
            " form-group-body" +
            '"ondrop="drop(event)" ondragover="allowDrop(event)" id="form-group-body-' +
            formGroup.FormGroupBoxID +
            '-2"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)" id="miniDiv-3-2' +
            formGroup.FormGroupBoxID +
            '"></div>';
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
  } else {
    try {
      content = '<div class="row form-group-box">';

      var columnWidth = formGroup.ColumnWidth;

      if (formGroup.ColumnLayout == "OnceColumn") {
        if (columnWidth == "default") {
          columnWidth = "col-lg-7 col-md-10";
        }

        content +=
          '<div class="' +
          columnWidth +
          '" id="form-group-mbody-' +
          formGroup.FormID +
          '-0"></div>';
      }

      if (formGroup.ColumnLayout == "TwoColumn") {
        columnWidth = "col-md-4";

        content +=
          '<div class="' +
          columnWidth +
          '" id="form-group-mbody-' +
          formGroup.FormID +
          '-0"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)"></div><div class="' +
          columnWidth +
          '" id="form-group-mbody-' +
          formGroup.FormID +
          '-1"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)"></div>';
      }

      if (formGroup.ColumnLayout == "ThreeColumn") {
        columnWidth = "col-md-3";

        content +=
          '<div class="' +
          columnWidth +
          '" id="form-group-mbody-' +
          formGroup.FormID +
          '-0"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)"></div><div class="' +
          columnWidth +
          '" id="form-group-mbody-' +
          formGroup.FormID +
          '-1"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)"></div><div class="' +
          columnWidth +
          '" id="form-group-mbody-' +
          formGroup.FormID +
          '-2"></div><div class="col-md-1 noDrop" ondragover="allowDrop(event)"></div>';
      }

      content += "</div>";

      $(bodyID).append(content);
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

  try {
    $.each(_formItems.FormItems, function (index, formItem) {
      if (itemsGrouping) {
        parentID =
          "#form-group-body-" +
          formItem.FormGroupBoxID +
          "-" +
          formItem.ColumnIndex;
      } else {
        parentID =
          "#form-group-mbody-" + formItem.FormID + "-" + formItem.ColumnIndex;
      }
      //   $$FormItems[formItem.Name] = formItem;

      switch (formItem.InputType) {
        case "SelectList":
          renderSelectList(formItem, parentID, formItem.ActivityID);
          break;

        case "TextBox":
          renderTextBox(formItem, parentID, formItem.ActivityID);
          break;

        case "NumericRangeBox":
          renderNumericRangeBox(formItem, parentID);
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
    // raiseError(e, bodyID);

    return;
  }

  function renderSelectList(itemObj, parentID, activityID) {
    try {
      var itemContent =
        '<div style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" class="form-group noDrop" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" id="form-group-' +
        itemObj.FormItemID +
        '"><label class="form-item-lbl noDrop" ondragover="allowDrop(event)" id=' +
        '"' +
        itemObj.FormItemID +
        '"' +
        " " +
        'for="form-item-' +
        itemObj.FormItemID +
        '"' +
        'ondblclick="labelProp(id)' +
        '">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-check"></span></div><select ' +
        (itemObj.Visibility == "Disabled" ? "disabled" : "") +
        ' class="form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-' +
        itemObj.FormItemID +
        '"> </select>';
      if (itemObj.SubTextVisible) {
        itemContent +=
          '</div><small class="text-muted">' + itemObj.Description + "</small>";
      }

      if (itemObj.HasAddon) {
        var _formAddon = new iData(
          "f0a087e3-3c5c-4ea7-a9c7-e80f19ff7726",
          itemObj.FormItemID
        );

        _formAddon = _formAddon.getObject();

        if (_formAddon.Type == "SmartSearch") {
          itemContent +=
            '<div class="input-group-addon"><span class="glyphicon glyphicon-search" onclick="renderModalGridWithContext(' +
            (+_modalID + 1) +
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

      $("#" + parentID).append(itemContent);

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
            filterVal1 = $().val();
            "#form-item-" + $$FormItems[itemObj.ParentName].FormItemID;

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
        filterVal2 = $().val();
        "#form-item-" + $$FormItems[itemObj.ParentName2].FormItemID;

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
        itemObj.IsRequired,
        itemObj.ActionOnChange,
        value,
        filterVal1,
        filterVal2,
        itemObj.Description
      );
    } catch (e) {
      // raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  function renderTextBox(itemObj, parentID, activityID) {
    try {
      var placeholder = "";
      //   if (!itemObj.IsRequired && _reportID == null) {
      //     placeholder = localize("اختیاری");
      //   }
      var toggle = "";
      if (itemObj.UnitToDisplay == "ریال") {
        itemObj.UnitToDisplay = $$Currency;
      }

      var itemContent =
        toggle +
        '<div style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" class="form-group noDrop" ondragover="allowDrop(event)" draggable="true" ondragover="allowDrop(event)" ondragstart="drag(event)" id="form-group-' +
        itemObj.FormItemID +
        '"><label class="form-item-lbl noDrop" ondragover="allowDrop(event)" id=' +
        '"' +
        itemObj.FormItemID +
        '"' +
        " " +
        'for="form-item-' +
        itemObj.FormItemID +
        '"' +
        'ondblclick="labelProp(id)' +
        '">' +
        itemObj.Label +
        (itemObj.UnitToDisplay != ""
          ? " (" + itemObj.UnitToDisplay + ") "
          : "") +
        '</label><div class="input-group" ><div class="input-group-addon"><span class="glyphicon glyphicon-edit"></span></div><input disabled  type="text"  title="' +
        (_reportID == null ? itemObj.Name : "") +
        '" class="form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-' +
        itemObj.FormItemID +
        '"  ondblclick="TextboxProp()" placeholder="' +
        placeholder +
        '">';

      itemContent += toggle + "</div>";

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
        $._isDefault.toLowerCase() &&
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
      if (itemObj.IsReadOnly) {
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
      // raiseError(e, "#form-group-" + itemObj.FormItemID);
      return;
    }
  }

  function renderNumericRangeBox(itemObj, parentID) {
    try {
      var itemContent =
        '<div style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" class="form-group noDrop" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" id="form-group-' +
        itemObj.FormItemID +
        '"><label class="form-item-lbl noDrop" ondragover="allowDrop(event)" id="form-group-lbl' +
        itemObj.FormItemID +
        '"' +
        ' ondblclick="labelProp(id)">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-edit"></span></div><input disabled type="text" class="form-control form-input noDrop" ondragover="allowDrop(event)" style="width:50%;margin:0px 0px 0px 0%" id="form-item-from-' +
        itemObj.FormItemID +
        '" ondblclick="TextboxProp(id)" placeholder="از"><input disabled  type="text" class="form-control form-input noDrop" ondragover="allowDrop(event)" style="width:50%" id="form-item-to-' +
        itemObj.FormItemID +
        '" ondblclick="TextboxProp(id)" placeholder="تا" ></div>';

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
      //   raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  function renderFileBrowse(itemObj, parentID) {
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

      //   if (!itemObj.IsRequired) {
      //     placeholder =
      //   "<span class='form-input-placeholder'>" +
      //   localize("اختیاری") +
      //   "</span>";
      //   }

      var itemContent =
        '<div style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" class="form-group noDrop" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" id="form-group-' +
        itemObj.FormItemID +
        '" data-item-name="' +
        itemObj.Name +
        '"><label' +
        " " +
        'class="form-item-lbl noDrop" ondragover="allowDrop(event)"' +
        "    " +
        'id="form-group-uu' +
        itemObj.FormItemID +
        '"' +
        'ondblclick="labelProp(id)"' +
        '">' +
        itemObj.Label +
        '</label><div><input disabled  type="file"  class="form-control form-input noDrop  file" ondragover="allowDrop(event)" data-show-preview="false" data-show-remove="false" data-show-upload="false"  id="form-item-' +
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
          allowedFileExtensions: itemObj.RegexFormat,
          allowedFileTypes: ["image"],
          showPreview: true,
          maxFileSize: itemObj.MaxValueLenght,
          initialPreview: [itemObj.DefaultValue],
        });
      } else {
        $("#form-item-" + itemObj.FormItemID).fileinput({
          allowedFileExtensions: itemObj.RegexFormat,
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
      // raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  function renderCheckBox(itemObj, parentID) {
    try {
      var itemContent =
        '<div class="form-group noDrop" draggable="true" ondragstart="drag(event)"+ style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" id="form-group-' +
        itemObj.FormItemID +
        '"><div class="checkbox noDrop"><input class="noDrop" ondragover="allowDrop(event)" type="checkbox" title="' +
        itemObj.Name +
        '" id="form-item-' +
        itemObj.FormItemID +
        '"/>&nbsp;' +
        " <label" +
        " " +
        'class="form-item-lbl noDrop" ondragover="allowDrop(event)"' +
        " " +
        'id="form-item-lbl-' +
        itemObj.FormItemID +
        '"' +
        'ondblclick="labelProp(id)"' +
        '" class="input-checkbox-label">' +
        itemObj.Label +
        "</label></div>";

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      // if (getDefaultValue(itemObj) == "True") {
      //   $("#form-item-" + itemObj.FormItemID).attr("checked", "checked");
      // }

      // if (itemObj.Visibility == "Disabled") {
      //   $("#form-item-" + itemObj.FormItemID).attr("disabled", "disabled");
      // }

      // $("#form-item-" + itemObj.FormItemID)
      //   .iCheck({
      //     checkboxClass: "icheckbox_square-green",

      //     radioClass: "iradio_square-green",
      //   })
      //   .on("ifChanged", function (e) {
      //     var isChecked = e.currentTarget.checked;

      //     if ($$FormItems[e.currentTarget.title] === undefined) {
      //       return;
      //     }

      //     if ($$FormItems[e.currentTarget.title].ActionOnChange == "") {
      //       return;
      //     }

      //     // $.each(
      //     //   jQuery.parseJSON($$FormItems[e.currentTarget.title].ActionOnChange),
      //     //   function (index, event) {
      //     //     if (event.value.indexOf("[" + isChecked + "]") != -1) {
      //     //       $.each(event.actions, function (index, action) {
      //     //         if (action.targetType == "FormItem") {
      //     //           if (action.actionType == "Hide") {
      //     //             $(
      //     //               "#form-group-" + $$FormItems[action.target].FormItemID
      //     //             ).css("display", "none");
      //     //           }

      //     //           if (action.actionType == "Show") {
      //     //             $(
      //     //               "#form-group-" + $$FormItems[action.target].FormItemID
      //     //             ).css("display", "block");
      //     //           }

      //     //           if (action.actionType == "ChangeValue") {
      //     //             var inlineFunction = new Function(action.actionCallback);

      //     //             inlineFunction();
      //     //           }
      //     //         }

      //     //         if (action.targetType == "FormGroupBox") {
      //     //           if (action.actionType == "Hide") {
      //     //             $("#form-group-" + $$FormGroups[action.target]).css(
      //     //               "display",
      //     //               "none"
      //     //             );
      //     //           }

      //     //           if (action.actionType == "Show") {
      //     //             $("#form-group-" + $$FormGroups[action.target]).css(
      //     //               "display",
      //     //               "block"
      //     //             );
      //     //           }
      //     //         }
      //     //       });
      //     //     }
      //     //   }
      //     // );
      //   });

      // if (itemObj.ActionOnChange != "") {
      //   setTimeout(
      //     "triggerDefaultEvent('" +
      //       itemObj.Name +
      //       "','" +
      //       getDefaultValue(itemObj).toLowerCase() +
      //       "')",
      //     500
      //   );
      // }
    } catch (e) {
      // raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  function renderRadioButtonList(itemObj, parentID) {
    try {
      var itemContent =
        '<div class="form-group noDrop" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" id="form-group-' +
        itemObj.FormItemID +
        '"><div class="checkbox noDrop" ondragover="allowDrop(event)"> <input class="noDrop" ondragover="allowDrop(event)" type="radio" title="' +
        itemObj.Name +
        '" id="form-item-' +
        itemObj.FormItemID +
        '"/>&nbsp;' +
        '<label class="form-item-lbl noDrop" ondragover="allowDrop(event)" id="form-item-lbl' +
        itemObj.FormItemID +
        '"' +
        "  " +
        'ondblclick="labelProp(id)"' +
        " " +
        'class="input-checkbox-label"> ' +
        itemObj.Label +
        "</label></div>";

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);

      // var itemContent =
      //   '<div class="form-group" id="form-group-' +
      //   itemObj.FormItemID +
      //   '"><label>' +
      //   itemObj.Label +
      //   "</label><div>";

      // var $radioButtonList = new radioButtonList(itemObj.EnumTypeID);

      // itemContent += $radioButtonList.renderContext(
      //   itemObj.FormItemID,
      //   itemObj.DefaultValue
      // );
      // itemContent +=
      //   '</div><input type="radio" id="form-item-' +
      //   itemObj.FormItemID +
      //   '" value="' +
      //   itemObj.DefaultValue +
      //   '">';

      // if (itemObj.SubTextVisible) {
      //   itemContent +=
      //     '<small class="text-muted">' + itemObj.Description + "</small>";
      // }

      // itemContent += "</div>";

      // $(parentID).append(itemContent);
      // $(
      //   "input[type=radio][name=optionsRadios-" + itemObj.FormItemID + "]"
      // ).change(function () {
      //   if ($(this).is(":checked")) {
      //     $("#form-item-" + itemObj.FormItemID).val(this.value);
      //   }
      // });

      // $(
      //   "input[type=radio][name=optionsRadios-" + itemObj.FormItemID + "]"
      // ).iCheck({
      //   checkboxClass: "icheckbox_square-green",

      //   radioClass: "iradio_square-green",

      //   increaseArea: "20%", // optional
      // });
    } catch (e) {
      // itemContent += "</div></div>";

      // $(parentID).append(itemContent);

      //  raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  function renderDateBox(itemObj, parentID) {
    try {
      var placeholder = "";

      //   if (!jQuery.parseJSON(itemObj.IsRequired)) {
      //     placeholder = localize("اختیاری");
      //   }

      var itemContent =
        '<div draggable="true" ondragstart="drag(event)" style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" class="form-group noDrop" ondragover="allowDrop(event)" id="form-group-' +
        itemObj.FormItemID +
        '"><label class="form-item-lbl noDrop" ondragover="allowDrop(event)"  for="form-item-' +
        itemObj.FormItemID +
        '">' +
        'ondblclick="labelProp()"' +
        itemObj.Label +
        '</label><div class="input-group"><div id="picker-' +
        itemObj.FormItemID +
        '" data-mdpersiandatetimepickershowing="false" title="" data-original-title="" data-mdpersiandatetimepickerselecteddatetime="{&quot;Year&quot;:1393,&quot;Month&quot;:10,&quot;Day&quot;:9,&quot;Hour&quot;:0,&quot;Minute&quot;:0,&quot;Second&quot;:0}" data-mdpersiandatetimepicker="" style="cursor: pointer;" class="input-group-addon" data-mddatetimepicker="true" data-targetselector="#form-item-' +
        itemObj.FormItemID +
        '" data-trigger="click"  data-placement="top" data-englishnumber="true" ><span class="glyphicon glyphicon-calendar"></span></div><input disabled  type="text" class="form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-' +
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
  }

  function renderDateRangeBox(itemObj, parentID) {
    try {
      var placeholder = "";

      //   if (!jQuery.parseJSON(itemObj.IsRequired)) {
      //     placeholder = localize("اختیاری");
      //   }

      var itemContent =
        '<div  class="noDrop" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" id="form-group-' +
        "" +
        itemObj.FormItemID +
        '"><label class="form-item-lbl noDrop" ondragover="allowDrop(event)" for="form-item-' +
        itemObj.FormItemID +
        '" ondblclick="labelProp(id)">' +
        itemObj.Label +
        "</label>";

      itemContent +=
        '<div class="input-group"><div id="picker-' +
        itemObj.FormItemID +
        '" data-mdpersiandatetimepickershowing="false" title="" data-original-title="" data-mdpersiandatetimepickerselecteddatetime="{&quot;Year&quot;:1393,&quot;Month&quot;:10,&quot;Day&quot;:9,&quot;Hour&quot;:0,&quot;Minute&quot;:0,&quot;Second&quot;:0}" data-mdpersiandatetimepicker="" style="cursor: pointer;" class="input-group-addon" data-mddatetimepicker="true" data-targetselector="#form-item-from-' +
        itemObj.FormItemID +
        '" data-trigger="click"  data-placement="top" data-englishnumber="true"  ><span class="glyphicon glyphicon-calendar"></span></div><input disabled type="text"  form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-from-' +
        itemObj.FormItemID +
        '" placeholder="از" dir="ltr" data-mdpersiandatetimepickershowing="false" title="" data-original-title="" data-mdpersiandatetimepickerselecteddatetime="{&quot;Year&quot;:1393,&quot;Month&quot;:10,&quot;Day&quot;:9,&quot;Hour&quot;:0,&quot;Minute&quot;:0,&quot;Second&quot;:0}" data-mdpersiandatetimepicker="" data-mddatetimepicker="true" data-targetselector="#form-item-from-' +
        itemObj.FormItemID +
        '" data-trigger="click"  data-placement="top"  data-englishnumber="true">';

      itemContent +=
        '<div id="picker-' +
        itemObj.FormItemID +
        '" data-mdpersiandatetimepickershowing="false" title="" data-original-title="" data-mdpersiandatetimepickerselecteddatetime="{&quot;Year&quot;:1393,&quot;Month&quot;:10,&quot;Day&quot;:9,&quot;Hour&quot;:0,&quot;Minute&quot;:0,&quot;Second&quot;:0}" data-mdpersiandatetimepicker="" style="cursor: pointer;" class="input-group-addon" data-mddatetimepicker="true" data-targetselector="#form-item-to-' +
        itemObj.FormItemID +
        '" data-trigger="click"  data-placement="top" data-englishnumber="true" ><span class="glyphicon glyphicon-calendar"></span></div><input disabled type="text" form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-to-' +
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
  }

  //Not implemented
  function renderTreeSelectList(itemObj, parentID) {
    try {
      var itemContent =
        '<div class="form-group noDrop" draggable="true" ondragstart="drag(event)" id="form-group-' +
        itemObj.FormItemID +
        '"><label class="form-item-lbl noDrop"  for="form-item-' +
        itemObj.FormItemID +
        '" ondblclick="labelProp(id)">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-share"></span></div><select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-' +
        itemObj.FormItemID +
        '"> </select></div>';

      if (itemObj.SubTextVisible) {
        itemContent +=
          '<small class="text-muted">' + itemObj.Description + "</small>";
      }

      itemContent += "</div>";

      $(parentID).append(itemContent);
    } catch (e) {
      // raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  function renderSecureBox(itemObj, parentID) {
    try {
      var placeholder = "";

      //   if (!jQuery.parseJSON(itemObj.IsRequired)) {
      //     placeholder = localize("اختیاری");
      //   }

      var itemContent =
        '<div class="form-group noDrop" ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" id="form-group-' +
        itemObj.FormItemID +
        '"><label class="form-item-lbl noDrop" ondragover="allowDrop(event)"  for="form-item-' +
        itemObj.FormItemID +
        '" ondblclick="labelProp(id)">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div><input disabled type="password" class="form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-' +
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
      // raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  function renderPasswordBox(itemObj, parentID) {
    try {
      var placeholder = "";

      //   if (!itemObj.IsRequired) {
      //     placeholder = localize("اختیاری");
      //   }

      var itemContent =
        '<div class="form-group noDrop" ondragover="allowDrop(event)" id="form-group-' +
        itemObj.FormItemID +
        '"' +
        '  draggable="true" ondragstart="drag(event)" ' +
        "><label " +
        'class="form-item-lbl noDrop" ondragover="allowDrop(event)"' +
        "id=" +
        '"' +
        itemObj.FormItemID +
        '"' +
        ' for="form-item-' +
        itemObj.FormItemID +
        '"' +
        'ondblclick="labelProp(id)' +
        '">' +
        itemObj.Label +
        ' </label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div><input disabled type="password" class="form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-' +
        itemObj.FormItemID +
        '" placeholder="' +
        placeholder +
        '" ondblclick="PasswordProp(id)"></div></div>';
      //تکرار
      itemContent +=
        '<div class="form-group noDrop" ondragover="allowDrop(event)"  id="form-group-' +
        itemObj.FormItemID +
        "-rep" +
        '"' +
        '  draggable="true" ondragstart="drag(event)" ' +
        "><label " +
        'class="form-item-lbl noDrop"  ondragover="allowDrop(event)" id=' +
        '"' +
        itemObj.FormItemID +
        "-1" +
        '"' +
        ' for="form-item-' +
        itemObj.FormItemID +
        '-rep"' +
        'ondblclick="labelProp(id)' +
        '">' +
        "تکرار " +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></div><input  ondblclick="PasswordProp(id)" disabled type="password" class="form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-' +
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
      // raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  function renderTextView(itemObj, parentID) {
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
            '<input class="view-checkbox noDrop" ondragover="allowDrop(event)" type="checkbox" checked disabled/>';
        } else {
          value =
            '<input class="view-checkbox noDrop" ondragover="allowDrop(event)" type="checkbox" disabled/>';
        }
      }

      var itemContent =
        '<div class="form-group noDrop" ondragover="allowDrop(event)" id="form-group-' +
        'draggable="true" ondragstart="drag(event)"' +
        itemObj.FormItemID +
        '">' +
        (itemObj.AttributeTypeName == "Boolean" ? value : "") +
        '&nbsp;<label class="form-item-lbl noDrop" ondragover="allowDrop(event)"  for="form-item-' +
        itemObj.FormItemID +
        '" ondblclick="labelProp(id)">' +
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

      //   if (_objKeys.length > 1) {
      //     $("#form-item-" + itemObj.FormItemID).html(
      //       _objKeys.length + localize("مورد ")
      //     );
      //   }

      if (itemObj.AttributeTypeName != "Boolean") {
        if (_objKeys.length == 1) {
          $("#form-item-" + itemObj.FormItemID).html(value);
        }
      }
    } catch (e) {
      // raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  renderTaskProceedingsArea = function (parentID) {
    if (!_prcStateOptions.StateHasTask) {
      return;
    }

    if (_prcStateOptions.TaskHasServics > 0) {
      $(parentID).append(
        '<div class="form-group ">' +
          '<label>خدمات انجام شده</label><div class="input-group">' +
          '<div class="input-group-addon"><span class="glyphicon glyphicon-check"></span></div>' +
          '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="task-services"></select></div>' +
          "</div>"
      );
    }

    if (_prcStateOptions.TaskHasReport > 0) {
      $(parentID).append(
        '<div class="form-group">' +
          '<label>توضیحات</label><div class="input-group">' +
          '<div class="input-group-addon"><span class="glyphicon glyphicon-edit"></span></div>' +
          '<textarea class="form-control form-input noDrop" ondragover="allowDrop(event)" id="task-report" rows="5"></textarea></div>' +
          "</div>"
      );
    }

    if (_prcStateOptions.TaskHasSpentTime > 0) {
      $(parentID).append(
        '<div class="form-group"><label>زمان صرف شده</label>' +
          '<div class="row">' +
          '<div class="col-md-2" class="form-time-label">' +
          '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="task-spent-day"></select></div>' +
          '<div class="col-md-1 form-time-box">&nbsp;&nbsp; روز </div>' +
          '<div class="col-md-2 form-time-label">' +
          '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="task-spent-hour"></select></div>' +
          '<div class="col-md-2 form-time-box">&nbsp;&nbsp; ساعت </div>' +
          '<div class="col-md-2 form-time-label">' +
          '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="task-spent-minute"></select></div>' +
          '<div class="col-md-1 form-time-box">&nbsp;&nbsp; دقیقه </div>' +
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
      '<div class="form-group"><label>وضعیت جدید</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-check"></span></div><select id="process-final-actions" class="form-control form-input noDrop" ondragover="allowDrop(event)"></select></div></div>'
    );

    var content = '<div class="form-group">';

    content +=
      '<div class="row" id="refer-area-1"><div class="col-md-1" class="form-taskrefer-setp">&nbsp;گام 1&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-1" id="taskrefer-label-group-1" class="form-taskrefer-label">تیم&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-group-1" class="form-taskrefer-box">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="refer-group-1"></select></div>' +
      '<div class="col-md-2" id="taskrefer-label-user-1" class="form-taskrefer-label">&nbsp;&nbsp;کارشناس&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-user-1" class="form-taskrefer-box">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="refer-user-1"></select></div>' +
      "<br /> " +
      "</div>";

    content +=
      '<div class="row" id="refer-area-2"><div class="col-md-2" class="form-taskrefer-setp">&nbsp;گام 2&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" id="taskrefer-label-group-2" class="form-taskrefer-label">تیم&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-group-2" class="form-taskrefer-box">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="refer-group-2"></select></div>' +
      '<div class="col-md-2" id="taskrefer-label-user-2" class="form-taskrefer-label">&nbsp;&nbsp;کارشناس&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-user-2" class="form-taskrefer-box">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="refer-user-2"></select></div>' +
      "<br /> " +
      "</div>";

    content +=
      '<div class="row" id="refer-area-3"><div class="col-md-3" class="form-taskrefer-setp">&nbsp;گام 3&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" id="taskrefer-label-group-3" class="form-taskrefer-label">تیم&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-group-3" class="form-taskrefer-box">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="refer-group-3"></select></div>' +
      '<div class="col-md-2" id="taskrefer-label-user-3" class="form-taskrefer-label">&nbsp;&nbsp;کارشناس&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-user-3" class="form-taskrefer-box">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="refer-user-3"></select></div>' +
      "<br /> " +
      "</div>";

    content +=
      '<div class="row" id="refer-area-4"><div class="col-md-4" class="form-taskrefer-setp">&nbsp;گام 4&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" id="taskrefer-label-group-4" class="form-taskrefer-label">تیم&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-group-4" class="form-taskrefer-box">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="refer-group-4"></select></div>' +
      '<div class="col-md-2" id="taskrefer-label-user-4" class="form-taskrefer-label">&nbsp;&nbsp;کارشناس&nbsp;&nbsp;</div>' +
      '<div class="col-md-4" id="taskrefer-box-user-4" class="form-taskrefer-box">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="refer-user-4"></select></div>' +
      "<br /> " +
      "</div>";

    content +=
      '<div class="row" id="refer-area-5"><div class="col-md-5" class="form-taskrefer-setp">&nbsp;ارجاع گیرنده&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" id="taskrefer-label-user-5" class="form-taskrefer-label">&nbsp;&nbsp;کاربر&nbsp;&nbsp;</div>' +
      '<div class="col-md-5" id="taskrefer-box-user-5" class="form-taskrefer-box">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="refer-user-5"></select></div>' +
      "<br /> " +
      "</div>";

    content += "</div>";

    $(parentID).append(content);

    $(parentID).append(
      '<div class="form-group" id="sla-type-area"><label>تعیین SLA</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-check"></span></div><select id="process-slas" class="form-control form-input noDrop"></select></div></div>'
    );

    content = '<div class="form-group">';

    content +=
      '<div class="row" id="sla-area-1"><div class="col-md-2" class="form-sla-setp">&nbsp;مهلت مراجعه&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="sla-start-day"></select></div>' +
      '<div class="col-md-1" class="form-time-box">&nbsp;&nbsp; روز </div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="sla-start-hour"></select></div>' +
      '<div class="col-md-2" class="form-time-box">&nbsp;&nbsp; ساعت </div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="sla-start-minute"></select></div>' +
      '<div class="col-md-1"  class="form-time-box">&nbsp;&nbsp; دقیقه </div>' +
      "</div><br />";

    content +=
      '<div class="row" id="sla-area-2"><div class="col-md-2" class="form-sla-setp">&nbsp;مهلت انجام&nbsp;<span class="fa fa-caret-left"></span></div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="sla-resolve-day"></select></div>' +
      '<div class="col-md-1" class="form-time-box">&nbsp;&nbsp; روز </div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="sla-resolve-hour"></select></div>' +
      '<div class="col-md-2" class="form-time-box">&nbsp;&nbsp; ساعت </div>' +
      '<div class="col-md-2" class="form-time-label">' +
      '<select class="form-control form-input noDrop" ondragover="allowDrop(event)" id="sla-resolve-minute"></select></div>' +
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

  function renderTextArea(itemObj, parentID) {
    try {
      var placeholder = "";

      //   if (!jQuery.parseJSON(itemObj.IsRequired) && _reportID == null) {
      //     placeholder = localize("اختیاری");
      //   }

      var itemContent =
        '<div class="form-group noDrop" ondragover="allowDrop(event)"  style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        'draggable="true" ondragstart="drag(event)"' +
        '" id="form-group-' +
        itemObj.FormItemID +
        '"><label for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div class="input-group" ><div class="input-group-addon"><span class="glyphicon glyphicon-edit"></span></div><textarea class="form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-' +
        itemObj.FormItemID +
        '"  onclick="TextboxProp(id)" placeholder="' +
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
      // raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  function renderSignatureBox(itemObj, parentID) {
    try {
      var placeholder = "";

      //   if (itemObj.IsRequired) {
      //     placeholder = localize("اختیاری");
      //   }

      var itemContent =
        '<div class="form-group noDrop" ondragover="allowDrop(event)"  style="' +
        (itemObj.Visibility == "DefaultHidden" ? "display:none" : "") +
        '" id="form-group-' +
        'draggable="true" ondragstart="drag(event)"' +
        itemObj.FormItemID +
        '"><label class="noDrop" for="form-item-' +
        itemObj.FormItemID +
        '">' +
        itemObj.Label +
        '</label><div class="input-group"><div class="input-group-addon"><span class="glyphicon glyphicon-pencil"></span></div><div class="form-control form-input noDrop" ondragover="allowDrop(event)" id="form-item-' +
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
      // raiseError(e, "#form-group-" + itemObj.FormItemID);

      return;
    }
  }

  function getDefaultValue(itemObj) {
    var defaultValue = itemObj.DefaultValue;

    // if (_data) {
    //   if (itemObj.DataName.indexOf("Setting") == -1) {
    //     defaultValue = _data[itemObj.DataName];
    //   } else {
    //     defaultValue = _data[itemObj.Name];
    //   }
    // }

    // if (defaultValue == "") {
    //   if (
    //     itemObj.Name == _parObjType ||
    //     itemObj.Name == "Parent_" + _parObjType
    //   ) {
    //     defaultValue = JSON.stringify(_parObjKey);

    //     //Sepad Compatibility
    //     if (_parObjType == "CallID") {
    //       defaultValue = JSON.stringify(_objKeys[0]);
    //     }

    //     defaultValue = jQuery.parseJSON(defaultValue);
    //   }
    // }

    // if (
    //   itemObj.AttributeTypeName == "ShortTime" &&
    //   defaultValue === undefined
    // ) {
    //   defaultValue = "00:00";
    // }

    // if (defaultValue == null) return "";

    // if (!isNaN(defaultValue)) {
    //   defaultValue = defaultValue.toString();
    // }

    // defaultValue = defaultValue.trim();

    // $$PageParams[itemObj.Name] = defaultValue;

    // if (itemObj.AttributeTypeName == "LongTime" && defaultValue == "") {
    //   defaultValue = "000:00";
    // }

    return htmlDecode(defaultValue);
  }

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

// function localize(value) {
//   if ($$Lang != "Fa") {
//     //En, Ar, ...

//     switch (value) {
//       case "اختیاری":
//         return "Optional";
//     }
//   }

//   return value;
// }

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

function radioButtonList(enumTypeID) {
  var _enumTypeID = enumTypeID;

  var _enumList;

  // this.renderContext = function (itemID, defaultValue) {
  //   $.ajax({
  //     url: "../App_Sys/Services/Action.asmx/GetEnumData",

  //     contentType: "application/json; charset=utf-8",

  //     type: "POST",

  //     dataType: "json",

  //     data:
  //       '{"id":"' +
  //       _enumTypeID +
  //       '","responseToken":"' +
  //       genResponseKey() +
  //       '"}',

  //     async: false,

  //     error: function (jqXHR, textStatus, errorThrown) {
  //       alert("Operation error \n\r " + errorThrown);
  //     },

  //     success: function (data) {
  //       data = data.d;

  //       if (data[0].errorCode) {
  //         alert(
  //           "Operation error \n\r " +
  //             data[0].errorMessage.replace("<br/>", "\n\r")
  //         );
  //       }

  //       setRequestToken(data[data.length - 1].requestToken);

  //       data.pop();

  //       _enumList = data;
  //     },
  //   });

  //   var content = "";

  $.each(_enumList, function (index, enumItem) {
    var defaultState = "";

    if (enumItem.value == defaultValue) {
      defaultState = "checked";
    }

    content +=
      '<label class="radio-inline noDrop" style="padding-right: 0px;"><input type="radio" class="noDrop" ondragover="allowDrop(event)" value="' +
      enumItem.value +
      '" name="optionsRadios-' +
      itemID +
      '" ' +
      defaultState +
      ">&nbsp;" +
      enumItem.label +
      "</label>";
  });

  return content;
  // };
}
