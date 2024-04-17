FROM node:20.11.0-alpine

WORKDIR /app

COPY package*.json .
COPY yarn.lock .

RUN npm install 

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]