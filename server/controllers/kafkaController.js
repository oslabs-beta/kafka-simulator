const createNewEvent = require('../kafka/producer');
const { kafka } = require('../kafka/kafkaInstance');

// createProducer();

const kafkaController = {};

kafkaController.create = async (req, res, next) => {
  console.log(req.params.action);
  const payload = {
    topic: req.params.action,
    message: req.params.action + ' message',
  };
  if (payload.topic === 'admin') {
    const admin = kafka.admin();
    await admin.connect();
    const topicList = await admin.listTopics();
    // console.log(topics);
    console.log('>>>>>>>>>');
    const topicMetadata = await admin.fetchTopicMetadata({ topics: ['user'] });
    console.log(JSON.stringify(topicMetadata, null, 2));
    // const clusters = await admin.describeCluster();
    // console.log(clusters);
    console.log(JSON.stringify(await admin.describeGroups(['user']), null, 2));
    await admin.disconnect();
  } else {
    createNewEvent(payload);
  }
  res.locals.payload = payload;
  next();
};

module.exports = kafkaController;
