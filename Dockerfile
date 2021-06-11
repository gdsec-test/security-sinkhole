FROM 764525110978.dkr.ecr.us-west-2.amazonaws.com/alpine-node:14.17.0-alpine-3.12

USER root
COPY src /app
COPY package.json /app/package.json
COPY .mystiko.json /app/.mystiko.json

WORKDIR /app
RUN chown -R nobody /app
RUN npm i

CMD npm run server

EXPOSE 443

USER nobody
