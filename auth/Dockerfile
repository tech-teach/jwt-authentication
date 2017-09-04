FROM python:3.6-alpine
ADD requirements.txt /
RUN pip install -r requirements.txt
ADD ./ /code
WORKDIR /code
