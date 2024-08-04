const express = require('express');
const path = require('path');
const { exec } = require('child_process'); // Add the missing exec import
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8080; // Use port from .env or default to 3002

// Route to execute bin/001 script with improved error handling
app.get('/', (req, res) => {
  exec('bin/001', (err, stdout, stderr) => {
    if (err) {
      console.error('Error executing script:', err);
      return res.status(500).send('Error executing script');
    }
    return res.send(stdout);
  });
});

// Route to execute bin/002 script
app.get('/aws', (req, res) => {
  exec('bin/002', (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

// Route to execute bin/003 script
app.get('/docker', (req, res) => {
  exec('bin/003', (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

// Route to execute bin/004 script with request headers
app.get('/loadbalanced', (req, res) => {
  exec('bin/004 ' + JSON.stringify(req.headers), (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

// Route to execute bin/005 script with request headers
app.get('/tls', (req, res) => {
  exec('bin/005 ' + JSON.stringify(req.headers), (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

// Route to execute bin/006 script with request headers
app.get('/secret_word', (req, res) => {
  exec('bin/006 ' + JSON.stringify(req.headers), (err, stdout, stderr) => {
    return res.send(`${stdout}`);
  });
});

// Route to serve the index page with SECRET_WORD from environment variables
app.get('/index.html', (req, res) => {
  res.send(path.join( 'index.html'));
});

// // Route to serve the index page with SECRET_WORD from environment variables
// app.get('/index.html', (req, res) => {
//   exec('index.html' + JSON.stringify(req.headers), (err, stdout, stderr) => {
//     return res.send(`${stdout}`);
//   });
// });

// Route to check if the app is running
app.get('/health', (req, res) => {
  res.send('App is running!');
});

// Route to check if the secret word is set
app.get('/check_secret', (req, res) => {
  if (process.env.SECRET_WORD) {
    res.send(`SECRET_WORD is set to: ${process.env.SECRET_WORD}`);
  } else {
    res.send('SECRET_WORD is not set');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Rearc quest listening on port ${port}!`);
});
