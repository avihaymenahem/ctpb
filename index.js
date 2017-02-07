'use strict';

var app = require('koa')(),
    path = require("path"),
    router = require('koa-router')(),
    nodemailer = require('nodemailer'),
    koaBody = require('koa-body')({ multipart: true,
        formidable: {
            uploadDir: path.join(__dirname, './uploads'),
            keepExtensions : true,
            onFileBegin: (name, file) => {
                file.path = "./uploads/" + file.name;
            }
        } }),
    bodyParser = require('koa-bodyparser'),
    cors = require('koa-cors'),
    Common = require("./Utils/Common").default,
    ENV_PORT = 3002;

let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodemailerrpi@gmail.com',
            pass: '203788583Avm'
        }
    });

app.use(cors());
app.use(bodyParser());

router.get('/', function *(next) {
    //let content = yield Common.readFileThunk("./index.html");
    let content = yield Common.readFileThunkHttp("http://localhost:3666");
    this.body = content;
});

router.post('/upload', koaBody, function *(next) {

    let mailOptions = {
        from: '"Your RPI" <nodemailerrpi@gmail.com>', // sender address
        to: 'avihay@three-dev.com', // list of receivers
        subject: 'RPI Public IP Address', // Subject line
        text: 'Clicktale photo booth image', // plain text body
        attachments: [{   // file on disk as an attachment
            path: './uploads/webcam.jpg' // stream this file
        }]
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("File uploaded");
    });
    this.body = "ok";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(ENV_PORT);
