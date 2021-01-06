const express = require("express");
const WebSocket = require("ws");
const fs = require("fs");
const kafkaConnection = require("./kafka/kafkaConnection");
const createTransactionConsumer = require("./kafka/bitcoin/transactionConsumer");
const createCalculatedTransactionConsumer = require("./kafka/bitcoin/calculatedTransactionConsumer");

const app = express();

// Reset the app log to a blank file every time server is spun up
// Prevents overflow of log data and prevents Winston from resending old logs
fs.writeFile("myapp.log", "", (err) => {
  if (err) console.error(err);
  else console.log("Kafka Simulator logs have been reset");
});

// Produce an event for every cleared bitcoin transaction which is sent to the "transactions topic"
// and subsequently consumed by the transactionConsumer
const producer = kafkaConnection.producer();
producer.connect();

// Invoke functions from consumer generator files when server starts
createTransactionConsumer(kafkaConnection, "transactions");
createCalculatedTransactionConsumer(kafkaConnection, "calculatedTransactions");

// Lower order function called upon receipt of every cleared bitcoin transaction through the socket
// Sends event to the "transactions" topic, events consumed by transactionConsumer
async function sendEvent(data, topic) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }],
  });
}

// Create a new websocket connection to API which provides bitcoin transaction information
const ws = new WebSocket("wss://ws.blockchain.info/inv", {
  perMessageDeflate: false,
});

// Upon connection opening, program sends message to initialize communication with the API and begion flow of transaction
// data through websocket to local server
ws.on("open", () => {
  ws.send('{"op":"unconfirmed_sub"}');
});

// Upon receipt of each message from the transaction information API, parse the incoming message, convert satoshis to
// bitcoin and bitcoin to dollars, append additional information to transaction object and send the transaction object
// in event to "transaction" topic
ws.on("message", (data) => {
  const transaction = JSON.parse(data);

  const bitcoinAmount = transaction.x.inputs[0].prev_out.value / 100000000;
  // USE COINBASE API TO PULL UP TO DATE BITCOIN PRICE (replace constant in conversion)
  // developers.coinbase.com
  const dollars = bitcoinAmount * 33845;

  transaction.bitcoinAmount = bitcoinAmount;
  transaction.dollars = dollars;

  sendEvent(transaction, "transactions");
});

// Listens on port 3001
app.listen(3001, () => {
  console.log("Listening on 3001");
});
