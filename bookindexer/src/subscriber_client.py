from google.cloud import pubsub_v1
from .config import get_env

config = get_env()

client = pubsub_v1.SubscriberClient()

def subscribe(project_id, callback):
  subscription_path = client.subscription_path(project_id, 'gutenberg-bookharvester-sub')

  return client.subscribe(subscription_path, callback=callback)