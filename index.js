const http = require('http');
const url = require('url');
const port = 6060;

const DataBaseController = require('./controllers/DataBaseController');

http.createServer(function (req, res) {
  req['path'] = url.parse(req.url).pathname;

  let dbController = new DataBaseController(req, res);
  dbController.selectRoute();
}).listen(port);
console.log(`Server is listening and on port: ${port}`);
