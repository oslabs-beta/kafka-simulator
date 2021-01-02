const express = require('express');
const runStream = require('./stream');
const WebSocket = require('ws');
const fs = require('fs');
const kafka = require('./kafka/kafkaConnection');
// const createConsumer = require('./kafka/streams/transactionConsumer');
const createConsumer = require('./kafka/bitcoin/transactionConsumer');
// const path = './myapp.log';

// const connectProducer = async () => {
const producer = kafka.producer();
producer.connect();

createConsumer(kafka, 'transactions');
// createConsumer2(kafka, 'calculatedTransactions');

//   return producer;
// };
// const producer = connectProducer();

async function sendEvent(data, topic) {
  const senderAddress = data.x.inputs[0].prev_out.addr;
  console.log('sender address is', senderAddress);
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(senderAddress) }],
  });
}

fs.writeFile('myapp.log', '', (err) => {
  if (err) console.error(err);
  else console.log('Kafka Simulator logs have been reset');
});

const app = express();
// runStream();

const ws = new WebSocket('wss://ws.blockchain.info/inv', {
  perMessageDeflate: false,
});
process.stdin.pipe(ws);

ws.on('open', () => {
  ws.send('{"op":"unconfirmed_sub"}');
});

ws.on('message', (data) => {
  const transaction = JSON.parse(data);
  // console.log(data);
  const amount = transaction.x.inputs[0].prev_out.value / 100000000;
  const dollars = amount * 19122;
  if (amount) {
    sendEvent(transaction, 'transactions');
    console.log(`Amount: ${amount}`);
    console.log(`Dolla dolla bill: ${dollars}`);
    // console.log(`Size: ${transaction.x.size}`);
    // console.log(`In Addr: ${transaction.x.inputs[0].prev_out.addr}`);
    // console.log(`Out addr: ${transaction.x.out[0].addr}`);
    // console.log(`relayed: ${transaction.x.relayed_by}`);
    // console.log(process.memoryUsage());
  }
});

// node child process to excute a certain command
// need to run multiple processes

app.listen(3001, () => {
  console.log('Listening on 3001');
});
