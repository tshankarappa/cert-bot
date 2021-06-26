"use strict";
 
var app = require("./app.js");
let store = require('greenlock-storage-s3').create({
    accessKeyId: 'AKIA3S3LRSI357F72MO6'                // Replace with your accessKeyId
    , secretAccessKey: 'S/dRHwibdmo40VwBhaNM85swZXti0prPm8uNuLuw'      // Replace with your secretAccessKey
    , bucketRegion: 'us-west-2'            // Replace with your bucketRegion
    , bucketName: 'cert-bot'                // Replace with your bucketName
    , configDir: 'acme/'                    // Recommended
    , accountsDir: 'accounts/'              // Recommended
    , debug: true                           // Debug
});


require("greenlock-express")
    .init({
        packageRoot: __dirname,
        //configDir: './greenlock.d/',
        store: store,
        // contact for security and critical bug notices
        maintainerEmail: "tshankarappa@esri.com",
 
        // whether or not to run at cloudscale
        cluster: false
    })
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .serve(app);