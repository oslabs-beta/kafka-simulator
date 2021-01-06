const createConsumer = async (kafkaConnection, topic) => {
  const consumer = kafkaConnection.consumer({
    groupId: topic,
  });

  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: false });

  await consumer.run({
    eachMessage: async (payload) => {
      // Kafka stores message from the producer in base64
      const utf8encoded = Buffer.from(payload.message.value, "base64").toString(
        "utf8"
      );

      const transaction = JSON.parse(utf8encoded);

      // COULD PERFORM SOME OTHER TYPE OF ACTION THAT IT MORE COMPLEX
      // SUCH AS, SENDING THE LARGE TRANSACTIONS TO A USER INTERFACE WHICH DISPLAYS A SMALL GRAPH OF BITCOIN TRANSACTIONS
      // OVER A CERTAIN AMOUNT
      if (payload.partition === 2) {
        console.log(transaction);
      }

      consumer.logger().error("consumer was called!");
    },
  });

  return consumer;
};

module.exports = createConsumer;
