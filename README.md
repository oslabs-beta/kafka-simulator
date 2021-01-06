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

To run the simulator:

1. first use script "npm run zookeeper" (zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties)
2. then execute script "npm run kafka" (kafka-server-start /usr/local/etc/kafka/server.properties)
3. finally, "npm run dev"

## Docker

1. First, we'll start **Zookeeper** and **Kafka** by running the following command (we're using the **spotify/kafka** container, which includes Zookeeper):

`docker run -p 2181:2181 -p 9092:9092 --env ADVERTISED_HOST=localhost --env ADVERTISED_PORT=9092 spotify/kafka`

2. Next we'll start **kafka-simulator**:

`npm run bitcoin` or `npm run yelp`

@todo: `docker run -p 3001:3001 -p 3030:3030 kafka-simulator`

3. Finally, we'll fire up **kafka-mirror**:

`docker run -p 3000:3000 -p 8080:8080 kafka-mirror`

---

`docker build -t kafka-mirror .`

`docker-compose -f docker-compose.yml up`

`docker run -p 3000:3000 -p 8080:8080 kafka-mirror`
