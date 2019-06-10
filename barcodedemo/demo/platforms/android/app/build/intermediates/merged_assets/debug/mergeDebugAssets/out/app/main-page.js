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
            isValid = r.KJUR.jws.JWS.verifyJWT(sJWT, "-----BEGIN RSA PRIVATE KEY-----MIIEpQIBAKCAQEA3+CvPvZsIAD8BC1OuAsidX7rHOUyQ4w/G+rfsO1ROClMwb/F9Ly8zSvx8OqfXC5aPaB8WuTZ8Xk0VS1/Z2UB0Hx5z7/EZPXiva77aSJuJIKkm4V3xmGA8R6RbhkmAOXaJFffeRgyB+SjfiB9SQTiztou8GFoytK2SE0cA7QsQ3VgvOg+h3BVA9/KRsxL1pXKV8kBntuz6cduft7st530HeUMvM4XO4vmYwLvP+cPrCkcey2jFYJiq/37yzD/pe9pq6UJFA01Vde8f1FGZFxZ2rY5KL5JGrEI3QRZ6jmM9IQ2z6SwjUFy75kD1AvZRt5sK/GVYq19g36d3Ko4AlYvQIDAQABAoIBAQCgaS9oH80NiWcJ3yTePiwsoAn6pEbFm4HEkSBCd2iQoxb6ZFyFBblqhb/FlO9d/hz7llU5FGmEG4l+bAISfIwKPzgDB2Jfx9zTF0NEXXbIpuuoS/Sj7HfXzzoFJr/9I+Wi6TbQz4iBHA44Z21GptjSFHlQvrLwXR6+QUp/WD4z/WyB35OGN4ztMxxDK0Km7iCc/JE+rsoxHssxAh6SRXuLZ83r5ZYt98FVYY6Nknrikbv/VVxpbMpbUHu7dZu/2N47dcvNyMvF+BnS72vnnUDhwUfpHilg5Lu7l7gjQZ6WPKvkih+XQ1H71QPIarvIfKBJVXnMz9xiczXnGzwYpVtJAoGBAPBW9pZnH/5XArSuL8mRquWsxzPPMCZNL/C2HITbJi8HbYqMXfaIqXOBLnvvYp0EB/DPdhAo399gIcz3STGGqi/UTjKheKgQGDwBceapFJeY0WCEpT+a0lWe3A3GOiYWV3z6hW5P2hddJiSgUp89fzCV2CVDr7xoIRSfL4F7WiJ/AoGBAO53H3/MHncsXs8XO5QAo9VuhZCekg1cAQZ71V8eyaS6f2e3M9MFT+ocsHMORoUbFFj02k7c6yBR5qdgP6T5dN1AP98ACsElZKUp6T4EoBZ3w6Vvtp8JXEN4PkfvUQ+7di7RogQAa8f7ALQ+jhByqsAHLIcH7Jwkw8HtaJx8Me7DAoGANKSnwIv4GwrOAeuBdiJdD4/H1lZUkp8nmA8bshIajASRft5+GmkWzMEIAIePzxq57opSrvl1CAWTgcTMmHeJwY48TqTFu/JCjKo4W7C/XPFRM1X6qDLuTWjNhIrd48fTBAIPxfjhqWpy12TylASxXmAEBy2LSbZ5QH4Ztr/hH1sCgYEAgWEGKQsw+E2NfuRHAcy7FuBo/QbbjP3+3GqxYHNOyd4Zo8blCjeWnRlFrpbvMeZ4Sq9GBoWb2CQ3dVYmEbb6bdQfEzltnE9SZL3xeyF9TdNaxdZviafFdCG4AMVaAKQfwdUhBvTHhW+seR57a3cbJyZ9RSHKgQj9YKkTGdvUJ4sCgYEA0Usu/NNDn4NlwI+FLontbUPAVcx6KJLkm/IfVyQ6LVHzFn7KKypk7DCBYk2ocIZc0dFuAHi7JnjChkbQ0c53EChorx53ssxC9yewNrv0puSE9zlJZCIO5FUqoZ1ZfKc3DyBgAOxkPUy1fw5zAzDfPGvCvoki6/sV/+cM/cC+I38=-----END RSA PRIVATE KEY-----", {alg: ['HS256']});
            console.log(isValid);
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
