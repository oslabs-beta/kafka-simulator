const kafka = require('../kafkaConnection');

const admin = kafka.admin();

async function createAdminTopics() {
  await admin.connect();
  await admin.deleteTopics({
    topics: ['transactions', 'calculatedTransactions'],
  });

  setTimeout(async () => {
    await admin.createTopics({
      topics: [
        {
          topic: 'transactions',
          numPartitions: 3,
        },
        {
          topic: 'calculatedTransactions',
          numPartitions: 3,
        },
      ],
    });
    await admin.disconnect();
  }, 1000);
}

createAdminTopics();
