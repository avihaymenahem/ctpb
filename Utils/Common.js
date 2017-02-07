"use strict";
var request = require("request");
var fs = require('fs');
var Common = (function () {
    function Common() {
    }
    Common.readFileThunk = function (src) {
        return new Promise(function (resolve, reject) {
            fs.readFile(src, { 'encoding': 'utf8' }, function (err, data) {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    };
    Common.readFileThunkHttp = function (url) {
        return new Promise(function (resolve, reject) {
            request.defaults({
                headers: {
                    'expires': '-1'
                }
            });
            request({ method: 'GET', uri: url }, function (error, response, body) {
                resolve(body);
            });
        });
    };
    return Common;
}());
exports.__esModule = true;
exports["default"] = Common;
//# sourceMappingURL=Common.js.map