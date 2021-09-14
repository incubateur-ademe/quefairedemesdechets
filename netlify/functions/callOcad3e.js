const axios = require('axios')

exports.handler = function (event) {
  return axios
    .get(
      `https://www.bddpdcrep.fr/webservice.php?key=${process.env.OCAD3E_API_KEY}&method=getPlacemarks&format=json&lat=${event.queryStringParameters.latitude}&lng=${event.queryStringParameters.longitude}&wasteCategories[]=${event.queryStringParameters.category}`
    )
    .then((res) => ({
      statusCode: 200,
      header: JSON.stringify({ 'Access-Control-Allow-Origin': '*' }),
      body: JSON.stringify(res.data),
    }))
}
