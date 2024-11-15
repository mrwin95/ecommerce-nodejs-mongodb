docker run -d --name redis -p 6379:6379 -e REDIS_PASSWORD=Thang123 --health-cmd="redis-cli -h localhost -a Thang123 PING" --health-interval=30s --health-timeout=10s --health-start-period=30s --health-retries=3 redis:latest


docker run -d --name kafka_broker --network kafka-net -p 9092:9092 -e KAFKA_NODE_ID=1 -e KAFKA_PROCESS_ROLES=broker,controller -e KAFKA_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT -e KAFKA_CONTROLLER_QUORUM_VOTERS=1@localhost:9093 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -e KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=1 -e KAFKA_TRANSACTION_STATE_LOG_MIN_ISR=1 -e KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS=0 -e KAFKA_NUM_PARTITIONS=3 --health-cmd="/opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --list" --health-interval=30s --health-timeout=5s --health-retries=3 --health-start-period=30s apache/kafka:latest

docker run -d -p 15672:15672 -p 5672:5672 --name rabbitmq --health-cmd="rabbitmqctl status" --health-interval=30s --health-timeout=5s --health-retries=3 --health-start-period=30s rabbitmq:management


docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=Thang123 --health-cmd="mongosh --eval 'db.runCommand({ping: 1})'" --health-interval=30s --health-timeout=5s --health-retries=3 --health-start-period=30s -p 27017:27017 mongo:5
