exports.handler = function (event) {
  return fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${event.queryStringParameters.latitude},${event.queryStringParameters.longitude}&types=pharmacy&rankby=distance&key=${process.env.GMAP_API_KEY}&sensor=true`,
  )
    .then((res) => res.json())
    .then((res) => ({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, OPTION",
      },
      body: JSON.stringify(res),
    }));
};
