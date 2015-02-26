var
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  GitHubApi = require('github'),
  util = require('util'),
  EventEmitter = require('events').EventEmitter;

var Githook = module.exports = function (options, callback) {
  var self = this;

  options = util._extend(options, {
    port: 3000,
    github: {
      // required
      version: "3.0.0",
      // optional
      debug: true,
      protocol: "https",
      timeout: 5000,
      headers: {
        "user-agent": "joobot"
      }}
  });
  var github = new GitHubApi(options.github);

  app.use(bodyParser.json({limit: '1mb'}));
  app.set('x-powered-by', false);

  app.post('/github', function (req, res) {
    var eventID = req.headers['x-github-delivery'];
    var eventType = req.headers['x-github-event'];
    var payload = req.body;
    console.log('Received GitHub [' + eventType + '] event, with id ['+eventID+'].');
    self.emit(eventType, payload);
    res.status(200).send('OK');
  });

  var server = app.listen(process.env.PORT || options.port || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    return callback(null, {host: host, port: port});
  });
};

Githook.prototype.comment = function (options, callback) {
  return callback(null);
};

Githook.prototype.status = function (options, callback) {
  return callback(null);
};

util.inherits(Githook, EventEmitter);