# LinkedIn-group-8-CMPE273

# Instructions

Download kafka version kafka_2.11-1.1.0

## start zookeeper

```
 bin/zookeeper-server-start.sh config/zookeeper.properties
```

## start Kafka

```
bin/kafka-server-start.sh config/server.properties
```

## register new topic

```
bin/kafka-topics.sh --create --zookeeper localhost:2183 --replication-factor 1 --partitions 1 --topic login_topic

```

---

## Start Backend-kafka

run

```
npm start
```

## start node server

run

```
nodemon index.js
```

## Run react server

run in Frontend folder

```
npm start
```
