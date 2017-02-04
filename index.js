var express = require('express'), json = require('express-json');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var schedule = require('node-schedule');
var fs = require("fs");
var http = require('http');

var app = express().use(json()); // creates an instance of an express application.
// Find your account sid and auth token in your Twilio account Console.
var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.post('/phone', function(req, res) {
  var number = req.body.number,
      message = req.body.message,
      time = req.body.time;
  console.log("number: " + number + "\n" + "message: " + message + "\n" + "time: " + time)
  var scheduler = schedule.scheduleJob(time + " *", function() {
    client.messages.create({
        to: "+1" + number,
        from: "+14156836411",
        body: message,
    }, function(err, message) {
        console.log(message.sid);
    });
  });
});

app.get('/',function(req,res){
     res.sendFile(__dirname + '/index.html');
});

app.listen('3000', function(){
  console.log("Server running");
});

/*
var scheduler = schedule.scheduleJob('10 43 17 4 2 *', function(){
  client.messages.create({
      to: "+14159397520",
      from: "+14156836411",
      body: "Is it 5:43?",
  }, function(err, message) {
      console.log(message.sid);
  });
});*/
