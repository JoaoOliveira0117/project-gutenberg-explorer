import { createClient } from "@supabase/supabase-js";

const db = createClient(process.env.DB_URL!, process.env.DB_KEY!)

export default db;