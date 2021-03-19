# Equipment Experts API services
[![Node.js CI](https://img.shields.io/github/workflow/status/parameter1/equipment-experts/Node.js%20CI?logo=github)](https://github.com/parameter1/equipment-experts/actions/workflows/node-ci.yml)
[![License](https://img.shields.io/github/license/parameter1/equipment-experts)](https://github.com/parameter1/equipment-experts/blob/main/LICENSE)

## Installation
This codebase requires either NodeJS v14+ and Yarn, or Docker and Docker Compose. After cloning the repository, execute one of the following commands to install dependencies

```sh
# Node+Yarn
nvm use 14
yarn install
```

```sh
# Docker
docker-compose run yarn
```

----
## GraphQL service
The GraphQL service provides CRUD for the SearchIndex models used by EE blog content in BASE, and autocomplete/typeahead search for the search index values available on Equipment Experts.

### Contributing
After [Installation](#installation), run one of the following commands to start the GraphQL service:
```sh
# Node+Yarn
yarn workspace @equipment-experts/graphql dev
```
```sh
# Docker Compose
docker-compose up graphql
```

This service will require pre-defined environment variables for the EE API and BaseCMS MongoDB servers (on dev, defaulted to `mongodb://localhost:27107`). You can specify these values by adding them to a `services/graphql/.env` file:
```
API_TOKEN=<my-secret-token>
BASECMS_MONGO_DSN=mongodb://<user>:<password>@<hostname>/?connectTimeoutMS=200
```

----
## Widget
The Vue widget interacts with the GraphQL service and is designed to be embedded onto another page. It can be tested locally by running one of the following commands:
```sh
# Node+Yarn
yarn workspace @equipment-experts/widget serve
```

```sh
# Docker Compose
docker-compose up widget
```

This widget CLU will require a pre-defined environment variable for the GraphQL service (on dev, defaulted to `http://localhost:33733`). You can specify this value by adding it to a `.env` file (Docker Compose) or by appending it to the `serve` command (above):
```
VUE_APP_GRAPHQL_HTTP=https://some.graphql.service.url
```
