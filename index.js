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

// Add custom routes before JSON Server router
server.get("/screen/home", (req, res) => {
  const response = {
    status: "ok",
    data: {
      notification: "Your employer just deposited $10 in your account.",
      balance: 255,
      saved: db.saved,
      market: db.products,
      content: db.posts,
    },
  };

  res.status(200).jsonp(response);
});

server.get("/screen/content", (req, res) => {
  const posts = db.posts;
  const response = {
    status: "ok",
    data: { posts },
  };

  res.status(200).jsonp(response);
});

server.get("/screen/market", (req, res) => {
  const response = {
    status: "ok",
    data: {
      header: [
        {
          id: 1,
          title: "MOLEKULE",
          body: "A new professional-grade air purifier",
          earn: { type: "percentage", amount: 8 },
          image:
            "https://atmz-develo.s3.eu-central-1.amazonaws.com/imagemarketheader.png",
        },
        {
          id: 2,
          title: "MOLEKULE 2",
          body: "2 A new professional-grade air purifier",
          earn: { type: "percentage", amount: 5 },
          image:
            "https://atmz-develo.s3.eu-central-1.amazonaws.com/imagemarketheader.png",
        },
      ],
      saved: db.saved,
      new: db.new,
      streams: [
        { id: 1, title: "Body", items: db.products },
        { id: 2, title: "Mind", items: db.products[1] },
      ],
    },
  };

  res.status(200).jsonp(response);
});

server.get("/screen/product/:productId", (req, res) => {
  console.log(req.params.productId);
  const productId = parseInt(req.params.productId, 10);

  const product = db.products.find((product) => product.id === productId);

  if (product == null) {
    res.status(400).jsonp({ status: "error", error: "product not existing" });
  }
  const response = {
    status: "ok",
    data: {
      product,
    },
  };

  res.status(200).jsonp(response);
});

server.get("/screen/service/:serviceId", (req, res) => {
  console.log(req.params.serviceId);
  const serviceId = parseInt(req.params.serviceId, 10);

  const service = db.services.find((service) => service.id === serviceId);

  if (service == null) {
    res.status(400).jsonp({ status: "error", error: "service not existing" });
  }
  const response = {
    status: "ok",
    data: {
      service,
    },
  };

  res.status(200).jsonp(response);
});

server.get("/screen/content/:contentId", (req, res) => {
  console.log(req.params.contentId);
  const contentId = parseInt(req.params.contentId, 10);

  const content = db.posts.find((content) => content.id === contentId);

  if (content == null) {
    res.status(400).jsonp({ status: "error", error: "content not existing" });
  }

  content.related = [db.posts[1]];
  const response = {
    status: "ok",
    data: {
      content,
    },
  };

  res.status(200).jsonp(response);
});

server.use(router);

server.listen(port);
