# Building application
FROM node:latest as build

ARG APP_ENVIRONMENT=local
ENV APP_ENVIRONMENT=${APP_ENVIRONMENT}

WORKDIR /app

COPY package.json /app

RUN npm install -g @angular/cli
RUN npm install

COPY . .

RUN ng build --configuration=$APP_ENVIRONMENT

RUN ls -la /app/dist

# Hosting application
FROM nginx:latest

COPY --from=build /app/dist/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
