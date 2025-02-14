# PROJECT GUTHENBERG EXPLORER'S Gateway

## What is this?

This is a service gateway that connects both authservice and bookservices together.

## How does it work?

This application provides endpoints for communicating between the services:

- **[GET] /api/user/me** - Gets current User from token.
- **[PUT] /api/user/me** - Updates current User from token.
- **[GET] /api/user/:id** - Gets User by id.

- **[GET] /api/books/** - Gets all books.
- **[GET] /api/books/favorite** - Gets all Favorite books.
- **[GET] /api/books/last-seen** - Gets all Last Seen books.
- **[GET] /api/books/:id** - Gets a book by id.
- **[GET] /api/books/:id/:type** - Executes an AI prompt for the book depending on the type selected: key-carachters, language-detection, semantic-analysis, sentiment-analysis, summarize.
- **[PUT] /api/books/:id/favorite** - Marks book as favorite.
- **[DELETE] /api/books/:id/favorite** - Removes a Favorite book of the user.

## Folder structure

``` sh
  .
└── src/
    ├── config/        # External services configuration
    ├── controllers    # App Controllers
    ├── http           # Base code for Controllers, Repositories and Services.
    ├── middlewares    # Route middlewares
    ├── routes         # Access Routes.
    ├── services       # Services, Business logic.
    ├── utils          # Utils
```

## Integration with Google Cloud and Environments;

This project integrates with google cloud's secret manager, an example of secrets below:
This project integrates with supabase's database.

```json
{
"API_KEY": ""
}
```

There is also a .env configuration for this project that handles the following variables:

```sh
PORT=8000
AUTH_SERVICE=""
BOOKS_SERVICE=""
GCP_PROJECT_ID=""
GCP_SECRETS_MANAGER=""
```

# Building and Installation

You can run this project locally after configuring the secrets above by using the following scripts:

```sh
npm install # Install dependencies;

npm run dev # For local development only;

npm run build # Build the project;

npm run start # Run built project;
```