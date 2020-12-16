async function createProducer(kafkaInstance) {
  const producer = kafkaInstance.producer();
}

async function createNewEvent(payload, producer) {
  await producer.connect();
  const { topic, message } = payload;
  console.log(`KAFKA TOPIC: ${topic}`);
  await producer.send({
    topic: "user",
    messages: [{ value: message }],
  });
  await producer.disconnect();
}

module.exports = {
  createProducer,
  createNewEvent,
};
