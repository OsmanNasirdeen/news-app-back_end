import fetch from "node-fetch";

let currentDate = new Date().toJSON().slice(0, 10);

const displayResponse = (response, res) => {
  response.json().then((data) => {
    const { articles } = data;
    res.json({ articles: articles });
  });
};

const allNews = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  fetch(process.env.api_url_2)
    .then((response) => {
      displayResponse(response, res);
    })
    .catch((error) => {
      res.send(
        `<h2> oops! server is down please try again in few minutes </h2>`
      );
    });
};

const searchedNews = (req, res) => {
  const { search } = req.params;
  res.header("Access-Control-Allow-Origin", "*");
  fetch(
    `https://newsapi.org/v2/everything?q=+${search}&language=en&to=${currentDate}&pageSize=4&apiKey=${process.env.api_key}`
  )
    .then((response) => {
      displayResponse(response, res);
    })
    .catch((error) => {
      console.log(error);
    });
};

const categoryNews = (req, res) => {
  const { category } = req.query;
  res.header("Access-Control-Allow-Origin", "*");

  fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=5&apiKey=${process.env.api_key}`
  )
    .then((response) => {
      displayResponse(response, res);
    })
    .catch((error) => {
      console.log(error);
    });
};
// const specificCountryNews = (req, res) => {
//   const { country } = req.query;
//   res.header("Access-Control-Allow-Origin", "*");

//   fetch(
//     `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=5&apiKey=${process.env.api_key}`
//   )
//     .then((response) => {
//       displayResponse(response, res);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export { allNews, searchedNews, categoryNews };
