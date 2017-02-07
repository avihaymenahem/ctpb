const request = require("request");
const fs = require('fs');

export default class Common {
    static readFileThunk(src) {
        return new Promise((resolve, reject) => {
            fs.readFile(src, { 'encoding': 'utf8' }, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }

    static readFileThunkHttp(url) {
        return new Promise((resolve, reject) => {
            request.defaults({
                headers: {
                    'expires': '-1'
                }
            });
            request({method: 'GET', uri: url}, function (error, response, body) {
                resolve(body);
            });
        });
    }
}