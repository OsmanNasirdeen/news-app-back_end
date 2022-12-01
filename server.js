import fetch from "node-fetch";
import express from "express";
import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 7000;

dotenv.config();

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  fetch(process.env.api_url)
    .then((response) => {
      response.json().then((data) => {
        const { articles } = data;
        res.json({ articles: articles });
      });
    })
    .catch((error) => {
      res.json({ articles: "server down! try again in few minutes" });
    });
});

app.listen(port, () => {
  console.log(`server is listening at port:${port}  `);
});
