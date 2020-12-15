const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const path = require('path');
const kafka = require('./kafka/streams/kafkaInstance');
const { stringify } = require('querystring');

const producer = kafka.producer();
producer.connect();

async function sendEvent(data, topic) {
  // const senderAddress = data.x.inputs[0].prev_out.addr;
  // console.log("sender address is", senderAddress);
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }],
  });
}

const runStream = function () {
  const instream = fs.createReadStream(
    path.resolve(__dirname, '../../yelp/yelp_academic_dataset_review.json')

    // '/Users/markmiller/Desktop/archive/yelp_academic_dataset_review.json'
    // {
    //   highWaterMark: 1024,
    // }
  );
  const outstream = new stream();
  const rl = readline.createInterface(instream, outstream);

  let lineCount = 0;
  let totalCount = 0;
  const searchTerm = 'ass';
  // const string = '';
  const regex = new RegExp(`\\s${searchTerm}\\s`);
  // string.replace(regex, searchTerm);
  // console.log(string);

  // /\sass\s/;

  rl.on('line', (line) => {
    const review = JSON.parse(line);
    totalCount++;
    if (review.text.match(regex)) {
      // console.log(JSON.stringify(review, null, 2));
      lineCount++;
      // console.log(regex);
      // console.log(string);
      sendEvent(review, searchTerm);

      // console.log(lineCount);
      // console.log(lineCount / totalCount);
    }
  });

  // yelpStream.on('open', () => {
  //   console.log('Stream is open for business...');
  // });

  // yelpStream.on('data', (chunk) => {
  //   console.log('--------------------------');
  //   console.log(chunk);
  //   console.log('--------------------------');
  // });

  // yelpStream.on('end', () => {
  //   console.log('Stream closed...');
  // });
};

module.exports = runStream;
