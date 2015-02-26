var
  config = require('config'),
  Githook = require('./lib/githook');

var githook = new Githook({}, function (err, details) {
  console.log('Joobot is listening at http://%s:%s', details.host, details.port);
  githook.on('push', function (eventdata) {

  });
  githook.on('pull_request', function (eventdata) {
    console.log(eventdata);
  });
});


