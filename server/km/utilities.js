const messageMap = {
  'Response Produce': 'producer',
};

module.exports = {
  transformLogData: (log) => {
    const data = {};
    data.type = 'producer';
    data.level = log.level;
    data.timestamp = log.extra.timestamp;
    data.broker = log.extra.broker;
    data.clientId = log.extra.clientId;
    data.correlationId = log.extra.correlationId;
    data.size = log.extra.size;
    data.topics = log.extra.data.topics;
    return data;
  },
};
