def get_env():
  import os

  return {
    "PROJECT_ID": os.getenv('GCP_PROJECT'),
    "BATCH_SIZE": 500,
    "MAX_BATCH_BYTES_MB": 1,
    "MAX_LATENCY": 0.5,
    "DB_URL": os.getenv('DB_URL'),
    "DB_KEY": os.getenv('DB_KEY')
  }