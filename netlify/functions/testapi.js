const axios = require('axios')

exports.handler = function (event) {
  return axios
    .get(
      `https://www.bddpdcrep.fr/webservice.php?key=${process.env.OCAD3E_API_KEY}&method=getPlacemarks&format=xml&lat=49.227&lng=2.403&wasteCategories[]=PILES`
    )
    .then((res) => ({
      statusCode: 200,
      body: res.data,
    }))
}
