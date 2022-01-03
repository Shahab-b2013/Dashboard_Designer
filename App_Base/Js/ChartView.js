////JScript File(Amnpardaz Software Co. Copyright 2021 - All Right Reserved)
////Release Ferdos.WebAppDesk 2.5.3.0

var _GeneralOptions = {

    type: '',

    fontFamily: 'IRANSansWeb',

    height: 355,

    marginRight: 100,

    polar: false,

    options3d: {

        enabled: true,

        alpha: 30,

        beta: 0
    },
};

var _XAxisOptions = {

    type: 'category',
    categories: '',
    ////labels: {

    ////    rotation: 0,

    ////    y: 5,

    ////    x: -3,

    ////    useHTML: true,

    ////    step: 1,

    ////    formatter: function () {

    ////        return this.value;
    ////    },

    ////    style: {

    ////        fontSize: '12px',

    ////        fontFamily: 'IRANSansWeb',

    ////        color: '#333',

    ////        textOverflow: 'none',

    ////        whiteSpace: 'nowrap',

    ////        fontWeight: 'Bold'
    ////    }
    ////},

    title: {

       text: '',

       style: {

           fontSize: '13px',

           fontFamily: 'IRANSansWeb',

           color: '#154360'
       }
    }
};

var _ExportingOptions = {

    allowHTML: true,

    buttons: {

        contextButton: {

            align: 'right',

            enabled: false,

            height: 20,

            onclick: null,

            symbol: 'menu',

            symbolFill: '#A8BF77',

            symbolSize: 14,

            symbolStroke: '#666',

            symbolStrokeWidth: 1,

            symbolX: 12.5,

            symbolY: 10.5,

            text: null,

            verticalAlign: 'top',

            width: 24,

            x: -10,

            y: 0,

            menuItems: [{ textKey: "printChart", onclick: function () { this.print() } }]
        }
    },

    chartOptions: null,

    enabled: true,

    filename: 'chart',

    printMaxWidth: 780,

    scale: 2,

    sourceWidth: null,

    sourceHeight: null,

    type: 'image/png',

    width: null,
};

var _YAxisOptions = {

    min: 0,
    allowDecimals: false,

    title: {

        text: '',

        style: {

            fontSize: '13px',

            fontFamily: 'IRANSansWeb',

            color: '#154360'
        }
    },
};


var _PiePlotOptions = {

    allowPointSelect: true,

    cursor: 'pointer',

    depth: 35,

    dataLabels: {

        enabled: true,

        rotation: 0,

        distance: -30,

        color: '#ffffff',

        align: 'center',

        useHTML: true,

        crop: false,

        formatter: function () {

            if (this.point.percentage > 7)
                return this.point.percentage.toFixed(0) + ' %';
            else
                return '';
        },

        style: {
            fontSize: '13px',

            fontFamily: 'IRANSansWeb'
        },

        allowPointSelect: true,

        cursor: 'pointer',

        showInLegend: false,

        connectorWidth: 0,

        inside: true
    },
    innerSize: 150,
    showInLegend: true,

    center: ['30%', '40%']
};

var _ColorsOptions = ['#BA4A00', '#B7950B', '#48C9B0', '#276678', '#1687a7'];

var _CreditsOptions = {

    enabled: false
};

var _SeriesPlotOptions = {

    color: '',

    cursor: 'pointer',

    label: {
        connectorAllowed: true
    },
    pointStart: 0,
};




var _AreaPlotOptions = {

    dataLabels: {

        enabled: true,

        rotation: 0,

        color: '#FFFFFF',

        align: 'right',

        y: 10,

        x: 15,

        style: {
            fontSize: '13px',

            fontFamily: 'IRANSansWeb'
        }
    }
    
};


var _ColumnPlotOptions = {

    color: '#154360',

    dataLabels: {

        enabled: true,

        rotation: 0,

        color: '#ffffff',

        align: 'center',

        useHTML: true,

        format: '{y}',

        crop: false,

        inside: true,

        style: {
            fontSize: '13px',

            fontFamily: 'IRANSansWeb'
        }
    }
};

var _LinePlotOptions = {

    dataLabels: {

        enabled: true,

        rotation: 0,

        color: '#FFFFFF',

        align: 'right',

        y: 10,

        x: 15,

        style: {
            fontSize: '13px',

            fontFamily: 'IRANSansWeb'
        }
    },
    enableMouseTracking: true
};

var _DrillDownsOptions = null;

var _LabelsOptions = null;

var _LoadingOptions = null;

var _LegendOptions = {

    enabled: true,

    symbolRadius: 6,

    symbolWidth: 12,

    useHTML: true,

    x: -20,

    layout: 'vertical',

    align: 'right',

    verticalAlign: 'middle',

    labelFormatter: function () {
        return this.name + (this.percentage != undefined ? ' ( ' + this.percentage.toFixed(0) + '%)' : '');
    },
};

var _NoDataOptions = null;

var _TitleOptions = {

    text: '',

    useHTML: true,

    style: {

        fontSize: '14px',

        fontFamily: 'IRANSansWeb',

        color: '#154360',

        fontWeight: 'Bold'
    }
};
var _BarPlotOptions = {

    dataLabels: {

        enabled: true,

        rotation: 0,

        color: '#ffffff',

        align: 'right',

        x: 0,

        y: 2,

        style: {
            fontSize: '13px',

            fontFamily: 'IRANSansWeb'
        }
    }
};

var _SubtitleOptions = null;

var _TooltipOptions = {

    formatter: function () {

        return '<div align="top"><b>' + (this.x ??= this.point.name) + '<br> <span style="font-size:11px">' +
            this.series.name + ': ' + this.y + '</span></b></div> ';
    },

    useHTML: true,

    backgroundColor: '#FCFFC5',

    outside: false,

    style: {

        fontFamily: 'IRANSansWeb'
    },

    positioner: function (labelWidth, labelHeight, point) {

        var tooltipX = point.plotX;

        var tooltipY = point.plotY;

        return {
            x: tooltipX,

            y: tooltipY
        };
    }
};

// var _LangOptions = {

//     contextButtonTitle: 'Tools',

//     decimalPoint: '.',

//     downloadJPEG: ($$Lang == 'Fa' ? 'دانلود JPEG' : 'Download JPEG'),

//     downloadPDF: ($$Lang == 'Fa' ? 'دانلود PDF' : 'Download PDF'),

//     downloadPNG: ($$Lang == 'Fa' ? 'دانلود PNG' : 'Download PNG'),

//     downloadSVG: ($$Lang == 'Fa' ? 'دانلود SVG' : 'Download SVG'),

//     drillUpText: ($$Lang == 'Fa' ? 'برگشت به { series.name }' : 'return to { series.name }'),

//     invalidDate: '',

//     loading: ($$Lang == 'Fa' ? 'در حال بارگذاری...' : 'loading...'),

//     months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],

//     weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],

//     numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],

//     printChart: ($$Lang == 'Fa' ? 'چاپ خروجی' : 'Print output'),

//     resetZoom: 'Reset zoom',

//     resetZoomTitle: 'Reset zoom level 1:1',

//     shortMonths: "[ 'Jan' , 'Feb' , 'Mar' , 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec']",

//     shortWeekdays: null,

//     thousandsSep: ' ',

//     weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
// };




var $$ChartStyleOptionsIsLoad = false;

function chartView(id, objKey) {

    var _actContextID = id;

    var _objKey = objKey;

    var _chartOptions;

    var _series;

    var _advancedSearch = [];

    var _objKey = objKey;

    var _data;

    var _chart;

    var chart;

    var seriesOptions;

    var seriesExps;

    this.renderContext = function (pageElementID) {

        var bodyID = '#box-body-' + pageElementID;

        var boxID = '#page-box-' + pageElementID;

        //#region Load Chart Metadata

        cache = localStorage.getItem(window.btoa("chart$" + _actContextID));

        if (!cache) {

            _chart = new iComData('chart', _actContextID, null, null);

            _chart = _chart.getData();

            localStorage.setItem(window.btoa("chart$" + _actContextID), reverse(encodeURI(JSON.stringify(_chart))));
        } else {

            _chart = jQuery.parseJSON(decodeURI(reverse(cache)));
        }

        _chartOptions = _chart.options;

        if ($(boxID + ' .box-title').length) {

            $(boxID + ' .box-title').html(_chartOptions.Label);
        }

        _series = _chart.series;

        //#endregion

        //#region Load Chart Data

        seriesOptions = new Object();

        seriesOptions.Type = _chartOptions.SeriesType;

        seriesOptions.GroupingExpression = _chartOptions.GroupingExpression;

        seriesOptions.TimePrioiedType = _chartOptions.TimePrioiedType;

        seriesOptions.TimePrioiedStart = _chartOptions.TimePrioiedStart;

        seriesOptions.TimePrioiedDuration = _chartOptions.TimePrioiedDuration;

        seriesExps = [];

        $.each(_series, function (index, series) {

            seriesExps.push(series.DataExpression);

            if (series.PlotType == null)
                series.PlotType = _chartOptions.ChartType;
        });

        //#endregion

        //#region Render Chart

        $(bodyID).html('<div style="border: 1px solid #cfcdcd;padding:10px;border-radius: 20px; height: 375px;" id="chart-' + _chartOptions.ChartID + '"></div>');

        _GeneralOptions.type = _chartOptions.ChartType;

        if (_GeneralOptions.type == "table") {

            $('#chart-' + _chartOptions.ChartID).html('<p style="width: 100%;text-align:center;color:#154360"><b>' + _chartOptions.Title + '</b></p>');

            $$Intervals.push(setTimeout("$$Charts[" + ($$Charts.length - 1) + "].load(" + ($$Charts.length - 1) + ", true)", 500));

            return;
        }

        if (_GeneralOptions.type == "polar") {

            _GeneralOptions.polar = true;
        }
        else {
            _GeneralOptions.polar = false;
        }

        if (_GeneralOptions.type == "bar" || _GeneralOptions.type == "polar") {

            _XAxisOptions.labels.rotation = 0;
        }
        else {

            _XAxisOptions.labels.rotation = -45;
        }

        if (_GeneralOptions.type == "pie") {

            _GeneralOptions.options3d.enabled = true;
        }
        else {
            _GeneralOptions.options3d.enabled = false;
        }

        if (seriesOptions.Type == "Simple" || seriesOptions.Type == "Stack") {

            if (_GeneralOptions.type == "pie")
                _LegendOptions.enabled = true;
            else
                _LegendOptions.enabled = false;
        }
        else {
            _LegendOptions.enabled = true;
        }

        if (seriesOptions.Type == "Stack") {

            _ColumnPlotOptions.dataLabels.formatter = function () {
                return this.point.percentage.toFixed(0) + '%';
            };

            _ColumnPlotOptions.dataLabels.format = '';

            _ColumnPlotOptions.stacking = 'percent';
        }
        else {
            _ColumnPlotOptions.dataLabels.format = '{y}';

            _ColumnPlotOptions.stacking = '';
        }

        chart = Highcharts.chart('chart-' + _chartOptions.ChartID, {

            chart: _GeneralOptions,

            colors: _ColorsOptions,

            credits: _CreditsOptions,

            exporting: _ExportingOptions,

            legend: _LegendOptions,

            title: _TitleOptions,

            tooltip: _TooltipOptions,

            xAxis: _XAxisOptions,

            yAxis: _YAxisOptions,

            lang: _LangOptions,

            plotOptions: {

                series: _SeriesPlotOptions,

                areaspline: _AreaPlotOptions,

                bar: _BarPlotOptions,

                column: _ColumnPlotOptions,

                line: _LinePlotOptions,

                pie: _PiePlotOptions
            }
        });

        chart.xAxis[0].setTitle({
            text: _chartOptions.CategoryLabel
        });

        chart.yAxis[0].setTitle({
            text: _chartOptions.ValueLabel
        });

        chart.setTitle({ text: _chartOptions.Title });

        chart.setTitle(null, {
            text: _chartOptions.SubTitle
        });

        _event = _chartOptions.Title;

        $$Intervals.push(setTimeout("$$Charts[" + ($$Charts.length - 1) + "].load(" + ($$Charts.length - 1) + ")", 100));

        //#endregion
    }

    $$Charts.push(this);

    this.load = function (chartIndex, isNew) {

        _data = new aDataVisualization(_chartOptions.ActivityID, seriesOptions, _chartOptions.CategoryExpression, seriesExps, _advancedSearch, _objKey);

        _data = _data.getList();

        if (_chartOptions.ChartType == "table") {

            if (isNew) {
                var $detailListView = new detailListView(_chartOptions.ActivityID, [0]);

                $detailListView.renderContext(0, _chartOptions.ChartID);
            }
            else {
                $('#datatable-' + _chartOptions.ChartID).DataTable().ajax.reload(null, false);
            }

            $$Intervals.push(setTimeout("$$Charts[" + chartIndex + "].load(" + chartIndex + ", false)", 60 * 1000));

            return;
        }

        try {
            chart.xAxis[0].categories = _data.categories;
        }
        catch {
            return;
        }

        var len = chart.series.length;

        for (i = 0; i < len; i++) {

            chart.series[0].remove();
        }

        if (_chartOptions.ChartType == "pie") {

            var piedata = new Array();

            $.each(_data.series[0].data, function (index, item) {

                switch (item.name) {
                    case 'Unmanaged': item.color = '#C0392B'; break;
                    case 'Managed': item.color = '#148F77'; break;
                    case 'OK': item.color = '#148F77'; break;
                    case 'Warning': item.color = '#F4D03F'; break;
                    case 'Critical': item.color = '#C0392B'; break;
                    case 'Today': item.color = '#148F77'; break;
                    case '1 to 3 Days ago': item.color = '#CDDC39'; break;
                    case '4 to 7 Days ago': item.color = '#F4D03F'; break;
                    case 'More than 1 Week': item.color = '#C0392B'; break;
                    default: item.color = '';
                }

                piedata.push(item);
            });

            _data.series[0].data = piedata;
        }

        if (seriesOptions.Type == "Simple" || seriesOptions.Type == "Composite") {

            $.each(_series, function (index, series) {

                chart.addSeries({
                    data: _data.series[index].data,
                    color: series.StyleColor,
                    name: series.Label,
                    type: series.PlotType,
                    innerSize: '50%',
                    events: {

                        click: function (event) {

                            var inlineFunction = new Function(series.ActionOnClick);

                            inlineFunction();
                        }
                    }
                })

            });
        }

        if (seriesOptions.Type == "Stack") {

            $.each(_series, function (index, series) {

                chart.addSeries({
                    data: _data.series[index].data,
                    color: series.StyleColor,
                    name: series.Label,
                    type: series.PlotType,
                    innerSize: '50%',
                    events: {

                        click: function (event) {

                            var inlineFunction = new Function(series.ActionOnClick);

                            inlineFunction();
                        }
                    },
                    dataLabels: {
                        enabled: index < _series.length - 1 ? false : true
                    }
                });
            });
        }

        if (seriesOptions.Type == "ColumnGroup" || seriesOptions.Type == "TimePrioied") {

            $.each(_data.series, function (index, series) {

                chart.addSeries({
                    data: series.data,
                    color: '',
                    name: series.name,
                    type: _chartOptions.ChartType,
                    innerSize: '50%',
                    events: {

                        click: function (event) {

                            var inlineFunction = new Function(series.ActionOnClick);

                            inlineFunction();
                        }
                    }
                })

            });
        }

        $$Intervals.push(setTimeout("$$Charts[" + chartIndex + "].load(" + chartIndex + ")", 60 * 1000));
    }
}