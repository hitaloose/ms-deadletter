import express from "express";
import { S3 } from "aws-sdk";

const credentials = {
  id: "AKIAWUX6FASKVO7PNKNZ",
  private: "Ozvi9iY7dnoF/iKK38HK+0vbanZ0IGleVKXn9Plq",
};

const s3 = new S3({
  region: "us-east-2",
  apiVersion: "2006-03-01",
  credentials: {
    accessKeyId: credentials.id,
    secretAccessKey: credentials.private,
  },
});

const BUCKET = "fojat96378";

const app = express();

app.use(express.json());

app.post("/handler", async (req, res) => {
  const data = JSON.parse(
    Buffer.from(req.body.message?.data, "base64").toString("utf-8")
  );

  const jsonLog: any = {};
  jsonLog.type = "@HANDLER";
  jsonLog.body = req.body;
  jsonLog.data = data;

  const params: S3.PutObjectRequest = {
    Bucket: BUCKET,
    Body: JSON.stringify(jsonLog, null, 2),
    Key: `log/${new Date().getTime()}.json`,
    ACL: "public-read",
  };

  await s3.upload(params).promise();

  if (data.error) {
    throw new Error();
  }

  console.log("Handler");
  res.send();
});

app.post("/deadletter", async (req, res) => {
  const data = JSON.parse(
    Buffer.from(req.body.message?.data, "base64").toString("utf-8")
  );

  const jsonLog: any = {};
  jsonLog.type = "@DEAD_LETTER";
  jsonLog.body = req.body;
  jsonLog.data = data;

  const params: S3.PutObjectRequest = {
    Bucket: BUCKET,
    Body: JSON.stringify(jsonLog, null, 2),
    Key: `log/${new Date().getTime()}.json`,
    ACL: "public-read",
  };

  await s3.upload(params).promise();

  console.log("Deadletter");
  res.send();
});

export { app };
