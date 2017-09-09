const express = require('express');
const app = express();
const PORT = 3099;

console.log("Hello World!");

app.listen(PORT, function() {
   console.log('MBU mock API listening on port: ', PORT);
});