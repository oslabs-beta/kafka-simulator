const createConsumer = async (kafkaConnection, topic) => {
  const consumer = kafkaConnection.consumer({
    groupId: topic,
  });
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  const producer = await kafkaConnection.producer();
  await producer.connect();

  await consumer.run({
    // eachMessage: async (payload) => {

    // console.log(payload);
    eachMessage: async ({ topic, partition, message }) => {
      // console.log(message);
      // console.log(message.value);
      // console.log(JSON.parse(message.value));
      // const data = JSON.parse(message.value);
      // const data = JSON.parse(message);
      // console.log(data);
      // console.log(data.x.inputs[0].prev_out.value);
      // console.log(data.x.inputs[0].prev_out.value / 100000000);
      // const amount = data.x.inputs[0].prev_out.value / 100000000;
      // console.log(amount);
      // const dollars = amount * 19122;
      console.log('******Calculated Transaction consumer was called!*****');

      consumer.logger().error('consumer was called!');
      const newTransaction = {
        address: data.x.inputs[0].prev_out.addr,
        bitcoin: amount,
        dollars,
      };
      const calculatePartition = () => {
        if (dollars < 1000) return 0;
        if (dollars < 10000) return 1;
        return 2;
      };
      const x = calculatePartition();
      console.log('x is ', x);
      producer.send({
        topic: 'calculatedTransactions',
        messages: [
          {
            value: JSON.stringify(newTransaction),
            partition: x,
          },
        ],
      });
      console.log({ value: message.value.toString(), partition, topic });
    },
  });

  console.log(consumer);
  return consumer;
};

module.exports = createConsumer;
