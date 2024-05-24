import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  brokers: ['easy-hog-14441-us1-kafka.upstash.io:9092'],
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: '********',
    password: '********'
  },
  logLevel: logLevel.ERROR,
});

export default kafka