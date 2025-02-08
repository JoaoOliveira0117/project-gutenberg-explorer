import { createClient } from "@supabase/supabase-js";
import { Database } from "./db.types.js";

const db = createClient<Database>(process.env.DB_URL!, process.env.DB_KEY!)

export default db;