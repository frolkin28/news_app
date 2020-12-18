FROM node:15.4.0-alpine

WORKDIR /code
COPY ./frontend/package*.json /code/

RUN npm install

COPY ./frontend /code/