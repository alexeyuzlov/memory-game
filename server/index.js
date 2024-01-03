import {createServer} from "http";
import {Server} from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  serveClient: false,
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }
});

io.on("connection", (socket) => {
  console.info(`Client connected [id=${socket.id}]`);

  socket.on("disconnect", () => {
    console.info(`Client gone [id=${socket.id}]`);
  });

  socket.on("message", (data) => {
    console.info(`Message from ${socket.id}: ${data}`);
    io.emit("message", {
      type: data.type,
      payload: {
        ...data.payload,
        current: socket.id
      }
    });
  });
});

httpServer.listen(80);
console.info("Server listening on port 3000");
