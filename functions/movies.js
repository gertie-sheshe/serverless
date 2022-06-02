const { URL } = require("url");
const fetch = require("node-fetch");
const movies = require("../data/movies.json");

exports.handler = async () => {
  const api = new URL("https://www.omdbapi.com");

  console.log("APII", api);

  // set secret key to the query string
  api.searchParams.set("apikey", process.env.OMDB_API_KEY);

  const promises = movies.map((movie) => {
    // use movie imdb id to lookup details
    api.searchParams.set("i", movie.id);

    return fetch(api)
      .then((res) => res.json())
      .then((data) => {
        const scores = data.Ratings;

        return {
          ...movie,
          scores,
        };
      });
  });

  const movieWithRatings = await Promise.all(promises);

  return {
    statusCode: 200,
    body: JSON.stringify(movieWithRatings),
  };
};
