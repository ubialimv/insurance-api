FROM node:16-slim

EXPOSE 3333

WORKDIR /api

COPY package.json ./
COPY yarn.lock ./
COPY dist ./dist
COPY environments/.env.prod ./dist/environments/.env.prod

RUN chown -R node:node .
USER node

ENV NODE_ENV=prod

RUN yarn install --production=true

CMD ["/bin/sh", "-c", "yarn start:prod"]