FROM node:carbon-alpine

COPY ./ /origin

WORKDIR /origin

RUN npm install && \
    npm run trans && \
    npm prune --production && \
    mv /origin/lib /app && \
    mv /origin/node_modules /app && \
    rm -rf /origin

WORKDIR /app

EXPOSE 5000

CMD [ "node", "index.js" ]
