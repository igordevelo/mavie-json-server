const jsonServer = require("json-server");
const server = jsonServer.create();
const db = require("./db.js");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);
