FROM node:21-alpine as builder

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
USER node