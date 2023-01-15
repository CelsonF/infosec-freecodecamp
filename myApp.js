const express = require('express');
const helmet = require('helmet');
const app = express();

const actionFrameguard = { action: 'deny' };

const timeInSeconds = 90 * 24 * 3600;
const configHsts = {
  maxAge: timeInSeconds,
  force: true
};

const confSecurityPolicy = {
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com'],
  }
}

module.exports = app;
app.use(helmet.frameguard(actionFrameguard));
app.use(helmet.hsts(configHsts));
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());
app.use(helmet.contentSecurityPolicy(confSecurityPolicy));



const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
