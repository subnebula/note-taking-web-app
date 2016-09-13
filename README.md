# CSE2WDC Assignment - Neverwrote

This repository contains a template which should form the foundation of your
assignment.

## Getting started

1. Create a private fork of this repository
2. Clone your fork of the repository and start coding
3. Copy `env/mysql.env.example` to `env/mysql.env` and change the database
   password in the file

## Command reference

### Run backend API tests

```sh
$ docker-compose run --rm api jasmine
```

### Start everything

```sh
$ docker-compose up
```

### Watch files and automatically bundle

```sh
$ docker-compose run --rm frontend gulp
```

## Project structure

The Neverwrote project has a very similar structure to the blog application from
the labs. You will only need to work in the `api/` directory (for the backend
API) and the `frontend/` directory (for the frontend interface). The NGINX
server is already correctly configured, as are all of the Docker-related things,
so there is no need to modify those.

Below are more detailed descriptions of the `api/` and `frontend/` directories.
Locations that you will be modifying/adding to as you develop are marked with
an asterisk (*).

### Backend API (`api/`)

```
api
├── Dockerfile            # Description of Docker image
├── package.json          # NPM dependencies
├── spec                  # The backend tests
├── src
│   ├── app.js            # Express application definition
│   ├── config
│   │   ├── database.js   # Database connection configuration
│   │   └── routes.js     # Code to connect the routes in controllers/
│   ├── controllers
│   │   ├── index.js      # The index route
│   │   ├── notebooks.js  # * API endpoints starting with /notebooks
│   │   └── notes.js      # * API endpoints starting with /notes
│   ├── migrations        # * Sequelize migrations
│   ├── models            # * Sequelize models
│   │   └── index.js      # * Loads and associates models
│   ├── seeders           # * Sequelize seeders (optional, but useful)
│   └── server.js         # Server-side entry point
└── start.sh              # Script for starting the server
```

### Frontend interface (`frontend/`)

```
frontend
├── Dockerfile            # Description of Docker image
├── gulpfile.js           # Gulp tasks
├── package.json          # NPM dependencies
├── src
│   ├── app.js            # Express application definition
│   ├── client.js         # Client-side (browser) entry point
│   ├── components        # * React components
│   │   ├── DevTools.js   # Development tools sidebar
│   │   ├── Home.js       # * Container component containing the app
│   │   ├── MarkdownEditor.js           # Markdown editor component
│   │   └── Root.js       # Root component
│   ├── helpers
│   │   ├── ajax.js       # HTTP request functions used by api.js
│   │   ├── api.js        # Functions for talking with the backend API
│   │   ├── createActionDispatchers.js  # Used to create action dispatchers
│   │   └── createStore.js              # Used to create the Redux store
│   ├── reducers          # * Redux reducers
│   │   └── index.js      # * Loads and combines reducers
│   ├── server.js         # Server-side entry point
│   └── styles
│       └── main.css      # * Custom CSS styles
└── start.sh              # Script for starting the server
```
