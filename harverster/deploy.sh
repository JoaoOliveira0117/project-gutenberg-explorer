gcloud functions deploy publish_books \
  --runtime python312 \
  --trigger-topic publish-books-topic \
  --memory 512MB \
  --timeout 1000s \
  --region southamerica-east1 \
  --entry-point publish_books

gcloud scheduler jobs create pubsub trigger-publish-books \
  --schedule "0 2 11 * *" \
  --topic publish-books-topic \
  --message-body "{}" \
  --time-zone "America/Sao_Paulo" \
  --location "southamerica-east1"
