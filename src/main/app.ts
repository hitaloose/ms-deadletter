import express from "express";

const app = express();

app.use(express.json());

app.post("/handler", (req, res) => {
  const data = JSON.parse(
    Buffer.from(req.body.message?.data, "base64").toString("utf-8")
  );

  console.log(data);

  if (data.error) {
    throw new Error();
  }

  res.send();
});

app.post("/deadletter", (req, res) => {
  console.log(req.body);

  res.send();
});

export { app };
