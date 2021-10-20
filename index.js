const jsonServer = require("json-server");
const server = jsonServer.create();
const db = require("./db.json");
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;
const axios = require("axios");

server.use(middlewares);
server.use(jsonServer.bodyParser);

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

server.post("/auth/email/login", (req, res) => {
  const { email } = req.body;
  if (email == null) {
    res.status(400).jsonp({
      success: false,
      status: "error",
      error: "email:string parameter missing",
    });
  }

  if (typeof email !== "string") {
    res.status(400).jsonp({
      success: false,
      status: "error",
      error: "email should be string",
    });
  }

  const userFound = db.users.find((user) => user.email === email);

  if (userFound == null) {
    res.status(400).jsonp({ success: false, error: "user not existing" });
  }

  res.status(200).jsonp({ success: true, status: "ok" });
});

server.post("/auth/email/verify", (req, res) => {
  const { email, token } = req.body;
  if (email == null) {
    res.status(400).jsonp({
      error: "email:string parameter missing",
    });
  }

  if (token == null) {
    res.status(400).jsonp({
      error: "token:string parameter missing",
    });
  }

  const userFound = db.users.find(
    (user) => user.email === email && user.token === token
  );

  if (userFound == null) {
    res.status(400).jsonp({
      status: "error",
      success: false,
      error: "user not existing or token not valid",
    });
  }

  res.status(200).jsonp({
    status: "ok",
    success: true,
    tokens: { access: uuidv4(), refresh: uuidv4() },
    data: userFound,
  });
});

server.post("/auth/phone/login", (req, res) => {
  const { phone } = req.body;
  if (phone == null) {
    res.status(400).jsonp({
      success: false,
      status: "error",
      error: "phone:string parameter missing",
    });
  }

  if (typeof phone !== "string") {
    res.status(400).jsonp({
      success: false,
      status: "error",
      error: "phone should be string",
    });
  }

  const userFound = db.users.find((user) => user.phone === phone);

  if (userFound == null) {
    res.status(400).jsonp({ success: false, error: "user not existing" });
  }

  res.status(200).jsonp({ success: true, status: "ok" });
});

server.post("/auth/phone/verify", (req, res) => {
  const { phone, code } = req.body;
  if (phone == null) {
    res.status(400).jsonp({
      error: "phone:string parameter missing",
    });
  }

  if (code == null) {
    res.status(400).jsonp({
      error: "code:string parameter missing",
    });
  }

  const userFound = db.users.find(
    (user) => user.phone === phone && user.code === code
  );

  if (userFound == null) {
    res.status(400).jsonp({
      status: "error",
      success: false,
      error: "user not existing or code not valid",
    });
  }

  res.status(200).jsonp({
    status: "ok",
    success: true,
    tokens: { access: uuidv4(), refresh: uuidv4() },
    data: userFound,
  });
});

// Add custom routes before JSON Server router
// deprecated
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

// function validateStringInput(stringParameter) {
//   if (stringParameter == null) {
//     return { success: false, error: `${stringParameter} is required` };
//   }

//   if (typeof stringParameter !== "string") {
//     return { success: false, error: `${stringParameter} should be a string` };
//   }

//   return { success: true };
// }

server.post("/account/register", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    secondaryEmail,
    country,
    city,
    state,
    yearOfBirth,
  } = req.body;

  if (firstName == null) {
    res.status(400).jsonp({
      status: "error",
      error: "firstName is required",
    });
  }

  axios.post("http://localhost:3000/users", req.body).then(function (response) {
    console.log(response)
    console.log("user added");
    res.status(200).jsonp({ status: "ok", data: req.body });
  });
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
