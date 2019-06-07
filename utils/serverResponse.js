module.exports = function (res, data) {
  res.writeHead(200, {
    'content-type': 'text/plain'
  });
  res.write(JSON.stringify(data));
  res.end();
};
