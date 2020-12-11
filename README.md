# kafka-simulator

A Kafka simulator app

```js
data = {
  type: 'producer',
  level: 'debug',
  timestamp,
  broker,
  clientId,
  correlationId,
  size,
  topics: [
    {
      topicName,
      partitions: [
        partition,
        errorCode,
        baseOffset,
        logAppendTime,
        logStartOffset,
      ],
    },
  ],
};
```

- Response Produce => producer
- Response Metadata => metadata
