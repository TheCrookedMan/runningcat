(function($, undefined) {
    var uploadImage = function(selector,options) {
        var self=this;
        this.url = options.url;
        this.isShowLoading = false;
        selector.on('change', function() {
            var oFReader = new FileReader();
            var that = this;
            self.init(this.files[0], function(file, data, resp) {
                options.callback && options.callback(file, data, resp);
            });
        });
    }
    uploadImage.prototype = {
        init: function(file, callback) {
            var formData, handleError, input, inputElement, inputName, progressObj, xhr, _i, _len, _ref, _ref1,
                _this = this;

            /*
                file.size 获取到的数值单位是 字节(B)；
                这里把转换为 兆(M);
                大于 1M 的图片显示 loading...
             */
            var fileSize = file.size/1024/1024;
            if(fileSize >= 1){
                _this.isShowLoading = true;
            } else {
                _this.isShowLoading = false;
            }
            xhr = new XMLHttpRequest();
            formData = new FormData();
            formData.append("file", file, file.name);
            xhr.open("POST", this.url, true);
            handleError = function() {
                _this.isShowLoading && modal.loading('close');
                throw new Error(file, xhr.responseText || ("Server responded with " + xhr.status + " code."));
            };
            xhr.onload = function(e) {
                var response;
                _this.isShowLoading && modal.loading('close');
                if (xhr.status !== 200) {
                    return handleError();
                } else {
                    response = xhr.responseText;
                    if (~xhr.getResponseHeader("content-type").indexOf("application/json")) {
                        response = JSON.parse(response);
                    }
                    return callback(file, response, e);
                }
            };
            xhr.onerror = function() {
                return handleError();
            };
            progressObj = (_ref1 = xhr.upload) != null ? _ref1 : xhr;
            progressObj.onprogress = function(e) {
                // return _this.emit("uploadprogress", file, Math.max(0, Math.min(100, (e.loaded / e.total) * 100)));
            };
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Cache-Control", "no-cache");
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            xhr.setRequestHeader("X-File-Name", file.name);
            _this.isShowLoading && modal.loading('open');
            return xhr.send(formData);
        }
    }
    $.fn.uploadImage = function(options){
        var opts = $.extend(options);
        if (!opts.url) {
            throw new Error("url为必填参数！");
            return false;
        }
        new uploadImage(this,opts);
    }
})(jQuery);
