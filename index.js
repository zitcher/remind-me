var express = require( 'express' );
// body parsing middleware
var bodyParser = require('body-parser');
//twilio for text!
var twilio = require('twilio');

var app = express(); // creates an instance of an express application.

//reads the secret twilio file
 var fs = require("fs");
 var secretContents = fs.readFileSync("twilio-secret.json");

// Find your account sid and auth token in your Twilio account Console.
var client = twilio(secretContents.pid, secretContents.auth);

client.messages.create({
    to: "+14159397520",
    from: "+14156836411",
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
}, function(err, message) {
    console.log(message.sid);
});

// body parsing middleware
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

var someTweets = [{id: '1', name:'Jason', content:'At Hack@Brown 2017'}, {id: '2', name:'Obama', content:'Hello there'},
{id: '3', name:'Trump', content:'It is going to be big and spectacular'}, {id: '4', name:'Alexandra', content:'I love cats <3'}]


var data = {};

app.listen('3000', function(){
  console.log("Server running");
});

app.get("/", function(req, res){
  res.send("/tweetId to see tweets");
});

app.get("/:tweetId", function(req, res){
  res.send(data[req.params.tweetId]);
});

app.post('/', function(req, res){
    var newTweet = req.body;
    addTweet(newTweet);
    res.send('Tweet successfully added!');
})

function addTweet(tweet){
    data[tweet.id] = tweet;
}

function removeTweet(tweetId){
    data[tweetId] = undefined;
}

for(var i = 0; i < someTweets.length; i++){
    addTweet(someTweets[i]);
}
