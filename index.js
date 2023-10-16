import mongoose from "mongoose";
import bodyParser from "body-parser";
import env from "./src/configs/env.json";

const express = require("express");
const errorHandler = require("./src/handlers/error-handler");
const routes = require("./src/routes/route");

const app = express();

// mongoDB

mongoose.Promise = global.Promise;
mongoose.connect(env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  bodyParser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello_World_...");
});

app.use("/api/v1/", routes);

app.use(errorHandler.notFound);

app.listen(env.PORT, () => {
  console.log(`\x1B[35mServer listening on port: ${env.PORT}`);
});
