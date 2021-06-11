const fs = require('fs');
const express = require('express');
const https = require('https');
const mystiko = require('mystiko');
const currentDir = process.cwd();
const logsFolder = `${currentDir}/logs`;

if (fs.existsSync(`${currentDir}/cert`)) {
  fs.rmdirSync(`${currentDir}/cert`, { recursive: true });
}
fs.mkdirSync(`${currentDir}/cert`);


mystiko({ env: 'dev' }).then(() => {
  try {
    if (!fs.existsSync(logsFolder)) {
      fs.mkdirSync(logsFolder)
    }
  } catch (err) {
    console.error(err);
  }
  
  const app = express();
  app.use(express.json());
  
  app.get('/', (req, res, next) => {
    res.send('Server is running');
  });
  
  app.post('/hole', (req, res, next) => {
    const currentDate = new Date().toISOString().split("T")[0];
    if (typeof req.body !== 'object') {
      res.status(400).send('Sorry, this API accepts only JSON body');
    } else {
      const log = JSON.stringify(Object.assign({}, req.body, { timestamp: new Date().toISOString()})) + ',\n';
      fs.writeFile(`${logsFolder}/logs_${currentDate}.json`, log, { flag: 'a+' }, err => {});
      res.status(200).send('Received');
    }
  });

  // these files are downloaded by mystiko from AWS Secret Manager
  let cert = fs.readFileSync(`${currentDir}/cert/server.crt`, 'utf-8');
  let key = fs.readFileSync(`${currentDir}/cert/server.key`, 'utf-8');
  const options = {
    cert,
    key
  };
  const port = 8443;
  const httpsServer = https.createServer(options, app);
  httpsServer.listen(port, () => {
    console.log("Sinkhole server started on port:" + port);
  });
}).catch(err => {
  console.log(err);
});

