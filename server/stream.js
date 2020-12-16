const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const path = require('path');
const kafka = require('./kafka/streams/kafkaInstance');

async function sendEvent(data, topic, producer) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }],
  });
}

const runStream = async function () {
  const producer = kafka.producer();
  await producer.connect();

  const instream = fs.createReadStream(
    path.resolve(__dirname, '../../yelp/yelp_academic_dataset_review.json')
  );
  const outstream = new stream();
  const rl = readline.createInterface(instream, outstream);

  let lineCount = 0;
  let totalCount = 0;

  const searchTerm = 'burger';
  const regex = new RegExp(`\\s${searchTerm}\\s`);

  rl.on('line', (line) => {
    const review = JSON.parse(line);
    totalCount++;
    if (review.text.match(regex)) {
      // console.log(JSON.stringify(review, null, 2));
      lineCount++;
      sendEvent(review, searchTerm, producer);
      // console.log(lineCount);
      // console.log(((lineCount * 100) / totalCount).toFixed(2) + '%');
    }
  });
};

module.exports = runStream;
