(function() {
    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    option = null;

    var now = new Date();
    var month = now.getMonth() + 1;
    month = month.length > 1 ? month : "0" + month;
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
        // var data = getFakeData(date);
        // var datelist = getFakeDate(date);
        // initCalories(datelist,data);

        myChart.showLoading();
        $.post('/userCenter/queryUserCaLone', {
            memberId: userInfo.memberId,
            month: date
        }).success(function(data) {
            myChart.hideLoading();
            var record = data.data;
            var data = [];
            var datelist = [];
            $.each(record, function(i, I) {
                datelist.push(common.formatDate(I.createTime, 'yyyy-MM-dd'));
                data.push(I.calorie);
            })
            initCalories(datelist,data);
        });
    }

    function initCalories(date, data) {
        option = {
            tooltip: {
                trigger: 'axis',
                position: function(pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '',
            },
            legend: {
                top: 'bottom',
                data: ['意向']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                top: '5%',
                containLabel: true
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date,
                axisLabel: {
                    formatter: function(value, idx) {
                        if(value === void 0){
                            return ""
                        }
                        var date = new Date(value);
                        return [date.getMonth() + 1, date.getDate()].join('-')
                    }
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                min: 0,
                max: 140
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10
            }],
            series: [{
                name: '模拟数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    }
                },
                data: data
            }]
        };
        if (option && typeof option === "object") {
            var startTime = +new Date();
            myChart.setOption(option, true);
            var endTime = +new Date();
            var updateTime = endTime - startTime;
            console.log("Time used:", updateTime);
        }
    }

    // function getFakeDate(date) {
    //     var datelist = [];
    //     var len = getDays(date);
    //     var dd = new Date(date);
    //     for (var i = 1; i <= len; i++) {
    //         dd.setDate(i);
    //         datelist.push([dd.getFullYear(), dd.getMonth() + 1, dd.getDate()].join('-'));
    //     }
    //     return datelist;
    // }

    // function getFakeData(date) {
    //     var data = [];
    //     var len = getDays(date);
    //     var dd = new Date(date);
    //     for (var i = 1; i <= len; i++) {
    //         var number = Math.random() * 120 + 10;
    //         data.push(number);
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
