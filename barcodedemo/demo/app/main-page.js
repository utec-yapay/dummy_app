"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var observableModule = require("tns-core-modules/data/observable");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var page;
var r = require('jsrsasign');


function pageLoaded(args) {
    page = args.object;
    page.bindingContext = new HelloWorldModel();
}
exports.pageLoaded = pageLoaded;

var observable_1 = require("tns-core-modules/data/observable");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var payment;
var jsonpayment;
var amt;
var cpn;
var pid;
var cpp;
var isValid;
var payloadObj;
var sJWT;

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
            sJWT = result.text;
            isValid = r.KJUR.jws.JWS.verifyJWT(sJWT, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", {alg: ['HMAC256']});
            console.log(isValid);
            if (isValid){
              console.log("hasta aca antes");
              console.log(r.b64utoutf8(sJWT.split(".")[1]));
              payloadObj = r.b64utoutf8(sJWT.split(".")[1])
              console.log("hasta aca");
              jsonpayment = JSON.parse(payloadObj);
              console.log(jsonpayment.cpn);
              console.log(jsonpayment);
              module.exports={
                amt : jsonpayment.amt,
                cpn : jsonpayment.cpn,
                pid : jsonpayment.pid,
                cpp : jsonpayment.cpp
              }
            }
            else{
              setTimeout(function () {
                dialogs_1.alert({
                  title: "Error",
                  message: "QR no valido",
                  okButtonText: "OK"
                });
              }, 500);
            }
        }, function (errorMessage) {
            console.log("No scan. " + errorMessage);
        }).then(function(result){
          result=undefined;
          if (isValid){
            page.frame.navigate("confirm-page");
          }
        });
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
