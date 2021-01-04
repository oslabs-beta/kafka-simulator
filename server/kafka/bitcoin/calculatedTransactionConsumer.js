const createConsumer = async (kafkaConnection, topic) => {
  const consumer = kafkaConnection.consumer({
    groupId: topic,
  });
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async (payload) => {
      // Kafka stores message from the producer in base64
      const utf8encoded = Buffer.from(payload.message.value, 'base64').toString(
        'utf8'
      );

      const transaction = JSON.parse(utf8encoded);

      if (payload.partition === 2) {
        console.log('inside transaction consumer', transaction);
        console.log('******Calculated Transaction consumer was called!*****');
      }

      consumer.logger().error('consumer was called!');
    },
  });

  return consumer;
};

module.exports = createConsumer;
