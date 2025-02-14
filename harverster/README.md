# PROJECT GUTHENBERG EXPLORER'S API Harvester

## What is this?

This is a function that extracts data from guthenberg's project pg_catalog and feeds it into the bookservice database.

## How does it work?

This application is simply a python function, you can both run it using the command belouw:

```sh
python -m venv <directory> # Create an python environment

source <directory>/bin/activate # Activate the environment

pip install -r requirements.txt # Install packages

python main.py # Runn function
```

## Integration with Google Cloud and Environments;

This project integrates with google cloud's secret manager, an example of secrets below:
This project integrates with supabase's database.

You need to change the values of `./src/secrets.py`:

```python
name = f"projects/{{PROJECT_ID}}/secrets/{{PROJECT_SECRETS}}/versions/latest"
```

to the ones being used by your secret manager

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