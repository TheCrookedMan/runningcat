function uploadImage(file, callback) {
    var formData, handleError, input, inputElement, inputName, progressObj, xhr, _i, _len, _ref, _ref1,
        _this = this;
    xhr = new XMLHttpRequest();
    formData = new FormData();
    formData.append("file", file, file.name);
    xhr.open("POST", "/upload/uploadImage", true);
    handleError = function() {
        throw new Error(file, xhr.responseText || ("Server responded with " + xhr.status + " code."));
    };
    xhr.onload = function(e) {
        var response;
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
    return xhr.send(formData);
}