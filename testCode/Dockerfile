FROM ubuntu:18.04
WORKDIR /testCode

COPY ./nginx.conf/default.conf /etc/nginx/conf.d/default.conf
COPY ./certbot/conf/options-ssl-nginx.conf /etc/letsencrypt/
COPY ./certbot/conf/* /etc/letsencrypt/