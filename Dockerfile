
FROM node:20.11.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn lint

RUN npm run build

FROM node:20.11.0-alpine

WORKDIR /app

COPY --from=build /usr/src/app/package.json /usr/src/app/yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/serverconfig.js .

EXPOSE 8080

CMD ["node", "serverconfig.js"]
