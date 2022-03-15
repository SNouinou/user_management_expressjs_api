# Users Account Generator with ExpressJs
## An API for Generating Random User data

### Used Stack
- NodeJs
- Typescript
- tsyringe
- sqlite DB
- FakerJs
- Prisma ORM
- JJWT for JWT authentication
- chai and supertest for unit test

### Endpoints
- `GET /api/users/generate?count={count}` generate `count` users and download it (No authorization required).
- `POST /api/users/batch` import users (No authorization required).
- `POST /api/auth` authenticate the user
- `GET /api/users/me` check the profile of authenticated user's profile 
- `GET /api/users/{username}` check the profile of `username`

### Run the project

`yarn start`
Runs the app in the development mode in http://localhost:3000.  

`yarn test`
Launches the test runner in the console.
