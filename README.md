# Elite Tapp API

[![Node.js CI](https://github.com/ToadCreatives/elite-tapp-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/ToadCreatives/elite-tapp-api/actions/workflows/node.js.yml)

## Installation

- Install NodeJS, PostgreSQL
- Install `npm` or `yarn`
- Rename `.env.example` to `.env`
- Fulfill `.env` data
- Start PostgreSQL
- Run `yarn run dev` or `npm run dev`
- Check `http://localhost:5000/api/v1/status` to see it works

## With Docker

- Make sure you have installed `Docker` and `Docker Compose`
- Just run `docker-compose up` to start the server


## DB setup

- Cd to project `root`
- Run `npx sequelize-cli db:migrate` to migrate all models to db

## Configuration

| Name                 | Description                                                                           | Example                              |
|----------------------|---------------------------------------------------------------------------------------|--------------------------------------|
| NODE_ENV             | Environment for node js                                                               | "development", "production", "test"  |
| APP                  | Name of the application                                                               | My cool express app                  |
| PORT                 | Port to run the application (if you run in **heroku** this will setup  automatically) | 3000                                 |
| HOSTNAME             | Host name for running the application                                                 | http://localhost:5000                |
| APP_SECRET           | Secret for running app. Use a strong hash in production and make sure to rotate it    | ddd36434-80fe-4f18-b3b6-e645697f7b84 |
| DATABSE_URL          | Postgresql DB connection string(can be set as individual fields too)                  | mongodb://localhost:27017/yourapp    |
| TRANSPORTER_HOST     | Mail server host                                                                      | smtp.mymailer.com                    |
| TRANSPORTER_PORT     | Mail server port                                                                      | 2525                                 |
| TRANSPORTER_USERNAME | Mail server username                                                                  | harrypotter                          |
| TRANSPORTER_PASSWORD | Mail server password                                                                  | alohomora                            |
