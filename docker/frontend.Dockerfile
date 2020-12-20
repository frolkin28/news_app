FROM node:latest

WORKDIR /code
COPY ./frontend/package*.json /code/

RUN npm install

COPY ./frontend /code/