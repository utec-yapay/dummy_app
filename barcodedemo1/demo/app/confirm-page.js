var observableModule = require("tns-core-modules/data/observable");
var labelModule = require("tns-core-modules/ui/label");
var main_view_model_1 = require("./main-view-model");
var payment = require("./main-page.js");
var page;
const httpModule = require("http");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var r = require('jsrsasign');
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
  var yHeader = {alg: 'HS256', typ: 'JWT'};
  var yBody = {};
  var tNow = r.KJUR.jws.IntDate.get('now');
  var tEnd = r.KJUR.jws.IntDate.get('now + 1day');
  yBody.pid = payment.pid;
  var sHeader = JSON.stringify(yHeader);
  var sPayload = JSON.stringify(yBody);
  var sJWT = r.KJUR.jws.JWS.sign("HS256", yHeader, yBody, "2r5u8x/A?D(G-KaPdSgVkYp3s6v9y$B&");
  // var payid = uuidParse.parse(payment.pid);
  // console.log(payid);
  httpModule.request({
  url: "http://172.20.10.8:8080/payments/confirm",
  method: "GET",
  headers: {"pid": sJWT}
  }).then((response) => {
    console.log(response.statusCode);
    if (response.statusCode==200){
      page.frame.navigate("finish-page");
      console.log("Aceptado");
    }
    else{
      dialogs_1.alert({
          title: "Error",
          message: "Lo sentimos, hubo un error",
          okButtonText: "OK"
      });
    }
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
