FROM node:alpine as mybuild

WORKDIR /opt/app

COPY ./package.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=mybuild /opt/app/build /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d//default.conf
