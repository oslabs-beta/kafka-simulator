const createConsumer = async (kafkaConnection, topic) => {
  const consumer = kafkaConnection.consumer({
    groupId: topic,
  });

  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: false });

  const producer = await kafkaConnection.producer();
  await producer.connect();

  await consumer.run({
    eachMessage: async (payload) => {
      // Kafka stores message from the producer in base64
      const utf8encoded = Buffer.from(payload.message.value, "base64").toString(
        "utf8"
      );

      const transaction = JSON.parse(utf8encoded);

      consumer.logger().error("consumer was called!");
      const newTransaction = {
        address: transaction.x.inputs[0].prev_out.addr,
        bitcoin: transaction.bitcoinAmount,
        dollars: transaction.dollars,
      };

      const calculatePartition = () => {
        if (transaction.dollars < 1000) return 0;
        if (transaction.dollars < 10000) return 1;
        return 2;
      };
      const partition = calculatePartition();

      producer.send({
        topic: "calculatedTransactions",
        messages: [
          {
            value: JSON.stringify(newTransaction),
            partition: partition,
          },
        ],
      });
    },
  });

  return consumer;
};

module.exports = createConsumer;
