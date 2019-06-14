var observableModule = require("tns-core-modules/data/observable");
var labelModule = require("tns-core-modules/ui/label");
var main_view_model_1 = require("./main-view-model");
var payment = require("./main-page.js");
var page;

function onTap(args) {
    var button = args.object;
    var page = button.page;
    page.frame.navigate("main-page");

}
exports.onTap = onTap;

function loaded(args) {
    page = args.object;
    var company = page.getViewById("company");
    company.text = payment.cpn;
    console.log(payment.cpn);
    var amount = page.getViewById("amount");
    amount.text = payment.amt;

}
exports.loaded = loaded;
