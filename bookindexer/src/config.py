def get_env():
  import os

  return {
    "PROJECT_ID": os.getenv('GCP_PROJECT')
  }