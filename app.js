const http = require('http');
const port = process.env.PORT || 9000

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('<h1>Hello World</h1>');
});

server.listen(port,() => {
  console.log(`Server running at port `+port);
});