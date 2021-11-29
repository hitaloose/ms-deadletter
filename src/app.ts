import express from "express";

const app = express();

app.use(express.json());

app.post("/handler", (req, res) => {
  console.log("@HANDLER");
  console.log(req.body);

  const data = JSON.parse(
    Buffer.from(req.body.message?.data, "base64").toString("utf-8")
  );

  if (data.error) {
    throw new Error();
  }

  console.log(data);

  res.send();
});

app.post("/deadletter", (req, res) => {
  console.log("@DEAD_LETTER");
  console.log(req.body);

  const data = JSON.parse(
    Buffer.from(req.body.message?.data, "base64").toString("utf-8")
  );

  console.log(data);

  res.send();
});

export { app };
