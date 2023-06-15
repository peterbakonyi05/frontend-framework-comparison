# Coding challenge: Simple Blog Application

## Creator

Created by [Peter Bakonyi](https://github.com/peterbakonyi05)


## Tech stack

- NX monorepo
- Service: [NestJS](https://nestjs.com/) application
- Client: [Next.js](https://nextjs.org/) application
    - TypeScript
    - UI library: chakra-ui
    - Data fetching: react-query
    - Unit testing: Jest
- E2E tests: playwright

## Getting started

- Use Node.js v18, which is the current LTS (built and tested with v18.16.0)
- Use npm v9 (built and tested with v9.5.1)

```sh
npm install # install dependencies
npm run start:blog-service # start blog server
```

Example request to login:
```sh
curl -X POST -H "Content-Type: application/json" -d '{"email":"robert.reactfan@gmail.com","password":"react"}' http://localhost:3000/api/auth/login
```

Example request to get profile info:
```sh
 curl http://localhost:3000/api/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoicm9iZXJ0LnJlYWN0ZmFuQGdtYWlsLmNvbSIsImlhdCI6MTY4Njg1NTIwOSwiZXhwIjoxNjg2ODU4ODA5fQ.ptuJM21aVuuvvyrRil6vpGlwbs250CrttJoNnP-Zprg"
```

## TODOs for blog service
- testing
- logging


## Notes

*Please add your real name to README because its not alway obvious who submitted the challenge* 

## Task


This application consists of a service and a client, they can be done in the same project or separately. There is no actual storage on the backend, so all the data can be mocked with some json.

### Service

The backend service should provide the following functionality:

Posts:

-   list all

-   get one

Comments:

-   list all comments for a specific post

-   create a new comment (user name is optional, text is required)

-   update an existing comment

### Client

The client should display the following information:

-   home page: list all blog post titles and show how many comments each blog post has

-   blog post page: show text and all the posts' comments (It is not required to implement create/update actions for comments.)

### General remarks

-   service: use Node.js with a framework of your choice

-   client: use React.js or a framework of your choice

-   provide unit tests to show your approach of testing both service and client

-   use minimal CSS styling to show your approach for that
