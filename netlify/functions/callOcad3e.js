exports.handler = function (event) {
  return fetch(
    `https://www.bddpdcrep.fr/webservice.php?key=${process.env.OCAD3E_API_KEY}&method=getPlacemarks&lat=${event.queryStringParameters.latitude}&lng=${event.queryStringParameters.longitude}&wasteCategories[]=${event.queryStringParameters.category}`,
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
