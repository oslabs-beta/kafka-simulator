const kafka = require("../kafkaConnection");

const admin = kafka.admin();

async function refreshAdminTopics() {
  await admin.connect();

  // Add any additional topics to refresh to the "topics" array pashed to deleteTopics
  await admin.deleteTopics({
    topics: ["transactions", "calculatedTransactions"],
  });

  // Deletion of the topics happens within Kafka, as opposed to within Javascript, requiring a set timeout to
  // make sure that we are not recreating the deleted topics prior to them having been deleted with Kafka
  // 3 partitions are standard per topic
  setTimeout(async () => {
    await admin.createTopics({
      topics: [
        {
          topic: "transactions",
          numPartitions: 3,
        },
        {
          topic: "calculatedTransactions",
          numPartitions: 3,
        },
      ],
    });
    await admin.disconnect();
  }, 1000);
}

refreshAdminTopics();
