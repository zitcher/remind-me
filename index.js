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

var id = 0;

//dataStructure that goes in the dateArray
function timedText(number, message, date){
  this.number = number;
  this.message = message;
  this.date = date;
  //new Date(year, month, day, hours, minutes, seconds, milliseconds);
}

//recieves the information from the submit button on the website and adds
//a corresponding timedText to the dateArray
app.post('/reminder', function(req, res) {
  var number = req.body.number,
      message = req.body.text,
      date = req.body.date,
      time = req.body.time;

  parsedDate = parser.parseDate(date, time);

  console.log("number: " + "+1" + number + "\n" +
              "text: " + message + "\n" +
              "date: " + parsedDate);
  if(parsedDate < new Date()) {
    res.status(400).send("Can't set a reminder for a date in the past.");
  } else {
    try {
      dateHandler.addDate(dateHandler.dateArray, new timedText(number, message, parsedDate), 0, dateHandler.dateArray.length);
    } catch (e) {
      res.status(400).send("Can't set a reminder for a date in the past.");
    }
    console.log(dateHandler.dateArray);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
  }
});

//recieves information to delete a reminder
app.post('/delete', function(req, res) {
  var number = req.body.number,
      message = req.body.text,
      date = req.body.date,
      time = req.body.time;
  var deleted = false;
  try {
    var parsedDate = parser.parseDate(date, time);
    var delMessage = new timedText(number, message, parsedDate);

    for(var i = 0; i < dateHandler.dateArray.length; i++){
      if(dateHandler.dateArray[i] == delMessage) {
        dateHandler.dataArray.splice(i, 1);
        deleted = true
        break;
      }
    }
  } catch (e) {
    res.status(400).send("Date not valid. " + e);
  }
  if (deleted = true){
    res.end('{"success" : "Updated Successfully", "status" : 200}');
  } else {
    res.status(400).send("Entry not found. ");
  }
});

app.get('/',function(req,res){
     res.sendFile(__dirname + '/index.html');
});

app.listen('4000', function(){
  console.log("Server running");
});


//Handles sending first text from array
function sendText(){
  var curDate = new Date();
  var firstText = dateHandler.dateArray.shift();
  if (firstText != undefined && curDate > firstText.date) {
    console.log(firstText.number);
    console.log(firstText.message);
    client.messages.create({
        to: "+" + firstText.number,
        from: "+14156836411",
        body: firstText.message,
    }, function(err, message) {
        console.log(message.sid);
    });
    sendText();
  }
}

//handles checking array every minute
var checkTexts = schedule.scheduleJob('*/1 * * * *', function(){
  console.log("Checking texts!");
  sendText();
  console.log(dateHandler.dateArray);
});
