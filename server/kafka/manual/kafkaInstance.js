const { Kafka, logLevel } = require('kafkajs');
const winston = require('winston');
const createConsumer = require('./consumer');

const toWinstonLogLevel = (level) => {
  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return 'error';
    case logLevel.WARN:
      return 'warn';
    case logLevel.INFO:
      return 'info';
    case logLevel.DEBUG:
      return 'debug';
  }
};

const WinstonLogCreator = (logLevel) => {
  const logger = winston.createLogger({
    level: toWinstonLogLevel(logLevel),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'myapp.log' }),
    ],
  });

  return ({ namespace, level, label, log }) => {
    const { message, ...extra } = log;
    logger.log({
      level: toWinstonLogLevel(level),
      message,
      extra,
    });
  };
};

const kafkaInstance = new Kafka({
  clientId: 'brocoin',
  brokers: ['localhost:9092'],
  logLevel: logLevel.DEBUG,
  logCreator: WinstonLogCreator,
});

// function createConsumers() {
const userConsumer = createConsumer(kafkaInstance, 'user');
// const listingConsumer = createConsumer(kafkaInstance, 'listing');
// const reviewConsumer = createConsumer(kafkaInstance, 'review');
// }
//
// createConsumers();

module.exports = kafkaInstance;
