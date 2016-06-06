import rest from '../rest/_util';
/*
	特训营
 */

/*特训营列表*/
exports.till = (req, res, next) => {
    new rest({
        functionCode: 'specialClass.querySpecialClasses',
    }).link(req, res, next);
}

/*特训营详情*/
exports.tillDetail = (req, res, next) => {
    new rest({
        functionCode: 'specialClass.querySpecialClassInfo',
    }).post(req, res, next);
}
