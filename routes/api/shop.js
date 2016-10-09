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

/*首页关键字搜索店铺列表*/
exports.queryIndexStoreList = (req, res, next) => {
    new rest({
        functionCode: 'store.queryIndexStoreList',
    }).link(req, res, next);
}

/* 根据租户ID获取 */
exports.selectComPayAccount = (req, res, next) => {
    new rest({
        functionCode: 'comPayAccount.selectComPayAccount',
    }).post(req, res, next);
}

/* 查询店铺入学协议、店铺制度 */
exports.getInfo = (req, res, next) => {
    new rest({
        functionCode: 'copAdditionalInfo.getInfo',
    }).post(req, res, next);

}
