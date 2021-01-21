exports.handler = async function http (req) {
    return {
      statusCode: 201,
      headers: {'content-type': 'application/json; charset=utf8'},
      body: JSON.stringify(process.env),
      cors: true,
    }
  }