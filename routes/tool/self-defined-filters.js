module.exports = (swig) => {
    let dateFormat = (data, format) => {
        let date = typeof data == 'string' ? data * 1 : data;
        date = new Date(date);
        let map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };

        format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
            let v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    };
    let toWeek = (data) => {
        let date = typeof data == 'string' ? data * 1 : data;
        date = new Date(date);
        let map = {
            "1": "周一",
            "2": "周二",
            "3": "周三",
            "4": "周四",
            "5": "周五",
            "6": "周六",
            "0": "周日",
        }
        return map[date.getDay().toString()];
    };

    let scopeFilter = (scope) => {
        let baseScope = scope,
            len = 0,
            list = [],
            str = "",
            elen = 0;
        if (baseScope > 10) {
            baseScope = 10;
        }
        len = parseInt(baseScope / 2);
        elen = baseScope % 2;
        for (let i = 0; i < len; i++) {
            list.push('<i class="am-icon-star"></i>');
        }
        for (let i = 0; i < 5 - len; i++) {
            list.push('<i class="am-icon-star-o"></i>');
        }
        // if (elen >= 1) {
        //     list.push('<i class="am-icon-star-half-full"></i>');
        // }
        str = list.join("&nbsp;");
        return str;
    }
    swig.setFilter("dateFormat", dateFormat);
    swig.setFilter("toWeek", toWeek);
    swig.setFilter("scopeFilter", scopeFilter);
}
