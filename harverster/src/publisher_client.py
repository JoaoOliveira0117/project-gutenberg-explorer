from google.cloud import pubsub_v1
from .config import get_env


config = get_env()
client = pubsub_v1.PublisherClient(
  batch_settings=pubsub_v1.types.BatchSettings(
    max_messages=config.get("BATCH_SIZE"),
    max_bytes=config.get("MAX_BATCH_BYTES_MB") * 1024 * 1024,
    max_latency=config.get("MAX_LATENCY"),
  )
)

def publish(PROJECT_ID, message_json):
  topic_path = client.topic_path(PROJECT_ID, 'gutenberg-bookharvester')
  return client.publish(topic_path, message_json)