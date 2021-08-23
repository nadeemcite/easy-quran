FROM node:14.17.5-alpine

RUN apk add chromium

ENV CHROME_BIN=/usr/bin/chromium-browser

WORKDIR /app

COPY ./package.json .

RUN npm i && npm cache clean --force

COPY . .

CMD npm run start