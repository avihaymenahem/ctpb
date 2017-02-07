"use strict";
var DomProvider_1 = require("./DomProvider");
var DomElements_1 = require("./Models/DomElements");
var Webcam = require("webcamjs");
var Application = (function () {
    function Application() {
        var self = this;
        self.initWebCamWrapper();
        self.initSnapshotButton();
        self.initClearButton();
    }
    Application.prototype.initWebCamWrapper = function () {
        var self = this, webcamWrapperElement = DomProvider_1["default"].getElement(DomElements_1["default"].CAMERA_PREVIEW_WRAPPER);
        Webcam.set({
            width: 425,
            height: 320
        });
        Webcam.attach(webcamWrapperElement);
    };
    Application.prototype.initSnapshotButton = function () {
        var self = this, snapshotBtnElement = DomProvider_1["default"].getElement(DomElements_1["default"].SNAPSHOT_BUTTON);
        snapshotBtnElement.addEventListener('click', self.handleSnapshotBtn_Click.bind(self));
    };
    Application.prototype.initClearButton = function () {
        var self = this, clearBtnElement = DomProvider_1["default"].getElement(DomElements_1["default"].CLEAR_BUTTON);
        clearBtnElement.addEventListener('click', self.handleClearBtn_Click.bind(self));
    };
    Application.prototype.handleSnapshotBtn_Click = function (event) {
        var self = this, clearBtnElement = DomProvider_1["default"].getElement(DomElements_1["default"].CLEAR_BUTTON), resultElement = DomProvider_1["default"].getElement(DomElements_1["default"].CAMERA_RESULT_WRAPPER);
        Webcam.snap(function (data_uri) {
            DomProvider_1["default"].show(resultElement);
            DomProvider_1["default"].setContent(resultElement, '<img src="' + data_uri + '"/>');
            DomProvider_1["default"].show(clearBtnElement);
            Webcam.upload(data_uri, '/upload', function (code, text) {
                // Upload complete!
                // 'code' will be the HTTP response code from the server, e.g. 200
                // 'text' will be the raw response content
            });
        });
    };
    Application.prototype.handleClearBtn_Click = function (event) {
        var self = this, clearBtnElement = DomProvider_1["default"].getElement(DomElements_1["default"].CLEAR_BUTTON), resultElement = DomProvider_1["default"].getElement(DomElements_1["default"].CAMERA_RESULT_WRAPPER);
        DomProvider_1["default"].hide(resultElement);
        DomProvider_1["default"].hide(clearBtnElement);
        DomProvider_1["default"].setContent(resultElement, '');
    };
    return Application;
}());
exports.__esModule = true;
exports["default"] = Application;
//# sourceMappingURL=Application.js.map