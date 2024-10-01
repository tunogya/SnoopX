import { SNSClient } from "@aws-sdk/client-sns";

const client = new SNSClient({
  region: "us-east-2",
});

export default client;
