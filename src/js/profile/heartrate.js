(function() {
    $.post('/userCenter/queryUserHeartrate', {
        // memberId:userInfo.memberId,
        memberId: 1,
        month: '2016-05'
    }).success(function(data) {
        var record = data.data;
        initHeartrate(record);
    });

    function initHeartrate(data) {
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        var list = [];
        for(var i=0;i<data.length;i++){
        	var obj = data[i];
        	var createTime = obj.createTime;
        	
        	list.push({
        		name:common.formatDate(createTime,'yyyy-MM-dd'),
        		value:[obj.heartRate]
        	})
        }
        option = {
            title: {
                text: '动态数据 + 时间坐标轴'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    params = params[0];
                    var date = new Date(params.name);
                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 140,
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '模拟数据',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: list
            }]
        };

        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }


}).call(this)
