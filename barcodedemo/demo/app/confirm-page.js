var observableModule = require("tns-core-modules/data/observable");
var labelModule = require("tns-core-modules/ui/label");
var main_view_model_1 = require("./main-view-model");
var payment = require("./main-page.js");
var page;
const httpModule = require("http");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
// const uuidParse = require('uuid-parse');

function onTap(args) {
    var button = args.object;
    var page = button.page;
    //payment.cpn=undefined;
    //delete(amount);
    page.frame.navigate("main-page");

}
exports.onTap = onTap;

function pagar(args) {
  var button = args.object;
  var page = button.page;
  console.log("Apretado");
  console.log(payment.pid);
  // var payid = uuidParse.parse(payment.pid);
  // console.log(payid);
  httpModule.request({
  url: "http://192.168.1.10:8080/payments/confirm",
  method: "GET",
  headers: {"pid": payment.pid}
  }).then((response) => {
    page.frame.navigate("finish-page");
    console.log("Aceptado");
  }, (e) => {
    dialogs_1.alert({
        title: "Error",
        message: "Lo sentimos, hubo un error",
        okButtonText: "OK"
    });
    console.log("Fail" + e);
  });
}
exports.pagar = pagar;

function loaded(args) {
    page = args.object;
    //page.bindingContext = ();
    var company = page.getViewById("company");
    company.text = payment.cpn;
    console.log(payment.cpn);
    var amount = page.getViewById("amount");
    amount.text = payment.amt;
    //delete(payment.cpn);

}
exports.loaded = loaded;
