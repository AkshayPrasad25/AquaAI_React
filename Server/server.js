const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/shutdown', (req, res) => {
  exec('sudo poweroff', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      res.status(500).send('Error during shutdown');
    } else {
      console.log(`Command output: ${stdout}`);
      res.status(200).send('Shutdown command executed successfully');
    }
  });
});

app.get('/uptime', (req, res) => {
  exec("uptime | awk '{print $3 $4}' | sed 's/.$//'", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error getting uptime: ${error}`);
      res.status(500).send('Error getting uptime');
    } else {
      const uptime = stdout.trim();
      res.status(200).send(uptime);
    }
  });
});

app.post('/restart', (req, res) => {
  exec('sudo reboot', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      res.status(500).send('Error during restart');
    } else {
      console.log(`Command output: ${stdout}`);
      res.status(200).send('Restart command executed successfully');
    }
  });
});

app.get('/analytics', (req, res) => {
  const csvFilePath = '/home/akshay/Downloads/data.csv';

  const jsonData = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      jsonData.push(row);
    })
    .on('end', () => {
      res.status(200).json(jsonData);
    })
    .on('error', (error) => {
      console.error('Error reading and parsing CSV file:', error);
      res.status(500).send('Error reading and parsing CSV file');
    });
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
