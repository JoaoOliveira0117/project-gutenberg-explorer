import ApiService from "@/http/apiService";

export default class UserService extends ApiService {
  getUserByToken(headers?: { [key: string]: any }) {
    return this.get("/api/user/me", headers);
  }

  getUserMe() {
    return this.get("/api/user/me");
  }
}