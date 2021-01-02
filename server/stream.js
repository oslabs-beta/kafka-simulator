const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const path = require('path');
const kafka = require('./kafka/streams/kafkaInstance');
const { createProducer } = require('./kafka/manual/producer');

const producer = kafka.producer();
producer.connect();

async function sendEvent(data, topic, producer) {
  // console.log('-------EVENT SENT---------');
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }],
  });
}

// let runStream

// const toggle = (){
//   if (condition) runStream = yelpStream
//   else runStream = bitcoinStream
// }
const runStream = async function () {
  const producer = kafka.producer();
  await producer.connect();
  let lineCount = 0;
  let totalCount = 0;
  totalCount++;
  lineCount++;
  sendEvent(review, searchTerm, producer);
  // console.log(lineCount);
  // console.log(lineCount / totalCount);
};

const yelpStream = async function () {
  const producer = kafka.producer();
  await producer.connect();

  const instream = fs.createReadStream(
    path.resolve(__dirname, '../../yelp/yelp_academic_dataset_review.json')
  );
  const outstream = new stream();
  const rl = readline.createInterface(instream, outstream);

  let lineCount = 0;
  let totalCount = 0;

  const searchTerm = 'pancake';
  const regex = new RegExp(`\\s${searchTerm}\\s`);

  rl.on('line', (line) => {
    const review = JSON.parse(line);
    totalCount++;
    // console.log(review.text.match(regex));
    if (review.text.match(regex)) {
      // console.log(review.text);
      // console.log(JSON.stringify(review, null, 2));
      lineCount++;
      // console.log(regex);
      // console.log(string);
      sendEvent(review, searchTerm, producer);

      // console.log(lineCount);
      // console.log(lineCount / totalCount);
    }
  });
};

module.exports = { runStream, sendEvent };
