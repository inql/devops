FROM node:alpine

WORKDIR /opt/app

COPY ./package.json .

RUN yarn install

COPY . .

CMD ["node", "index.js"]