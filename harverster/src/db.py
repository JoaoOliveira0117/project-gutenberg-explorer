from supabase import create_client, Client

def initialize_client(url, key) -> Client:
  return create_client(url, key)
  