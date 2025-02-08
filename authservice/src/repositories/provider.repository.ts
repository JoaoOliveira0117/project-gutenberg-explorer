import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../config/db.types.js";
import db from "../config/db.js";

export type ProviderRequest = {
  provider_id: string;
  user_id: string;
}

export type ProviderResponse = {
  provider_id: string;
  user_id: string;
  created_at: string;
}

export default class ProviderRepository {
  protected db;

  constructor(db: SupabaseClient<Database, "public", any>) {
    this.db = db.from('providers');
  }

  static async init() {
    const database = await db();
    return new ProviderRepository(database);
  }

  async findProvider(query: ProviderRequest): Promise<ProviderResponse> {
    const { error, data } = await this.db.select().eq('provider_id', query.provider_id).eq('user_id', query.user_id).single();

    if (error) {
      throw error;
    }

    return data;
  }
  
  async createProvider(body: ProviderRequest): Promise<ProviderResponse> {
    const { error, data } = await this.db.insert(body).select().single();

    if (error) {
      throw error;
    }

    return data;
  }
}