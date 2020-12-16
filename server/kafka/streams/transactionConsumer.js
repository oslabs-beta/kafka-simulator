const kafka = require("./kafkaInstance");

const createConsumer = async (kafkaInstance, topic) => {
  const consumer = kafkaInstance.consumer({
    groupId: topic,
  });
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  const producer = await kafka.producer();
  await producer.connect();

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value);
      // const amount = data.x.inputs[0].prev_out.value / 100000000;
      // const dollars = amount * 19122;
      // consumer.logger().error('consumer was called!');
      // const newTransaction = {
      //   address: data.x.inputs[0].prev_out.addr,
      //   bitcoin: amount,
      //   dollars,
      // // };
      // const calculatePartition = () => {
      //   if (dollars < 1000) return 0;
      //   if (dollars < 10000) return 1;
      //   return 2;
      // };
      // const x = calculatePartition();
      // console.log("x is ", x);
      // producer.send({
      //   topic: "calculatedTransactions",
      //   messages: [
      //     {
      //       value: JSON.stringify(newTransaction),
      //       partition: x,
      //     },
      //   ],
      // });
      // console.log({ value: message.value.toString(), partition, topic });
    },
  });

  console.log(consumer);
  return consumer;
};

module.exports = createConsumer;
