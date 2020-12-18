FROM python:3.8

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code
COPY ./news_app/requirements.txt /code/
RUN pip install -r requirements.txt


COPY ./news_app /code/