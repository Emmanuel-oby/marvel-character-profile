const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const md5 = require("blueimp-md5");
const axios = require("axios");
require("dotenv").config();
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

PUBLIC_KEY = process.env.PUBLIC_KEY;
PRIVATE_KEY = process.env.PRIVATE_KEY;
const ts = Number(new Date().getDate());
const stringToHash = ts + PRIVATE_KEY + PUBLIC_KEY;
const hash = md5(stringToHash);

console.log(ts);
console.log(PUBLIC_KEY);
console.log(hash);

const baseUrl = "https://gateway.marvel.com:443/v1/public/comics";
const url = `${baseUrl}?apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hash}`;
console.log(url);

// app.get("/", (req, res) => {
//   const data = https.get(url, (response) => {
//     console.log(response.statusCode);
//   });
//   console.log(data);
//   res.render("home");
// });

// METHOD 1

// app.get("/", async (req, res) => {
//   await axios
//     .get(url)
//     .then((response) => {
//       res.status(200).json(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(400).json("failed");
//     });
// });

// METHOD 2

app.get("/", async (req, res) => {
  await axios
    .get(baseUrl, { params: { apikey: PUBLIC_KEY, ts: ts, hash: hash } })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json("failed");
    });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
