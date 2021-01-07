const fs = require("fs");
const readline = require("readline");
const stream = require("stream");
const path = require("path");
const kafka = require("../kafkaConnection");

// COULD MODULARIZE RUN STREAM FUNCTIONALITY AS A PIECE OF MIDDLEWARE, WHICH WOULD RUN ON THE
// CLICK OF A BUTTON SHOWN ON THE USER INTERFACE

// Lower order function invoked to produce new event every time Regex keyword appears in a review
async function sendEvent(review, topic, producer) {
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(review) }],
  });
}

// Establish and connect a Kafka producer, parse and stream yelp review dataset and invoke send event
// on keyword match
const runStream = async function () {
  const producer = kafka.producer();
  await producer.connect();

  // To use this functionality, download the dataset (for free) found at:
  // https://www.kaggle.com/yelp-dataset/yelp-dataset
  // The path on line 28 should resolve to the path at which you save the dataset
  const instream = fs.createReadStream(
    path.resolve(
      __dirname,
      "../../../../yelp/yelp_academic_dataset_review.json"
    )
  );
  const rl = readline.createInterface(instream);

  // Update 'searchTerm' to filter reviews based on different key words or phrases
  // IF A FRONTEND FOR SIMULATOR IS CREATED AND WE WANT TO CHANGE THE SEARCH TERM DYNAMICALLY, WE RECOMMEND
  // MOVING THIS VARIABLE OUT OF THE RUNSTREAM FUNCTION SO THAT IT IS LEXICALLY SCOPED
  const searchTerm = "pancake";
  const regex = new RegExp(`\\s${searchTerm}\\s`);

  // rl.on runs everytime a new line is read, each line being a new review object with complete information
  // pertaining to a single review
  rl.on("line", (line) => {
    const review = JSON.parse(line);
    if (review.text.match(regex)) {
      sendEvent(review, searchTerm, producer);
    }
  });
};

module.exports = runStream;
