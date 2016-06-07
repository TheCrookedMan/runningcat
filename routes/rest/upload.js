import fs from 'fs';
import formidable from 'formidable';
import http from 'http';
import config from './config';

const host = config.wechat.uploadHost;
const post = config.wechat.uploadPost;
const url = config.wechat.uploadUrl;

export default class uploadImage {
    constructor(req, res, next) {
        let form;
        form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            let $files, boundaryKey, content, contentBinary, contentLength, enddata, error, fileStream, i, options, p, postheaders, req, stat, success, _i, _len;
            boundaryKey = Math.random().toString(16);
            enddata = '\r\n----' + boundaryKey + '--';
            $files = new Array();
            content = "\r\n----" + boundaryKey + "\r\n" + "Content-Type: " + files.file.type + "\r\n" + "Content-Disposition: form-data; name=\"" + "file" + "\"; filename=\"" + files.file.name + "\"\r\n" + "Content-Transfer-Encoding: binary\r\n\r\n";
            contentBinary = new Buffer(content, 'utf-8');
            $files.push({
                contentBinary: contentBinary,
                filePath: files.file.path
            });
            contentLength = 0;
            for (p = _i = 0, _len = $files.length; _i < _len; p = ++_i) {
                i = $files[p];
                stat = fs.statSync(i.filePath);
                contentLength += i.contentBinary.length;
                contentLength += stat.size;
            }
            postheaders = options = {
                'host': host,
                'port': post,
                'path': url,
                'method': 'POST',
                'headers': postheaders
            };
            
            req = http.request(options, (res) => {
                res.on("data", (chunk) => {
                    success(chunk);
                });
            });
            req.setHeader("Content-Type", 'multipart/form-data; boundary=--' + boundaryKey);
            req.setHeader("Content-Length", contentLength + Buffer.byteLength(enddata));
            req.on('error', (e) => {
                return error(e);
            });
            req.write($files[0].contentBinary);
            fileStream = fs.createReadStream(files.file.path, {
                bufferSize: 4 * 1024
            });
            fileStream.pipe(req, {
                end: false
            });
            fileStream.on('end', () => {
                return req.end(enddata);
            });
            success = (d) => {
                var $json, $str;
                $str = d.toString();
                $json = JSON.parse($str);
                return res.status(200).send($json).end();
            };
            error = (d) => {
                next({
                    msg: d
                });
                // return res.status(500).send($json).end();
            };
        });
    }
}
