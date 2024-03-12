const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
