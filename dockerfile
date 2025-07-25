FROM node:22-alpine AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm clean-install && \
    npm cache clean --force

COPY . .
RUN npm run build

FROM node:22-alpine

VOLUME data

WORKDIR /app

COPY --from=build-stage /usr/src/app/dist ./
COPY --from=build-stage /usr/src/app/node_modules ./node_modules

# act as doc only
EXPOSE 8010
LABEL vendor=wastingnotime.org

# defaults
ENV ENVIRONMENT=production
ENV DB_LOCATION=/data/contacts.db

CMD [ "node", "index.js" ]