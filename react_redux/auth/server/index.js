const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const router = require("./router");

// morgan: logging framework for debugging
// body-parser: parse incoming request into json

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);