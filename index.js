// const http = require('http');
// const url = require('url');
// const port = 6060;
// const controllers = require('./controllers');

// http.createServer(function (req, res) {
//   req['path'] = url.parse(req.url).pathname;

//   for (let controller of controllers) {
//     if (!controller(req, res)) {
//       break;
//     }
//   }
// }).listen(port, () => console.log(`Server is listening and on port: ${port}`));

const env = process.env.NODE_ENV || 'development';
const settings = require('./config/express/settings')[env];
const app = require('express')();

require('./config/express/express')(app);
require('./config/express/router')(app);

app.listen(settings.port);
console.log(`Server listening on port ${settings.port}...`);
