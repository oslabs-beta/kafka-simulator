const KafkaMirror = require('../../km/index');

const kafka = KafkaMirror({
  clientId: 'yelp',
  brokers: ['localhost:9092'],
});

module.exports = kafka;
