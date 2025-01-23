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

## 2. Consumer A from API
* Call data from provider via HTTP


## 3. Working Contract testing
* Provider vs Consumer

### 3.1 Run contract testing in consumer-side
* File `consumer/contract-tests/consumer-contract.spec.js`
```
$npm run consumer:contract-test
```
Result :: Contract file in folder `/pacts`


### 3.2 Publish contract to Pact broker

* Download and configuration [Pact standalone executables](https://github.com/pact-foundation/pact-ruby-standalone/releases)

Run
```
$pact-broker version  
1.77.0
```

Publish contract file to Pact broker
* [On-prem](https://docs.pact.io/pact_broker)
* [On-cloud at Pactflow](https://pactflow.io/)
```
$export PACT_BROKER_BASE_URL=<url of broker>

$npm run publish:pact
```

### 3.3 Verify contracts from provider

```
$export PACT_BROKER_BASE_URL=<url of broker>

$npm run provider:verify
```

Start provider server
```
$npm run provider:start
```

Run verify again
```
$npm run provider:verify
```

## 4. Consumer B from Web UI
* Folder `consumer-ui/`

```
$npm run comsumer-ui:start
```

List of URLs
* http://localhost:8000/

## 5. Contract testing with PactJS + [Consumer Adapter](https://docs.pactflow.io/docs/bi-directional-contract-testing/tools#consumer-adapters)
* Cypress adapter
* Playwright adapter


### Cypress adapter for Pact
* Folder `cypress/`
```
$npm i -D cypress
$npm i -D @pactflow/pact-cypress-adapter

$consumer-ui:contract-test
```

Result :: Pact contract file in folder `cypress/pacts`
* MoviesAPI-UIConsumer.json
