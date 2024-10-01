import { SQSClient } from "@aws-sdk/client-sqs";

const client = new SQSClient({
  region: "us-east-2",
});

export default client;
