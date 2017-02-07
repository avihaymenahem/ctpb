'use strict';

var app = require('koa')(),
    path = require("path"),
    router = require('koa-router')(),
    koaBody = require('koa-body')({ multipart: true,
        formidable: {
            uploadDir: path.join(__dirname, './uploads'),
            keepExtensions : true,
            onFileBegin: (name, file) => {
                //file.path = "./uploads/" + file.name;
            }
        } }),
    bodyParser = require('koa-bodyparser'),
    cors = require('koa-cors'),
    Common = require("./Utils/Common").default,
    ENV_PORT = 3002;

app.use(cors());
app.use(bodyParser());

router.get('/', function *(next) {
    //let content = yield Common.readFileThunk("./index.html");
    let content = yield Common.readFileThunkHttp("http://localhost:3666");
    this.body = content;
});

router.post('/upload', koaBody, function *(next) {
    //let slack = new Slack("");
    console.log("File uploaded");
    this.body = "ok";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(ENV_PORT);