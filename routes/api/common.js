import rest from '../rest/_util';

/*区域列表获取*/
exports.getAreaList = (req, res, next) => {
    new rest({
        functionCode: 'area.getAreaList',
    }).post(req, res);
}