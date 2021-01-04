const KafkaMirror = require('../km/index');
let clientId;

if (process.env.stream === 'bitcoin') clientId = 'brocoin';
else clientId = 'yelp';

const kafka = KafkaMirror({
  clientId,
  brokers: ['localhost:9092'],
});

module.exports = kafka;
