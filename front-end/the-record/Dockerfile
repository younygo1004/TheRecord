FROM node:lts-alpine as build-stage
WORKDIR /the-record

COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-stage ./build /the-record/build


EXPOSE 3000

VOLUME [ "/home/ubuntu/data/nginx:/etc/nginx/conf.d", "/home/ubuntu/data/certbot/conf:/etc/letsencrypt", "/home/ubuntu/data/certbot/www:/var/www/certbot", "home/ubuntu/data/certbot/www:/var/www/certbot" ]
CMD ["nginx", "-g", "daemon off;"]