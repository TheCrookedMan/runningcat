import rest from '../rest/_util';

/*区域列表获取*/
exports.getAreaList = (req, res, next) => {
    new rest({
        functionCode: 'area.getAreaList',
    }).post(req, res, next);
}

/*根据parentCode查找基础数据*/
exports.getSysDictionary = (req, res, next) => {
    new rest({
        functionCode: 'sysDictionary.getSysDictionary',
    }).post(req, res, next);
}
