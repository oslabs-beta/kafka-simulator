# kafka-simulator

A Kafka simulator app

```js
data = {
  type: "producer",
  level: "debug",
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

To run the simulator:

1. first use script "npm run zookeeper" (zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties)
2. then execute script "npm run kafka" (kafka-server-start /usr/local/etc/kafka/server.properties)
3. finally, "npm run dev"
