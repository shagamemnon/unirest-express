var express = require('express');
var router = express.Router();
var unirest = require('unirest');
const Parse = require('parse/node')
const config = require('../configs/parse')

Parse.initialize(config.parse.appKey, config.parse.masterKey)
Parse.serverURL = config.parse.serverURL

const storeDocTitles = (response) => {
  let ids = [];

  for (i in response.body) {
    ids.push(response.body[i])
  }
  ids.map(function(i) {
    var title = i.thread.title;
    var RecentThreads = Parse.Object.extend('RecentThreads')
    var recentThreads = new RecentThreads()
    recentThreads.set('threadStr', title)
    recentThreads.save(null, {})
  })
  return ids;
}

const doQuip = (endpoint, res) => {
  unirest.get(endpoint)
    .headers({
      'Authorization': 'Bearer QldaQU1BNThjbEI=|1548314271|8qEUd/JMvOyokHQ0ZnOhWhkGb/t4V71Po82eJYlEDgM='
    })
    .send({
      "parameter": 23,
      "foo": "bar"
    })
    .end(function(response) {
      res.send(storeDocTitles(response))
    })
}

router.get('/', function(req, res) {
  doQuip('https://platform.quip.com/1/threads/recent', res)
})

module.exports = router;