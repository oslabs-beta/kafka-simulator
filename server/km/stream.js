const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const instream = fs.createReadStream(
  '/Users/markmiller/Desktop/archive/yelp_academic_dataset_review.json'
  // {
  //   highWaterMark: 1024,
  // }
);
const outstream = new stream();
const rl = readline.createInterface(instream, outstream);

let lineCount = 0;
// const regex = /\sburger\s/;

rl.on('line', (line) => {
  lineCount++;
  const review = JSON.parse(line);
  // if (review.text.match(regex)) {
  console.log(JSON.stringify(review, null, 2));
  console.log(lineCount);
  // }
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
