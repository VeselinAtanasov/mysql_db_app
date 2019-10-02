module.exports = (res, data) => {
  res.writeHead(200, {
    'content-type': 'text/plain'
  });
  res.write((typeof data === 'string') ? data : JSON.stringify(data));
  res.end();
};
