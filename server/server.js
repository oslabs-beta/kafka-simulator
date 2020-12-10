const path = require("path");
const express = require("express");
const kafkaController = require("./controllers/kafkaController");
const kafka = require("./kafka/streams/kafkaInstance");
const createConsumer = require("./kafka/manual/consumer");
const osutils = require("os-utils");
const WebSocket = require("ws");

const app = express();

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../client/")));

app.use("/api/k/:action", kafkaController.create, (req, res) => {
  return res.status(200).json(res.locals.payload);
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});

// Websocket

const producer = kafka.producer();
producer.connect();

createConsumer(kafka, "transactions");

async function sendEvent(transaction) {
  const senderAddress = transaction.x.inputs[0].prev_out.addr;
  console.log("sender address is", senderAddress);
  await producer.send({
    topic: "transactions",
    messages: [{ key: senderAddress, value: JSON.stringify(transaction) }],
  });
}

// const websocket = require('websocket-stream');
// const ws = websocket('wss://ws.blockchain.info/inv');
const ws = new WebSocket("wss://ws.blockchain.info/inv", {
  perMessageDeflate: false,
});
// process.stdin.pipe(ws);

ws.on("open", () => {
  ws.send('{"op":"unconfirmed_sub"}');
});
ws.on("message", (data) => {
  const transaction = JSON.parse(data);
  // console.log(data);
  const amount = transaction.x.inputs[0].prev_out.value / 100000000;
  const dollars = amount * 19122;
  // if (amount > 1) {
  sendEvent(transaction);
  console.log(`Amount: ${amount}`);
  // console.log(`Dolla dolla bill: ${dollars}`);
  // console.log(`Size: ${transaction.x.size}`);
  // console.log(`In Addr: ${transaction.x.inputs[0].prev_out.addr}`);
  // console.log(`Out addr: ${transaction.x.out[0].addr}`);
  // console.log(`relayed: ${transaction.x.relayed_by}`);
  // console.log(process.memoryUsage());
  // printStats();
  // }
});

// function printStats() {
//   osutils.cpuUsage((v) => {
//     // console.log(`CPU usage: ${v}`);
//     // console.log(`Total memory: ${osutils.totalmem()}`);
//   });
// }
