const express = require('express');
const runStream = require('./stream');
const WebSocket = require('ws');
const fs = require('fs');
const kafka = require('./kafka/streams/kafkaInstance');
// const kafka = require('./kafka/manual/kafkaInstance');
// const createConsumer1 = require('./kafka/streams/transactionConsumer');
// const createConsumer2 = require('./kafka/manual/consumer');
// const path = './myapp.log';

fs.writeFile('myapp.log', '', (err) => {
  if (err) console.error(err);
  else console.log('Kafka Simulator logs have been reset');
});

const app = express();
runStream();

app.listen(3001, () => {
  console.log('Listening on 3001');
});
