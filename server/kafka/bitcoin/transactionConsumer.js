const createConsumer = async (kafkaConnection, topic) => {
  const consumer = kafkaConnection.consumer({
    // groupId: 'airbnb',
    groupId: topic,
  });
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });

  await consumer.run({
    // eachMessage: async ({ topic, partition, message }) => {
    eachMessage: async (payload) => {
      console.log('PAYLOAD:');
      console.log(payload);
      consumer.logger().error('consumer was called!');
      console.log('----------------------------------------------');
      // console.log({ value: message.value.toString() });
    },
  });

  console.log(`consumer -------------------------------`);
  console.log(consumer);
  console.log(`-------------------------------`);
  return consumer;
};

module.exports = createConsumer;
