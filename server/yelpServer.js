const express = require('express');
const runStream = require('./stream');
const WebSocket = require('ws');
const fs = require('fs');

fs.writeFile('myapp.log', '', (err) => {
  if (err) console.error(err);
  else console.log('Kafka Simulator logs have been reset');
});

const app = express();
runStream();

app.listen(3001, () => {
  console.log('Listening on 3001');
});
