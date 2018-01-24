const config = {
  "cf": {
    "email": process.env.cfEmail,
    "key": process.env.cfApiKey,
    "zone": process.env.cfZone
  }
}

module.exports = config;