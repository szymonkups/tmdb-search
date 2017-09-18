# The Movie Database search

## Installation
Application uses [create-react-app](https://github.com/facebookincubator/create-react-app) boilerplate.
Clone the repository and install all dependencies using npm:
```
npm install
```
To build and serve application locally use:
```
npm start
```
To build application in production-ready mode:
```
npm run build
```

## Testing
To start testing using [Jest](https://facebook.github.io/jest/) library:
```
npm test
```
To calculate code coverage:
```
npm run coverage
```

## ESLint
Project uses [ESLint](https://eslint.org/) as default linter. Linter can be invoked by:
```
npm run lint
```

## Application architecture
Application is divided into three layers:
* API - this is where actual API calls are made. This layer is responsible for communication with the server via HTTP calls.
Implementation can be found inside `src/api` directory, 100% code coverage.
* Models - higher level abstraction over API layer. Provides simplified interface to access data from the server. There are two
models available: `SearchModel` (used to perform movie search) and `MovieModel` (stores information about single search result).
Implementation can be found inside `src/models` directory, 100% code coverage.
* View - realized as React components. Uses models to access data and update its state.
