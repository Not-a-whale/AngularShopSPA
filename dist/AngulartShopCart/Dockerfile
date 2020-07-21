FROM node:11.15.0-alpine as build-step
WORKDIR /app
COPY package.json ./
run npm install 
COPY .  . 
RUN npm run build

FROM nginx1.16.0-alpine as prod-stage
COPY --from=build-step /app/dist/angulartshopcart /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]