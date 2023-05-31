import express from "express";
import { config } from "dotenv";
import * as http from "http";
import getIo from "./socket";
import path from "path";
config();


const app = express();
const server = http.createServer(app);
getIo(server);



const PORT = process.env.PORT || 3000;


app.get("/t", (req, res) => {
    res.sendFile(path.join(__dirname, "io.html"))
})

// app.listen(3001, () => console.log("app listening"))

server.listen(PORT, () => {
    console.info(`App listening on port ${PORT}`);
})