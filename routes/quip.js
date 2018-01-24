var express = require('express');
var router = express.Router();
var unirest = require('unirest');
const Parse = require('parse/node')
const config = require('../configs/config')

Parse.initialize(config.parse.appKey, config.parse.masterKey)
Parse.serverURL = config.parse.serverURL

const storeEntries = (response, className) => {
  let entries = [];

  for (i in response.body) {
    entries.push(response.body[i])
  }
  entries.map(function(i) {
    var title = i.thread.title;
    var SomeClass = Parse.Object.extend(className)
    var someClass = new SomeClass()
    someClass.set(`${className}`, title)
    someClass.save(null, {})
  })
  return entries;
}

const doQuip = {
  getThreads(endpoint, res) {
    unirest.get(endpoint)
      .headers(config.quip)
      .send({
        "parameter": 23,
        "foo": "bar"
      })
      .end(function(response) {
        res.send(storeEntries(response, 'threads'))
      })
  }
}

router.get('/', function(req, res) {
  doQuip.getThreads('https://platform.quip.com/1/threads/recent', res)
})

module.exports = router;