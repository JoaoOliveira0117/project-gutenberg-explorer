import { SupabaseClient } from "@supabase/supabase-js";
import db from "../config/db.js";
import { Database } from "../config/db.types.js";

export type UserRequest = {
  email: string;
  username?: string;
  profile_pic?: string;
}

export type UserResponse = {
  id: string;
  email: string;
  username: string;
  profile_pic: string;
  created_at: string;
}

export default class UserRepository {
  protected db;

  constructor(db: SupabaseClient<Database, "public", any>) {
    this.db = db.from('users');
  }

  async findUserByEmail(email: string): Promise<UserResponse> {
    const { error, data } = await this.db.select().eq('email', email).single();

    if (error) {
      throw error;
    }

    return data;
  }
  
  async findUserById(id: string): Promise<UserResponse> {
    const { error, data } = await this.db.select().eq('id', id).single();

    if (error) {
      throw error;
    }

    return data;
  }
  
  async createUser(user: UserRequest): Promise<UserResponse> {
    const { error, data } = await this.db.insert({ email: user.email }).select().single();

    if (error) {
      throw error;
    }

    return data;
  }

  async updateUserById(id: string, user: Partial<UserRequest>): Promise<UserResponse> {
    const { error, data } = await this.db.update(user).eq('id', id).single();

    if (error) {
      throw error;
    }

    return data;
  }
}