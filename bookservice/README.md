# PROJECT GUTHENBERG EXPLORER'S Book service

## What is this?

This is a service that delivers book query, filtering and user interaction.

## How does it work?

This application provides endpoints for communicating with the database and google cloud storage services:

- **[GET] /api/:user_id/books/redirect** - Gets All books.
- **[GET] /api/:user_id/books/favorites** - Gets All user-favorite books.
- **[GET] /api/:user_id/books/last-seen** - Gets All user-last-seen books.
- **[GET] /api/:user_id/books/:id** - Gets a book by Id, then get its text from guthenberg and saves it in the gcp storage bucket.
- **[PUT] /api/:user_id/books/:id/favorite** - Marks a book as Favorite for the user.
- **[DELETE] /api/:user_id/books/:id/favorite** - Removes a Favorite book of the user.
- **[PUT] /api/:user_id/books/:id/last-seen** - Marks a book as Last-Seen for the user.

- **[GET] /api/:user_id/books/:id/ai/:type** - Executes a AI Model using GroqAI depending on the type of function: key-carachters, language-detection, semantic-analysis, sentiment-analysis, summarize.

## Folder structure

``` sh
  .
└── src/
    ├── config/        # External services configuration
    │   └── prompts    # AI prompts
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
  "API_KEY": "",
  "GROQ_API_KEY": ""
}
```

There is also a .env configuration for this project that handles the following variables:

```sh
PORT=3000
GCP_PROJECT_ID=""
GCP_SECRETS_MANAGER=""
SWAGGER_USER="bookservice"
SWAGGER_PASSWORD="bookservice"
GOOGLE_CLOUD_BUCKET_NAME=""
GROQ_AI_API_KEY=""
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

This project consists on three main tables:

#### Books:

```
  id: int
  book_id: int
  title: varchar
  authors: varchar[]
  issue_date: date
  languages: varchar
  locc: varchar
  subjects: varchar[]
  tags: varchar[]
  created_at: timestamptz
  book_url: text
```

#### user_favorite_books:

```
  user_id: uuid
  book_id: uuid # References book table's id.
  created_at: timestamptz
```

#### user_last_seen_books:

```
  user_id: uuid
  book_id: uuid # References book table's id.
  created_at: timestamptz
```