const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

const PORT = 4000;
var http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket) {
  socket.on("room", function (user_id) {
    socket.join("room", () => {
      console.log(user_id + "방입장");
    });
  });

  socket.on("send message", (messageObject) => {
    console.log(`${messageObject.name}: ${messageObject.body}`);
    io.to("room").emit(
      "message",
      `${messageObject.name}: ${messageObject.body}`
    );
  });
});

http.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
