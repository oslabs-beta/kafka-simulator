const KafkaMirror = require("../km/index");

let clientId;

if (process.env.stream === "bitcoin") clientId = "bitcoinStream";
else clientId = "yelpStream";

const kafka = KafkaMirror({
  clientId,
  brokers: ["localhost:9092"],
});

module.exports = kafka;
