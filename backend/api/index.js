import express from "express";
import cors from "cors";
import { createClient } from "@vercel/kv";

const app = express();
const PORT = 8008;

app.use(express.json());
app.use(cors());

const redis = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN
});


app.get("/", (req, res) => {
  
  pingRedis();

  res.send(
    "Connected to webEMDR Backend Server | \u00A9 Balkite Corporation 2023"
  );

});

async function pingRedis() {
  const val = await redis.ping();
  console.log(val)
}


async function setSession(req) {
  await redis.set(req.body.code, {
    play: req.body.play ? req.body.play : 0,
    speed: req.body.speed,
  });

}

async function getSession(req) {
  return await redis.get(req.body.code);
}

app.post("/", (req, res) => {
  if (req.body.type == "create") {
    console.log("Create: ", req.body);

    try {
      setSession(req);
      return res.status(201).send("Session Created");
    } catch (err) {
      return res.status(500).send("Could Not Make Session");
    }
  }
  if (req.body.type == "update") {
    console.log("Update: ", req.body);

    try {
      setSession(req);
      return res.status(201).send("Session Updated");
    } catch (err) {
      return res.status(500).send("Session Could Not be Updated");
    }
  }
  if (req.body.type == "enter") {
    console.log("Enter Session: ", req.body);

    try {
      getSession(req).then((entered) => {
        if (entered) {
          console.log("Session Accessed");
          return res.status(200).send({
            sessionId: req.body.code,
            play: entered.play,
            speed: entered.speed,
          });
        } else {
          console.log("No Matching Session");
          return res.status(204).send("No Matching Session");
        }
      });
    } catch (err) {
      return res.status(500).send("An Error Occured");
    }
  }
});

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
