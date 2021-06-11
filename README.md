# security-sinkhole
Sinkhole to collect masked credentials


# Install dependencies

- npm i

# Development
Need to have AWS Creds (as env vars) accessing `product security dev private account` and `golden images account`

To run and develop web-server locally. Stop\start to see changes

- npm run local

To run web-server inside of container. Rebuilds every time when running

- npm run docker

# Folders
- src: files for web server in Express JS https://expressjs.com/
- logs: storage for log files for creds stored
- cert: folder for SSL certs needed for web-server

!!!Do not commit or share `logs` and `cert` folder into repo. You may want to remove them after evert development