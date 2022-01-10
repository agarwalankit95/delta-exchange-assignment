const express = require('express');
const path = require('path');
const port = process.env.port || 3000;
const app = express();

app.listen(port, () => {
  console.log('Server is listening on port: ', port);
});

const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.json());
app.use(express.static('public'));
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE, (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});