const { producer } = require('./kafkaInstance');

async function createNewEvent(payload) {
  // const producer = kafkaInstance.producer();
  // await producer.connect();
  const { topic, message } = payload;
  console.log(`KAFKA TOPIC: ${topic}`);
  producer.send({
    topic: 'user',
    messages: [{ value: message }],
  });
  // await producer.disconnect();
}

module.exports = createNewEvent;
