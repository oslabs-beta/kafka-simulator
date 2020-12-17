const express = require('express');
const runStream = require('./stream');
const fs = require('fs');
const path = './myapp.log';
// const createConsumer = require('./kafka/streams/transactionConsumer');
// const kafka = require('./kafka/streams/kafkaInstance');
// try {
//   fs.unlinkSync(path);
// } catch (err) {
//   console.error(err);
// }
const app = express();
runStream();
// createConsumer(kafka, 'burger');

// node child process to excute a certain command
// need to run multiple processes

app.listen(3001, () => {
  console.log('Listening on 3001');
});
