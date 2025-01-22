# Workshop :: Contract testing with Pact

## 1. Provider
* Movie service
  * List of movies
  * Get movies by id

```
$npm install
$npm run provider:start
```

List of URLs of provider
* API document with Swagger
  * http://localhost:3000/swagger/
* Get all movies
  * http://localhost:3000/movies/
* Get movie by id
  * http://localhost:3000/movie/1

### Provider testing with Postman and [newman](https://www.npmjs.com/package/newman)
* Design test cases ?
* What to test ?
```
$npm install -g newman
$newman run <collection-file>
```

Working with HTML report
* https://www.npmjs.com/package/newman-reporter-htmlextra

```
$npm install -g newman-reporter-htmlextra
$newman run <collection-file> -r htmlextra,cli
```

### Provider testing with [Jest](https://jestjs.io/) and [Supertest](https://www.npmjs.com/package/supertest)
* Design test cases ?
* What to test ?
* Test files in folder `provider/component-tests/`
```
$npm run provider:test
```

## 2. Consumer web