from nikolaik/python-nodejs:python3.9-nodejs17-alpine

RUN mkdir /opt/code

COPY . /opt/code

RUN apk add openjdk11

WORKDIR /opt/code

RUN npm install
RUN pip install -r requirements.txt



