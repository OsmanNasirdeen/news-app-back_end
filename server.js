import express from "express";
import dotenv from "dotenv";
import {
  allNews,
  searchedNews,
  categoryNews,
} from "./routesControllers/controllers.js";
const app = express();
const port = process.env.PORT || 7000;

dotenv.config();

app.get("/", allNews);

app.get("/top-headlines/:search", searchedNews);

app.get("/top-headlines?", categoryNews);

app.listen(port, () => {
  console.log(`server is listening at port:${port}  `);
});
