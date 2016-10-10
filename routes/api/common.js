import rest from '../rest/_util';
import upload from '../rest/upload';

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

exports.uploadImage = (req, res, next) => {
    new upload(req, res, next);
}

/*查询店铺课程类型列表——store.queryCourseTypeList*/
exports.queryCourseTypeList = (req, res, next) => {
    new rest({
        functionCode: 'store.queryCourseTypeList',
    }).post(req, res, next);
}

