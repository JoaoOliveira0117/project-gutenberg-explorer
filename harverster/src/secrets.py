import json
from google.cloud import secretmanager

def access_secret(secret_name):
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{{PROJECT_ID}}/secrets/{{PROJECT_SECRETS}}/versions/latest"
    response = client.access_secret_version(name=name)
    string = response.payload.data.decode('utf-8')
    return json.loads(string)[secret_name]