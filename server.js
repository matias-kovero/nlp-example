const path = require('path');
const express = require('express');
const app = express();
const proxy = require('./src/setupProxy.js');

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
proxy(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Application running at http://localhost:%s', port);
});