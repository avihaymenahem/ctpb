import DomProvider from "./DomProvider";
import DomElements from "./Models/DomElements";

const Webcam = require("webcamjs");

export default class Application {
    constructor() {
        let self = this;
        self.initWebCamWrapper();
        self.initSnapshotButton();
        self.initClearButton();
    }
    
    initWebCamWrapper() {
        let self = this,
            webcamWrapperElement = DomProvider.getElement(DomElements.CAMERA_PREVIEW_WRAPPER);

        Webcam.set({
            width: 425,
            height: 320
        });

        Webcam.attach(webcamWrapperElement);
    }

    initSnapshotButton() {
        let self = this,
            snapshotBtnElement = DomProvider.getElement(DomElements.SNAPSHOT_BUTTON);
        
        snapshotBtnElement.addEventListener('click', self.handleSnapshotBtn_Click.bind(self));
    }

    initClearButton() {
        let self = this,
            clearBtnElement = DomProvider.getElement(DomElements.CLEAR_BUTTON);

        clearBtnElement.addEventListener('click', self.handleClearBtn_Click.bind(self));
    }

    handleSnapshotBtn_Click(event: MouseEvent) {
        let self = this,
            clearBtnElement = DomProvider.getElement(DomElements.CLEAR_BUTTON),
            resultElement = DomProvider.getElement(DomElements.CAMERA_RESULT_WRAPPER);

        Webcam.snap( function(data_uri) {
            DomProvider.show(resultElement);
            DomProvider.setContent(resultElement,  '<img src="'+data_uri+'"/>');
            DomProvider.show(clearBtnElement);

            Webcam.upload(data_uri, '/upload', function(code, text) {
                // Upload complete!
                // 'code' will be the HTTP response code from the server, e.g. 200
                // 'text' will be the raw response content
            } );
        });
    }

    handleClearBtn_Click(event: MouseEvent) {
        let self = this,
            clearBtnElement = DomProvider.getElement(DomElements.CLEAR_BUTTON),
            resultElement = DomProvider.getElement(DomElements.CAMERA_RESULT_WRAPPER);

        DomProvider.hide(resultElement);
        DomProvider.hide(clearBtnElement);
        DomProvider.setContent(resultElement,  '');

    }
}