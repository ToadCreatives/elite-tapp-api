# Elite Tapp API

[![Node.js CI](https://github.com/ToadCreatives/elite-tapp-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/ToadCreatives/elite-tapp-api/actions/workflows/node.js.yml)

## Installation

- Install NodeJS, PostgreSQL, Redis
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

| Name                      | Description                                                                           | Example                                 |
|---------------------------|---------------------------------------------------------------------------------------|-----------------------------------------|
| NODE_ENV                  | Environment for node js                                                               | "development", "production", "test"     |
| APP                       | Name of the application                                                               | EliteTapp                               |
| PORT                      | Port to run the application (if you run in **heroku** this will setup  automatically) | 5000                                    |
| HOSTNAME                  | Host name for running the application                                                 | http://localhost:5000                   |
| APP_SECRET                | Secret for running app. Use a strong hash in production and make sure to rotate it    | ddd36434-80fe-4f18-b3b6-e645697f7b84    |
| DATABASE_URL              | Postgresql DB connection string(can be set as individual fields too)                  | postgres://admin:admin@localhost/dbname |
| TRANSPORTER_PROVIDER      | Provider of email transport(smtp/ses)                                                 | smtp                                    |
| TRANSPORTER_SMTP_HOST     | Mail server host                                                                      | smtp.mymailer.com                       |
| TRANSPORTER_SMTP_PORT     | Mail server port                                                                      | 2525                                    |
| TRANSPORTER_SMTP_USERNAME | Mail server username                                                                  | harrypotter                             |
| TRANSPORTER_SMTP_PASSWORD | Mail server password                                                                  | alohomora                               |
| REDIS_PRIMARY_URL         | Primary redis db used for caching/sessions                                            | redis://localhost:6379                  |
| REDIS_QUEUE_URL           | Redis queue used for jobs                                                             | redis://localhost:6379/1                |
| AWS_ACCESS_KEY            | AWS access key                                                                        | accessKeyFromAWS                        |
| AWS_SECRET_ACCESS_KEY     | AWS Secret Access Key                                                                 | fromAWS                                 |
| AWS_REGION                | AWS region                                                                            | us-east-1                               |
| AWS_BUCKET_MEDIA          | AWS bucket for media                                                                  | media.elitetapp.com                     |
| TWILIO_SID                | SID from twilio                                                                       | sidFromTwilio                           |
| TWILIO_TOKEN              | Token from twilio                                                                     | tokenFromTwilio                         |
| TWILIO_FROM               | From number/alphanumeric id                                                           | EliteTapp                               |
