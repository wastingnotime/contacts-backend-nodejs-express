FROM node:21-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 8010

VOLUME data

ENV ENVIRONMENT=production
ENV DB_LOCATION=/data/contacts.db

CMD [ "node", "dist/index.js" ]