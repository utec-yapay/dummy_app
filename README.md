# Dummy App
This repository contains a Yape dummy app for YaPay. The app is made with [NativeScript](https://www.nativescript.org/) and the [barcode scanner plugin](https://github.com/EddyVerbruggen/nativescript-barcodescanner). It was made by Alessia Yi and Guillermo Franco, though due to the problems with the NativeScript environment and the nature of the plugin, the team could only work in one computer. 

The app's one and only use is to provide an open source Yape to test the 'Pay with QR' function of the original app, and as such, won't be of much use to the Yape team. Nevertheless, there are small changes to account for the new functionality YaPay is providing.

Dowload NativeScript Sidekick

https://www.nativescript.org/nativescript-sidekick

Install CLI full setup

https://docs.nativescript.org/start/quick-setup

Clone the repository
```
git clone https://github.com/utec-yapay/dummy_app.git
```
Open Sidekick and load dummy_app/barcodedemo/demo

The app works with localhost, in barcodedemo/demo/app/confirm-page.js change the IP in line 28 (not 127.0.0.1)

Conect andoird device with USB and run it
