"use strict";
var DomProvider = (function () {
    function DomProvider() {
    }
    DomProvider.getElement = function (element) {
        return document.querySelector(element);
    };
    DomProvider.show = function (element) {
        element.style.display = "block";
    };
    DomProvider.hide = function (element) {
        element.style.display = "none";
    };
    DomProvider.setContent = function (element, content) {
        element.innerHTML = content;
    };
    return DomProvider;
}());
exports.__esModule = true;
exports["default"] = DomProvider;
//# sourceMappingURL=DomProvider.js.map