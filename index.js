var express = require('express'), json = require('express-json');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var schedule = require('node-schedule');
var fs = require("fs");
var http = require('http');

//my js files
var parser = require(__dirname + '/parser');
var dateHandler = require(__dirname + '/dateHandler');

var app = express().use(json()); // creates an instance of an express application.
// Find your account sid and auth token in your Twilio account Console.
var client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

dateArray = [];

function timedText(number, message, date){
  this.number = number;
  this.message = message;
  this.date = date;
  //new Date(year, month, day, hours, minutes, seconds, milliseconds);
}

app.post('/reminder', function(req, res) {
  var number = req.body.number,
      message = req.body.text,
      date = req.body.date;
      time = req.body.time;

  var date = parser.parseDate(date, time);

  /*var scheduler = schedule.scheduleJob(time + " *", function() {
    client.messages.create({
        to: "+1" + number,
        from: "+14156836411",
        body: message,
    }, function(err, message) {
        console.log(message.sid);
    });
  });*/
  console.log("number: " + "+1" + number + "\n" +
              "text: " + message + "\n" +
              "date: " + date);
  if(date < new Date()) {
    res.status(400).send("Can't set a reminder for a date in the past.");
  } else {
    dateHandler.addDate(dateArray, new timedText("+1" + number, message, date), 0, dateArray.length);
    console.log(dateArray);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
  }
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
