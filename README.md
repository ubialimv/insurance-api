## This code is using TypeScript and Express

### Description

The `insurance-api` is responsible for suggesting a insurance package personalized for an user. The plan may vary from _economic_, _regular_, _responsible_ or the _ineligible_. The kind of insurances are _auto_, _disability_, _home_ and _life_.

This api is Contract-First and it is using a middleware that reads the routes documentation and validates each route accordingly to it. This middleware validates requests and responses, so any new route or any change must start with the documentation.

The documentation is a [Swagger](https://swagger.io/resources/open-api/) file and can be found in the `contracts` folder in `api-service/src/application`. After you start the api you may see it accessing `/docs` route.

### Dependencies

To install the dependencies of the project, run the following command on the root folder:

```bash
$ yarn
```

### Development

Once you have installed the dependencies you are be able to start the api on development mode. All you'll need to do is create a `.env.local` accordantly to the `env.example`. The example is located on the root folder.

All done? go to the root folder of the repository and run:

```bash
$ yarn run dev
```

### Testing

```bash
# unit tests
$ yarn run test:unit:cov
```

```bash
# component tests
$ yarn run test:component
```

```bash
# mutation tests
$ yarn run test:mutation
```

### Production

To start the services on production mode, you need to create a `.env.prod` accordantly to the `env.example`. Once you done that, go to the root folder and follow the steps:

```bash
# step 1: build
$ yarn run build
```

And now you can start the services:

```bash
# step 2: startup from docker
$ docker-compose up
```

### Env vars

- PORT: Port the api is going to use.

## Additional info

- Once you started the api development or production you can test using the `/docs` route and then clicking on the _Try it out_ button;
- By going to `/metrics` route is possible to check some metrics about this API that could be used for monitoring. The api is using a lib called [prom-client](https://github.com/siimon/prom-client) for that. Check [default metrics](https://github.com/siimon/prom-client#default-metrics) for more information;
- When the api receives a request a middleware will check if the request has a header property called `transaction-id`, if not the middleware will add that property to the request. From here, every log that the api shows will be related to the that `transaction-id`;
- Most of the code are located on the _domain_ folder. All the business rules can be found in this folder. The idea is separate the business layer from others api layers, like application for example, pretty much the same when we are using DDD pattern for example.
- This api has a mutation test configuration, but the mutation test is available only in the domain folder. These tests are very slow and heavy to run, but it is worth when it comes to the core or the business of the api. For more information check [stryker](https://stryker-mutator.io/).
