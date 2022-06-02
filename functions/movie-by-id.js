const movies = require("../data/movies.json");

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  console.log("");
  const filteredMovie = movies.find((movie) => movie.id === id);

  if (!filteredMovie) {
    return {
      statusCode: 404,
      body: "No movie found!",
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(filteredMovie),
  };
};
