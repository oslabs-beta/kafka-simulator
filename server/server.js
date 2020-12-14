const express = require("express");
const runStream = require("./stream");
const createConsumer = require("./kafka/streams/transactionConsumer");
const kafka = require("./kafka/streams/kafkaInstance");

const app = express();
// runStream();
createConsumer(kafka, "ass");

// node child process to excute a certain command
// need to run multiple processes

app.listen(3001, () => {
  console.log("Listening on 3001");
});
