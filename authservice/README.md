# PROJECT GUTHENBERG EXPLORER'S Auth service

## What is this?

This is a service that provides validation and authorization of users for a particular application.
Developed with Javascript, NodeJS, ExpressJS, Typescript, Supabase and Zod.

## How does it work?

This application provides endpoints for oAuth with google provider using the routes below:

- **[GET] /api/google/redirect** - Redirects user to google provider login page.
- **[GET] /api/google/callback** - Callback route after successful login.

After login, the user will receive a JWT token with which the application can be authenticated.

The following routes are available after authentication.

- **[GET] /api/user/me** - Gets the current user that owns the Authorization token header.
- **[PUT] /api/user/me** - Updates the current user that owns the Authorization token header.
- **[GET] /api/user/:id** - Gets one user by Id.

# For schemas available check documentation at the `/api-docs` endpoint.

## Folder structure

``` sh
  .
└── src/
    ├── config         # External services configuration
    ├── controllers    # App Controllers
    ├── http           # Base code for Controllers, Repositories and Services.
    ├── middlewares    # Route middlewares
    ├── repositories   # Database Repositories
    ├── routes         # Access Routes.
    ├── services       # Services, Business logic.
    ├── utils          # Utils
    └── validation     # Zod Schemas
```

## Integration with Google Cloud and Environments;

This project integrates with google cloud's secret manager, an example of secrets below:
This project integrates with supabase's database.

```json
{
  "DB_URL":"",
  "DB_KEY":"",
  "GOOGLE_AUTH_CLIENT_ID":"",
  "GOOGLE_AUTH_CLIENT_SECRET":"",
  "JWT_SECRET":"",
  "API_KEY": ""
}
```

There is also a .env configuration for this project that handles the following variables:

```sh
PORT=9000
APP_URL=http://localhost:3001/login
API_URL=http://localhost:9000
GCP_PROJECT_ID=""
GCP_SECRETS_MANAGER=""
SWAGGER_USER="authservice"
SWAGGER_PASSWORD="authservice"
```

# Building and Installation

You can run this project locally after configuring the secrets above by using the following scripts:

```sh
npm install # Install dependencies;

npm run dev # For local development only;

npm run build # Build the project;

npm run start # Run built project;
```

# Databases

This project consists on two main tables:

#### Users:

```
  id: uuid
  email: varchar
  username: varchar
  profile_pic: varchar
  created_at: timestamptz
```

#### Providers:

```
  provider_id: varchar
  user_id: uuid # References user table's id.
  created_at: timestamptz
```