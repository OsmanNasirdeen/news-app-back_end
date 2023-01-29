import fetch from "node-fetch";
import express from "express";
import dotenv from "dotenv";
const app = express();
const port = process.env.PORT || 7000;

dotenv.config();

let currentDate = new Date().toJSON().slice(0, 10);

const displayResponse = (response, res) => {
  response.json().then((data) => {
    const { articles } = data;
    res.json({ articles: articles });
  });
};

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  fetch(process.env.api_url_2)
    .then((response) => {
      response.json().then((data) => {
        const { articles } = data;
        res.json({ articles: articles });
      });
    })
    .catch((error) => {
      res.send(
        `<h2> oops! server is down please try again in few minutes </h2>`
      );
    });
});

app.get("/:search", (req, res) => {
  const { search } = req.params;
  fetch(
    `https://newsapi.org/v2/everything?q=+${search}&language=en&to=${currentDate}&pageSize=4&apiKey=${process.env.api_key}`
  )
    .then((response) => {
      displayResponse(response, res);
    })
    .catch((error) => {
      console.log(error);
    });
});
app.get("/category/:search", (req, res) => {
  const { search } = req.params;
  fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${search}&apiKey=${process.env.api_key}`
  )
    .then((response) => {
      displayResponse(response, res);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`server is listening at port:${port}  `);
});
