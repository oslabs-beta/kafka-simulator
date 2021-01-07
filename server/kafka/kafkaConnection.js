// Require statement for KafkaMirror npm module
// ( we made this ;) )
// Wraps KafkaJS, e.g., abstracts the need to download and use KafkaJS package to interact with Kafka application
// Alternative to KafkaJS
const KafkaMirror = require("kafka-mirror-connect");

let clientId;

if (process.env.stream === "bitcoin") clientId = "bitcoinStream";
else clientId = "yelpStream";

const kafka = KafkaMirror({
  clientId,
  brokers: ["localhost:9092"],
});

module.exports = kafka;
