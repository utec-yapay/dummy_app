if (global.TNS_WEBPACK) {
    require("tns-core-modules/bundle-entry-points");
    global.registerModule("main-page", function () { return require("./main-page"); });
}
