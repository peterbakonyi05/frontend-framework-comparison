# Coding challenge: Simple Blog Application

## Creator

Created by [Peter Bakonyi](https://github.com/peterbakonyi05)

## Tech stack

- [NX](https://nx.dev/) monorepo for tooling
- [service](./apps/blog-service/src/main.ts) is a [NestJS](https://nestjs.com/) application
  - service and controller layer is implemented with basic unit tests
  - no persistence layer ([Prisma](https://www.prisma.io/) or something similar could be used)
  - I provided hard-coded mock data
  - features
    - simple authentication using JWT (login / logout / getting profile)
    - getting list of posts (without content)
    - getting single post with content
    - getting comments for a post
    - getting number of comments by post id 
    - creating and updating comments when user is logged in (has valid JWT)
  - I added basic validation for the endpoints but could be refined
  - I did not add logging, it should be done in a real application for observability, monitoring and alerting
- [client](./apps//blog-web/pages/_app.tsx) is a [Next.js](https://nextjs.org/) application
  - Next.js application using page router
  - UI library: [chakra-ui](https://chakra-ui.com/) with default theming
  - Data fetching: combination of server-side rendering and [react-query](https://tanstack.com/query/v3/docs/react/overview) for data that changes (user, comments)
  - Unit testing examples with Jest
    - simple snapshot testing for [footer](./apps/blog-web/components/footer.spec.tsx)
    - bit more complex testing with Testing Library and MSW for [comment creation](./apps/blog-web/components/create-comment.spec.tsx)
  - features:
    - home page to display list of posts with number of comments and creation date
    - post page to display content of post and comments
    - login/logout functionality
    - creating a comment when a user is logged in
- E2E tests: I created a very simple Cypress example test, normally at least the happy path of all functionality should be covered with E2E tests
- [libs/models](./libs/models/src/index.ts) is a shared library between the client and service to provide type safety for API contracts (real app could be based on Swagger, GraphQL, grpc, JSON schema...)

## Getting started

- Use Node.js v18, which is the current LTS (built and tested with v18.16.0)
- Use npm v9 (built and tested with v9.5.1)

```sh
npm install # install dependencies
npm run start:blog-service # start blog server
npm run start:blog-web # start blog client

```

Then open http://localhost:4200 to view the home page

You can login and then comment using mock user credentials:

- email: robert.reactfan@gmail.com, pw: react
- email: adam.angularadvocate@gmail.com, pw: angular
- email: victoria.vuesupporter@gmail.com, pw: vue

## Running unit tests

```sh
npm test # runs unit test for client and server
```

## Running E2E tests

I just added a [very simple e2e test](./apps/blog-web-e2e/src/e2e/app.cy.ts) to load the page and navigate to a post.

Normally the happy path of the main functionality should be covered in a real application.

```sh
npm run start:blog-service # start blog server
npm run e2e # run headless once
npm run start:e2e # run in watch mode for development
```

# Original content of this README file

## Notes

_Please add your real name to README because its not alway obvious who submitted the challenge_

## Task

This application consists of a service and a client, they can be done in the same project or separately. There is no actual storage on the backend, so all the data can be mocked with some json.

### Service

The backend service should provide the following functionality:

Posts:

- list all

- get one

Comments:

- list all comments for a specific post

- create a new comment (user name is optional, text is required)

- update an existing comment

### Client

The client should display the following information:

- home page: list all blog post titles and show how many comments each blog post has

- blog post page: show text and all the posts' comments (It is not required to implement create/update actions for comments.)

### General remarks

- service: use Node.js with a framework of your choice

- client: use React.js or a framework of your choice

- provide unit tests to show your approach of testing both service and client

- use minimal CSS styling to show your approach for that
