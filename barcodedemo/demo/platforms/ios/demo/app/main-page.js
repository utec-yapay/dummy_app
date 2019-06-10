"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var main_view_model_1 = require("./main-view-model");
var observableModule = require("tns-core-modules/data/observable");
var page;

function pageLoaded(args) {
    page = args.object;
    page.bindingContext = new HelloWorldModel();
    //page.frame.navigate("confirm-page");
    //resultText = page.bindingContext.result;
}
exports.pageLoaded = pageLoaded;

var observable_1 = require("tns-core-modules/data/observable");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var payment;
var jsonpayment;
var paymentAmount;
var companyName;
var paymentId;
var companyPhone;

var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        var _this = _super.call(this) || this;
        _this.barcodeScanner = new nativescript_barcodescanner_1.BarcodeScanner();
        return _this;
    }
    HelloWorldModel.prototype.doRequestCameraPermission = function () {
        this.barcodeScanner.requestCameraPermission().then(function () {
            console.log("Camera permission requested");
        });
    };
    HelloWorldModel.prototype.doScanWithBackCamera = function () {
        this.scan(false, false);
    };

    HelloWorldModel.prototype.scan = function (front, flip, torch, orientation) {
        this.barcodeScanner.scan({
            cancelLabelBackgroundColor: "#333333",
            preferFrontCamera: front,
            showFlipCameraButton: flip,
            showTorchButton: torch,
            torchOn: false,
            resultDisplayDuration: 500,
            orientation: orientation,
            beepOnScan: true,
            openSettingsIfPermissionWasPreviouslyDenied: true,
            closeCallback: function () {
                console.log("Scanner closed @ " + new Date().getTime());
            }
        }).then(function (result) {

            console.log("--- scanned: " + result.text);

            payment = result.text;
            jsonpayment = JSON.parse(payment);
            module.exports={
              paymentAmount : jsonpayment.amount,
              companyName : jsonpayment.companyName,
              paymentId : jsonpayment.paymentId,
              companyPhone : jsonpayment.companyPhone
            }

        }, function (errorMessage) {
            console.log("No scan. " + errorMessage);
        }).then(function(result){
          result=undefined;
          page.frame.navigate("confirm-page");
        });
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
