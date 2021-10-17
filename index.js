const jsonServer = require("json-server");
const server = jsonServer.create();
const db = require("./db.js");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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
    });
  }

  res.status(200).jsonp({ status: "ok" });
});

// Add custom routes before JSON Server router
server.post("/auth/verify-code", (req, res) => {
  const { code } = req.body;
  if (code == null) {
    res.status(400).jsonp({
      status: "error",
      error: "code:string parameter missing",
    });
  }

  if (typeof code !== "string") {
    res.status(400).jsonp({
      status: "error",
      error: "code should be string",
    });
  }

  const userFound = db.users.find((user) => user.code === code);

  if (userFound == null) {
    res.status(400).jsonp({
      status: "error",
      error: "user with this code not existing",
    });
  }

  userFound.authData = {
    accessToken: uuidv4(),
    refreshToken: uuidv4(),
  };

  res.status(200).jsonp({ status: "ok", data: userFound });
});

server.use(router);

server.listen(port);
