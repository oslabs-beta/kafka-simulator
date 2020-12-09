const kafkaInstance = require('../kafka/manual/kafkaInstance');
const { createNewEvent } = require('../kafka/manual/producer');

// const kafkaInstance = kafkaInstance;
const producer = kafkaInstance.producer();

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo vehicula est eu ornare. Vivamus consequat tristique pretium. Mauris convallis justo non elementum eleifend. Ut vel nulla eu tellus vehicula tristique. Donec quis nisi vel diam hendrerit venenatis ut ac tortor. Nullam aliquet dolor ut est placerat, in tincidunt nulla consectetur. Nulla facilisi. Praesent dapibus est facilisis magna posuere ullamcorper. Etiam tincidunt eget tortor sed finibus. Ut sed metus sit amet justo rutrum fermentum eu nec felis. Nulla tempor ligula vel egestas consectetur. Nulla quis ex vel ipsum condimentum congue. Maecenas nulla mauris, vestibulum sed lorem id, accumsan mollis risus. Proin sed auctor arcu. Integer vehicula quam in libero tincidunt pulvinar. Phasellus ullamcorper varius quam, pulvinar vulputate purus finibus eget.

In id turpis in ipsum porta venenatis vulputate vulputate sem. Morbi eleifend sed diam in suscipit. Sed lobortis ipsum sed ultrices vehicula. Mauris at ante diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer ipsum nisi, posuere auctor nisl sit amet, scelerisque efficitur felis. Phasellus dolor urna, dapibus id mi vitae, fermentum viverra urna. Mauris elit ipsum, rutrum eu libero eu, euismod eleifend ex. Praesent a varius nibh, a lacinia lectus. Fusce nisl ligula, consectetur sit amet ex et, malesuada consectetur urna.

Mauris pellentesque libero vitae enim condimentum accumsan. Suspendisse eu est id augue consectetur porttitor. Nullam ut ornare est. Donec eu lacus velit. Praesent non leo vulputate, hendrerit urna eu, cursus metus. Cras sagittis felis dolor, ut tempus mi lobortis id. Cras facilisis dignissim vehicula. Sed fermentum vestibulum leo a varius. Morbi et vestibulum lacus. Phasellus at sem enim. Phasellus rutrum faucibus felis auctor viverra. Nulla risus quam, tristique a risus ac, blandit dignissim lacus. Sed vel fermentum ipsum. Suspendisse ut lacinia odio. Maecenas iaculis ante at elit lacinia suscipit. Fusce mauris nisl, tristique eu nisi in, tincidunt volutpat nulla.

Ut cursus eget diam in auctor. Aliquam sit amet mi ut augue rhoncus tristique sed in ligula. Sed porttitor ut eros eu vulputate. Quisque porta molestie justo quis egestas. Sed laoreet accumsan tellus id rutrum. Fusce semper mollis diam. Donec eu accumsan mauris. Morbi eget sagittis nunc, eget vehicula tellus. Morbi quis ornare felis. Sed eget placerat dolor. Morbi molestie porttitor neque at congue. Mauris iaculis tincidunt nisi, et pellentesque quam fermentum sit amet. Duis et justo imperdiet, rhoncus sem in, egestas tortor. In hac habitasse platea dictumst. Fusce quis sapien bibendum, rutrum eros vel, accumsan sem. Suspendisse sodales quam eu erat posuere efficitur.

Nullam sodales, felis et posuere semper, turpis velit consectetur est, eget laoreet lectus ligula in massa. Phasellus ultrices leo lectus, cursus euismod quam vestibulum in. Fusce non euismod justo. Fusce sagittis pretium accumsan. Proin sem mi, elementum eget libero tristique, tincidunt sodales orci. Sed venenatis augue nisl, quis convallis purus elementum nec. Pellentesque pretium luctus laoreet. Nulla et mauris ut nisi varius fermentum. Integer et elementum justo. Nullam convallis turpis vel lorem tincidunt, ac blandit orci euismod. Nullam feugiat, neque id mattis dapibus, mauris tortor tempus risus, sit amet eleifend tellus tellus sed lorem. Maecenas ut purus eu nunc pretium imperdiet vel eu ipsum. Vestibulum convallis mollis diam, id tempor sapien laoreet id. Quisque finibus purus vel elit facilisis, nec pulvinar elit ornare.`;

const kafkaController = {};

kafkaController.create = async (req, res, next) => {
  console.log(req.params.action);
  const payload = {
    topic: req.params.action,
    message: req.params.action + ' message ' + loremIpsum,
  };
  if (payload.topic === 'admin') {
    const admin = kafka.admin();
    await admin.connect();
    const topicMetadata = await admin.fetchTopicMetadata({ topics: ['user'] });
    console.log(JSON.stringify(topicMetadata, null, 2));
    await admin.disconnect();
  } else {
    createNewEvent(payload, producer);
  }
  res.locals.payload = payload;
  next();
};

module.exports = kafkaController;

// const clusters = await admin.describeCluster();
// console.log(clusters);
// console.log(JSON.stringify(await admin.describeGroups(['user']), null, 2));
// const topicList = await admin.listTopics();
