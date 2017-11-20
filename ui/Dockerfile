FROM nginx:alpine
COPY nginx-site.conf /etc/nginx/conf.d/default.conf
RUN mkdir /code
ADD ./build /code/