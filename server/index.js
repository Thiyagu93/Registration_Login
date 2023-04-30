const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "loginreg",
});

app.post("/register", (req, res) => {
  db.query("INSERT INTO loginreg (username, password) VALUES (?,?)"),
    [username, password],
    (err, result) => {
      console.log(err);
    };
});

app.listen(3001, () => {
  console.log("Server Connected");
});
