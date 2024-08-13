# contacts-backend-nodejs-express

**contacts-backend-nodejs-express** is part of "contacts" project that is an initiative where we try to explore frontend and backend implementations in order to better understand it cutting-edge features. This repository presents a nodejs rest API sample.

## stack
* node 16
* express
* sqlite
* sequelize

## features
* migrations

## get started (linux only)

### option 1 - use latest docker image from dockerhub

execute the remote docker image
```
docker run -p 8010:8010 wastingnotime/contacts-backend-nodejs-express
```

### option 2 - build and run a local docker image
build a local docker image
```
docker build --tag contacts-backend-nodejs-express .
```

execute the local docker image
```
docker run -p 8010:8010 contacts-backend-nodejs-express
```
### option 3 - execute from source code 

- first, install node 16 +, if you don't have it on your computer:  [how to install node]()
- go to root of solution and execute the commands below

set environment for development
```
cp .env_example .env
```

install deps
```
 npm i
 ```

and then run the application
```
npm start
```

## testing
create a new contact
```
curl --request POST \
  --url http://localhost:8010/contacts \
  --header 'Content-Type: application/json' \
  --data '{
	"firstName": "Albert",
	"lastName": "Einstein",
	"phoneNumber": "2222-1111"
  }'
```

retrieve existing contacts
```
curl --request GET \
  --url http://localhost:8010/contacts
```
more examples and details about requests on (link) *to be defined
