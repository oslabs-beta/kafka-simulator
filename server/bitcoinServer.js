const express = require('express');
const runStream = require('./stream');
const WebSocket = require('ws');
const fs = require('fs');
const kafka = require('./kafka/kafkaConnection');
const createConsumer1 = require('./kafka/bitcoin/transactionConsumer');
const createConsumer2 = require('./kafka/bitcoin/calculatedTransactionConsumer');

const producer = kafka.producer();
producer.connect();

createConsumer1(kafka, 'transactions');
createConsumer2(kafka, 'calculatedTransactions');

async function sendEvent(data, topic) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }],
  });
}

fs.writeFile('myapp.log', '', (err) => {
  if (err) console.error(err);
  else console.log('Kafka Simulator logs have been reset');
});

const app = express();

const ws = new WebSocket('wss://ws.blockchain.info/inv', {
  perMessageDeflate: false,
});
process.stdin.pipe(ws);

ws.on('open', () => {
  ws.send('{"op":"unconfirmed_sub"}');
});

ws.on('message', (data) => {
  const transaction = JSON.parse(data);

  const amount = transaction.x.inputs[0].prev_out.value / 100000000;
  // change dollars calculation to pull conversion rate dynamically
  const dollars = amount * 19122;
  transaction.amount = amount;
  transaction.dollars = dollars;
  if (amount) {
    sendEvent(transaction, 'transactions');
  }
});

app.listen(3001, () => {
  console.log('Listening on 3001');
});
