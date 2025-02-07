def get_env():
  import os

  return {
    "PROJECT_ID": os.getenv('GCP_PROJECT'),
    "DB_URL": os.getenv('DB_URL'),
    "DB_KEY": os.getenv('DB_KEY')
  }