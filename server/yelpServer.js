const express = require("express");
const runStream = require("./kafka/yelp/yelpStream");
const fs = require("fs");

const app = express();

// Reset the app log to a blank file every time server is spun up
// Prevents overflow of log data and prevents Winston from resending old logs
fs.writeFile("myapp.log", "", (err) => {
  if (err) console.error(err);
  else console.log("Kafka Simulator logs have been reset");
});

// Modularize yelp streaming data functionality
// Reads a file of yelp reviews, converts to a stream and produces events to specified Kafka broker
runStream();

// Listens on port 3001
app.listen(3001, () => {
  console.log("Listening on 3001");
});
