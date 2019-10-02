const http = require('http');
const url = require('url');
const port = 6060;
const controllers = require('./controllers');

http.createServer(function (req, res) {
  req['path'] = url.parse(req.url).pathname;

  for (let controller of controllers) {
    if (!controller(req, res)) {
      break;
    }
  }
}).listen(port, () => console.log(`Server is listening and on port: ${port}`));
