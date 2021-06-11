FROM node:14.15.4-alpine

COPY src /app
COPY package.json /app/package.json
COPY .mystiko.json /app/.mystiko.json

WORKDIR /app
RUN npm i

CMD npm run server

EXPOSE 443

# USER nobody
