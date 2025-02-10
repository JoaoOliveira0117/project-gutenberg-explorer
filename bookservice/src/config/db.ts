import { createClient } from "@supabase/supabase-js";
import { Database } from "./db.types.js";
import Secrets from "./secrets.js";

const db = async () => {
  const secrets = await Secrets.initialize()
  return createClient<Database>(secrets.getSecret("DB_URL"), secrets.getSecret("DB_KEY"));
}

export default db;