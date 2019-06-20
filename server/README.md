# Calendeok api

This is rest api for service that named "calendeok".

This service is made by team named rolling donuts in DDD. 

### DDD.
* Design Develop Dayday

## Getting Started

This is REST api made by node.js, express.js, mysql with es6.

So you have to get node.js environment, mysql for database, know  ex6 syntax.

### Prerequisites

Please install node.js and I recommend to use docker for your database.

* Install node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

* Install Docker Desktop for MAC: [https://docs.docker.com/docker-for-mac/install/](https://docs.docker.com/docker-for-mac/install/)

* Install Docker Desktop for Windows: [https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)

* Install compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## Create development environment

First, clone this repository into your local environment. Run followed command in your terminal.

```bash
  git clone https://github.com/kyhsa93/calendeok-api
```

Second, intall package that needed in this project.

If your node.js environment is successly downloaded, you can use node package manager.

Run followed command in your terminal.

```bash
  npm install
```

Next up, generate mysql.

If you already have mysql in your environment, you can use that.

But if you don't have mysql database, try this process.

Install docker for your OS from link in top of this documentation.

And run followed command.

If your docker is successfully installed, you can use docker cli.

```bash
  docker run --name calendeok -d -p 3306:3306 -e MYSQL_DATABASE=calendeok -e MYSQL_ROOT_PASSWORD=test -v ~/database/calendeok:/var/lib/mysql mysql:5.7
```

And then, you can connect mysql in localhost:3306, user name 'root' and password is 'test'.

Finaly, develop environment is created.

You can start api with followed command.

```bash
  npm start
```

And if you modify code and save, you can see the process detect code changes and restart it self.

## Start with docker

If you can use docker cli, you can build docker image.

Run followed command in project directory.

```bash
  docker build -t calendeok-api . # build docker image
  docker images # list up docker images
```

And than you can create and run docker container using builded image.

```bash
  docker run -d -p 5000:5000 calendeok-api # create and run container in background
  docker ps # list up runnig container
```

And now you can connect api through localhost:5000.

## Start with compose

Compose in this project is include nginx for proxy, api and mysql 5.7 for database.

Run followed command in project directory.

```bash
  docker-compose up -d # build images, create and run containers in background
```

If you want apply your modified code into container, you can add build option.

```bash
  docker-compose up -d --build # if source code is changed, rebuild image, recreate and rerun container
```

After use compose, you have stop and remove containers.

```bash
  docker-compose down # stop and remove container in compose
```

And you can access database through localhost:3306.

Default database user is root and password is test.

## Configuration

All configuration of this project is written config.js that locations in project root path.

[https://github.com/kyhsa93/calendeok-api/blob/master/config.js](https://github.com/kyhsa93/calendeok-api/blob/master/config.js)

You can modify this file for change some config or add environment value when building docker image.

And if you use compose, you can add or modify config in .env file that located in project root or modify docker-compose.yml directly.

## Other scripts

```bash
  npm run lint # fix code automatically and print error and warn
  npm run trans # transpile and generate lib
  npm test # test api
```

## Documentation

Document about this project is made swagger.

Start this api without production environment, and connect localhost:5000/docs in your browser.

```bash
  npm start # if process is successfully started, you can see document in your browser.
```
