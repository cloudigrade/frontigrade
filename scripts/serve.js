const compression = require('compression');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.resolve(__dirname, '../build');

// Apply options
app.use(compression(), express.static(publicDir));

// Setup for client side routing
app.get('/*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Basic listener
app.listen(port, () => {
  console.info(`\nYou can now view Cloud Meter in the browser.\n  Open: http[s]://localhost:[PORT]\n`);
});
