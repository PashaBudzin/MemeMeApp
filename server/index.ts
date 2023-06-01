import express from "express";
import { config } from "dotenv";
import * as http from "http";

import path from "path";
import getIo from "./socket";
import requireDir from "require-dir";
config();

const routes = requireDir("./routes");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

getIo(server);


Object.keys(routes).forEach(route => {
  app.use(`/api/${route}`, routes[route].default)
})

app.use("/", express.static(path.join(__dirname, "client")))

app.get("/t", (req, res) => {
  res.sendFile(path.join(__dirname, "io.html"));
});

server.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});
