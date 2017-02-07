'use strict';

var app = require('koa')(),
    router = require('koa-router')(),
    bodyParser = require('koa-bodyparser')(),
    Common = require("./Utils/Common").default,
    ENV_PORT = 3002;

app.use(bodyParser());

router.get('/', function *(next) {
    let content = yield Common.readFileThunk("./index.html");
    this.body = content;
});

router.post('/upload', function *(next) {
    console.log("UPLOAD HERE", this.body.request);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(ENV_PORT);