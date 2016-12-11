(function() {
    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    option = null;


    var now = new Date();
    var month = now.getMonth() + 1;
    month = month > 9 ? month : "0" + month;
    now = [now.getFullYear(), month].join('-');

    function init(date) {
        $("#changeDate").val(date);
        $("#changeDate").mobiscroll().date({
            dateFormat: 'yy-mm',
            lang: 'zh',
            maxDate: new Date(),
            onBeforeShow: function(inst) {
                inst.settings.wheels[0].length > 2 ? inst.settings.wheels[0].pop() : null;
            },
            headerText: function(valueText) {
                array = valueText.split('-');
                return array[0] + "年" + array[1] + "月";
            },
            onSelect: function(value) {
                queryUserHeartrate(value);
            }
        });
        queryUserHeartrate(date);
    }
    init(now);

    function queryUserHeartrate(date) {
        myChart.showLoading();
        $.post('/userCenter/queryUserFuel', { memberId: userInfo.memberId, month: date })
            .success(function(data) {
                myChart.hideLoading();
                if (data.code == "0000" && data.success) {
                    var record = data.data;
                    var list = [];
                    $.each(record, function(i, I) {
                        var obj = {};
                        obj['date'] = common.formatDate(I.createTime, 'yyyy-MM-dd');
                        obj['fuel'] = I.fuel;
                        list.push(obj);
                    })
                    initHolopoint(list);
                }
            });
        // data = getFakeData(date);
        // initHolopoint(data);
    }

    function initHolopoint(data) {
        myChart.setOption(option = {
            title: {
                text: '',
                subtext: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                },
                formatter: function(params) {
                    return params[2].name + '<br />' + params[2].value;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                top: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: data.map(function(item) {
                    return item.date;
                }),
                axisLabel: {
                    formatter: function(value, idx) {
                        if (value === void 0) {
                            return ""
                        }
                        var date = new Date(value);
                        return [date.getMonth() + 1, date.getDate()].join('-')
                    }
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                min: 0,
                max: 2000
            },
            series: [{
                type: 'line',
                data: data.map(function(item) {
                    return item.fuel;
                }),
                hoverAnimation: false,
                symbolSize: 6,
                itemStyle: {
                    normal: {
                        color: '#c23531'
                    }
                },
                showSymbol: false
            }]
        });
    }

    // function getFakeData(date) {
    //     var data = [];
    //     var len = getDays(date);
    //     var dd = new Date(date);
    //     for (var i = 1; i <= len; i++) {
    //         var obj = {};
    //         dd.setDate(i);
    //         obj.date = [dd.getFullYear(), dd.getMonth() + 1, dd.getDate()].join('-');
    //         var number = Math.random() * 120 + 10;
    //         obj.heartRate = number;
    //         data.push(obj);
    //     }
    //     return data;
    // }

    // function getDays(date) {
    //     //构造当前日期对象
    //     var date = new Date(date);

    //     //获取年份
    //     var year = date.getFullYear();

    //     //获取当前月份
    //     var mouth = date.getMonth() + 1;

    //     //定义当月的天数；
    //     var days;

    //     //当月份为二月时，根据闰年还是非闰年判断天数
    //     if (mouth == 2) {
    //         days = year % 4 == 0 ? 29 : 28;

    //     } else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
    //         //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
    //         days = 31;
    //     } else {
    //         //其他月份，天数为：30.
    //         days = 30;

    //     }
    //     console.log(days);
    //     return days;
    // }

}).call(this)
