const jsonServer = require("json-server");
const server = jsonServer.create();
const db = require("./db.js");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/auth/login", (req, res) => {
  const { identity } = req.body;
  if (identity == null) {
    res.status(400).jsonp({
      error: "identity:string parameter missing",
    });
  }

  if (typeof identity !== "string") {
    res.status(400).jsonp({
      error: "identity should be string",
    });
  }

  const userFound = db.users.find((user) => user.phone === identity);

  if (userFound == null) {
    res.status(400).jsonp({
      status: "error",
      error: "user with this code not existing",
    });
  }

  res.send({ status: "ok" });
});

// Add custom routes before JSON Server router
server.post("/auth/verify-code", (req, res) => {
  const { code } = req.body;
  if (code == null) {
    res.status(400).jsonp({
      error: "code:string parameter missing",
    });
  }

  if (typeof code !== "string") {
    res.status(400).jsonp({
      error: "code should be string",
    });
  }

  const userFound = db.users.find((user) => user.code === code);

  if (userFound == null) {
    res.status(400).jsonp({
      error: "user with this code not existing",
    });
  }

  res.send(userFound);
});

server.use(router);

server.listen(port);
