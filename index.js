const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// const md5 = require("blueimp-md5")
const axios = require("axios");
require("dotenv").config()
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000


app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));




PUBLIC_KEY = process.env.PUBLIC_KEYS
PRIVATE_KEY = process.env.PRIVATE_KEY
const ts = Number(new Date().getDate());
const stringToHash = ts + PUBLIC_KEY + PRIVATE_KEY;
const hash = md5(stringToHash);


console.log(ts)
console.log(PUBLIC_KEY);

const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
const url = baseUrl + '&ts=' + ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash;
console.log(url)


app.get("/", (req, res)=>{
    const data = https.get(url, response=>{
        console.log(response.statusCode)
    })
    console.log(data);
    res.render("home")
})




app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})





