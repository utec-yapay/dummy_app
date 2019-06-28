"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var main_view_model_1 = require("./main-view-model");
var observableModule = require("tns-core-modules/data/observable");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var page;
var r = require('jsrsasign');
//const base64url = require('base64url');
//var jwtJsDecode = require('jwt-js-decode');
//var d = require('jwt-decode');
//import { KJUR, KEYUTIL } from './jsrsasign-all-min.js';



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

            isValid = r.KJUR.jws.JWS.verifyJWT(sJWT, "2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&", {alg: ['HS256']});

            console.log(isValid);
            //console.log(r.KJUR.jws.JWS.verifyJWT(sJWT, "2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&", {alg: ['HS256']}));
            if (isValid){
              //var headerObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(sJWT.split(".")[0]));
              //var jwt = jwtJsDecode.jwtDecode('token');
              //console.log(jwt.payload);
              console.log("hasta aca antes");
              // var si = base64url.decode(sJWT.split(".")[1]);
              // console.log(si);
              // var seguro=r.KJUR.jws.JWS.isSafeJSONString(b64utoutf8(sJWT.split(".")[1]));
              // console.log(seguro);
              console.log(r.b64utoutf8(sJWT.split(".")[1]));
              payloadObj = r.b64utoutf8(sJWT.split(".")[1])
              //payloadObj = r.KJUR.jws.JWS.readSafeJSONString(b64utoutf8(sJWT.split(".")[1]));
              // var ca = sJWT;
              // var base64Url = ca.split('.')[1];
              // var decodedValue = JSON.parse(window.atob(base64Url));
              // console.log(decodedValue);
              // var decoded = d.jwt_decode(sJWT);
              // console.log(decoded);
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
