const KafkaMirror = require('../../km/index');

// const kafka = new Kafka({
//   clientId: 'brocoin',
//   brokers: ['localhost:9092'],
// });

const kafka = KafkaMirror({
  clientId: 'yelp',
  brokers: ['localhost:9092'],
});

module.exports = kafka;
