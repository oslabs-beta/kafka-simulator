const { Kafka, logLevel } = require('kafkajs');
const winston = require('winston');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { transformLogData } = require('./utilities');

const KafkaMirror = (props, port = 3030) => {
  let socket = null;

  io.on('connection', (socketConnection) => {
    socket = socketConnection;
    console.log(`Client is connected [id=${socket.id}]`);
    socket.on('disconnect', () => {
      console.log(`Client disconnected [id=${socket.id}]`);
    });
  });

  http.listen(port, () => {
    console.log(`listening on port ${port}`);
  });

  // const messageMap = {
  //   'Response Produce': 'producer',
  // }

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

    logger.stream({ start: -1 }).on('log', function (log) {
      if (socket) {
        if (log.message.indexOf('Response Produce') > -1) {
          const data = transformLogData(log);
          socket.emit('log', JSON.stringify(data, null, 2));
        }
      }
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

  const kafka = new Kafka({
    ...props,
    logLevel: logLevel.DEBUG,
    logCreator: WinstonLogCreator,
  });

  return kafka;
};

module.exports = KafkaMirror;
