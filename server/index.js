const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "UserId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "vishva2003",
  database: "registrationlogin",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO userrs (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-axis-token"];

  if (!token) {
    res.send("hey, we need token ,please give it next time ");
  } else {
    jwt.verify(token, "jwtsecurity", (err, decoded) => {
      if (err) {
        res.send({ auth: false, message: "you are not authendicated" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("yes, you are authendicated congrats");
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM userrs WHERE username = ? ",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id }, "jwtsecurity", {
              expiresIn: 300,
            });
            req.session.user = result;
            res.json({ auth: true, token: token, result: result });
          } else {
            res.json({ auth: false, message: "wrong username and Password" });
          }
        });
      } else {
        res.json({ auth: false, message: "User Not Exists" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server Connected");
});
