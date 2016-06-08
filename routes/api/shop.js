import rest from '../rest/_util';

/*查询常去店铺*/
exports.queryOftenStore = (req, res, next) => {
    new rest({
        functionCode: 'store.queryOftenStore',
    }).link(req, res, next);
}

/*查询店铺列表*/
exports.queryCopStoreList = (req, res, next) => {
    new rest({
        functionCode: 'store.queryCopStoreList',
    }).link(req, res, next);
}
