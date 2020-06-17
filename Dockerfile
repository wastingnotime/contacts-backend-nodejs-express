FROM node:12
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


EXPOSE 8010

CMD [ "node", "dist/index.js" ]