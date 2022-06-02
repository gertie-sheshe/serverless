exports.handler = async (event) => {
  console.log("QUERYYY", event.queryStringParameters);
  const { name } = event.queryStringParameters;
  return {
    statusCode: 200,
    body: `Your name is ${name}!`,
  };
};
