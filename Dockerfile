FROM node:alpine

RUN mkdir app
WORKDIR /app

COPY ./ ./

RUN npm install
RUN npm install -g typescript@4.1.3
RUN tsc

RUN ls dist

