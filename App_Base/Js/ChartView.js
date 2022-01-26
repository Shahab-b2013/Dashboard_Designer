﻿////JScript File(Amnpardaz Software Co. Copyright 2021 - All Right Reserved)
////Release Ferdos.WebAppDesk 2.5.3.0

var _GeneralOptions = {
  type: "",

  fontFamily: "IRANSansWeb",

  height: 355,

  marginRight: 100,

  polar: false,

  options3d: {
    enabled: false,

    alpha: 30,

    beta: 0,
  },
};

var _XAxisOptions = {
  type: "category",
  categories: "",
 

  title: {
    text: "",

    style: {
      fontSize: "13px",

      fontFamily: "IRANSansWeb",

      color: "#154360",
    },
  },
};

var _ExportingOptions = {
  allowHTML: true,

  buttons: {
    contextButton: {
      align: "right",

      enabled: false,

      height: 20,

      onclick: null,

      symbol: "menu",

      symbolFill: "#A8BF77",

      symbolSize: 14,

      symbolStroke: "#666",

      symbolStrokeWidth: 1,

      symbolX: 12.5,

      symbolY: 10.5,

      text: null,

      verticalAlign: "top",

      width: 24,

      x: -10,

      y: 0,

      menuItems: [
        {
          textKey: "printChart",
          onclick: function () {
            this.print();
          },
        },
      ],
    },
  },

  chartOptions: null,

  enabled: true,

  filename: "chart",

  printMaxWidth: 780,

  scale: 2,

  sourceWidth: null,

  sourceHeight: null,

  type: "image/png",

  width: null,
};

var _YAxisOptions = {
  min: 0,
  allowDecimals: false,

  title: {
    text: "",

    style: {
      fontSize: "13px",

      fontFamily: "IRANSansWeb",

      color: "#154360",
    },
  },
};

var _PiePlotOptions = {
  allowPointSelect: true,

  cursor: "pointer",

  depth: 35,

  dataLabels: {
    enabled: true,

    rotation: 0,

    distance: -30,

    color: "#ffffff",

    align: "center",

    useHTML: true,

    crop: false,

    formatter: function () {
      if (this.point.percentage > 7)
        return this.point.percentage.toFixed(0) + " %";
      else return "";
    },

    style: {
      fontSize: "13px",

      fontFamily: "IRANSansWeb",
    },

    allowPointSelect: true,

    cursor: "pointer",

    showInLegend: false,

    connectorWidth: 0,

    inside: true,
  },
  innerSize: 150,
  showInLegend: true,

  center: ["30%", "40%"],
};

var _ColorsOptions = ["#BA4A00", "#B7950B", "#48C9B0", "#276678", "#1687a7"];

var _CreditsOptions = {
  enabled: false,
};

var _SeriesPlotOptions = {
  color: "",

  cursor: "pointer",

  label: {
    connectorAllowed: true,
  },
  pointStart: 0,
};

var _AreaPlotOptions = {
  dataLabels: {
    enabled: true,

    rotation: 0,

    color: "#FFFFFF",

    align: "right",

    y: 10,

    x: 15,

    style: {
      fontSize: "13px",

      fontFamily: "IRANSansWeb",
    },
  },
};

var _ColumnPlotOptions = {
  color: "#154360",

  dataLabels: {
    enabled: true,

    rotation: 0,

    color: "#ffffff",

    align: "center",

    useHTML: true,

    format: "{y}",

    crop: false,

    inside: true,

    style: {
      fontSize: "13px",

      fontFamily: "IRANSansWeb",
    },
  },
};

var _LinePlotOptions = {
  dataLabels: {
    enabled: true,

    rotation: 0,

    color: "#FFFFFF",

    align: "right",

    y: 10,

    x: 15,

    style: {
      fontSize: "13px",

      fontFamily: "IRANSansWeb",
    },
  },
  enableMouseTracking: true,
};

var _DrillDownsOptions = null;

var _LabelsOptions = null;

var _LoadingOptions = null;

var _LegendOptions = {
  enabled: false,

  symbolRadius: 6,

  symbolWidth: 12,

  useHTML: true,

  x: -20,

  layout: "vertical",

  align: "right",

  verticalAlign: "middle",

  labelFormatter: function () {
    return (
      this.name +
      (this.percentage != undefined
        ? " ( " + this.percentage.toFixed(0) + "%)"
        : "")
    );
  },
};

var _NoDataOptions = null;

var _TitleOptions = {
  text: "",

  useHTML: true,

  style: {
    fontSize: "14px",

    fontFamily: "var(--mainFont)",

    color: "#154360",

    fontWeight: "Bold",
  },
};
var _BarPlotOptions = {
  dataLabels: {
    enabled: true,

    rotation: 0,

    color: "#ffffff",

    align: "right",

    x: 0,

    y: 2,

    style: {
      fontSize: "13px",

      fontFamily: "IRANSansWeb",
    },
  },
};

var _SubtitleOptions = null;

var _TooltipOptions = {
  formatter: function () {
    return (
     '<span style="color:'+ this.series.color+'">'+this.series.name+': <b>'+this.y+'</b><br/>'
    );
  },

  useHTML: true,

  backgroundColor: "#FCFFC5",

  outside: false,

  style: {
    fontFamily: "IRANSansWeb",
  },

  positioner: function (labelWidth, labelHeight, point) {
    var tooltipX = point.plotX;

    var tooltipY = point.plotY;

    return {
      x: tooltipX,

      y: tooltipY,
    };
  },
};

