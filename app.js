"use strict";
 
// Here's a vanilla HTTP app to start,
// but feel free to replace it with Express, Koa, etc
var express = require("express");
var Greenlock = require("greenlock");
var app = express();

let store = require('greenlock-storage-s3').create({

    , bucketRegion: 'us-west-2'            // Replace with your bucketRegion
    , bucketName: 'cert-bot'                // Replace with your bucketName
    , configDir: 'acme/'                    // Recommended
    , accountsDir: 'accounts/'              // Recommended
    , debug: true                           // Debug
});


app.get('/', (req, res) => {
     res.setHeader("Content-Type", "text/html; charset=utf-8");
    


     if(req.get('host') =="shankarappa.com")
        res.end("hello thilak ");
else 
    res.end("Hello, World!\n\n💚 ��.js");


});

app.get('/add/:domain', (req, res) => {
    var pkg = require('./package.json');
    var gl = Greenlock.create({
        //configDir: './greenlock.d/',
        store: store,
     
        // Staging for testing environments
        staging: true,
     
        // This should be the contact who receives critical bug and security notifications
        // Optionally, you may receive other (very few) updates, such as important new features
        maintainerEmail: 'tshankar@esri.com',
        packageRoot: './',
        // for an RFC 8555 / RFC 7231 ACME client user agent
        packageAgent: pkg.name + '/' + pkg.version
    });

    gl.add({
       subject: req.params.domain,
       altnames: [req.params.domain]
   });
    console.log(req.params.domain);
    res.end("added" + req.params.domain);
})

module.exports = app;
