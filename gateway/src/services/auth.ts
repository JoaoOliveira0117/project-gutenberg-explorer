import Service from "../http/service.js";

export default class AuthService extends Service {
  constructor() {
    super(process.env.AUTH_SERVICE!);
  }

  async getUserMe(token: string) {
    const response = this.client.get("api/user/me", {
      headers: await this.getHeaders(token)
    })

    return response.json();
  }

  async getUserById(id: string, token: string) {
    const response = this.client.get("api/user/" + id, {
      headers: await this.getHeaders(token)
    })

    return response.json();
  }

  async updateUserMe(body: { username: string, profile_pic: string }, token: string) {
    const response = this.client.put("api/user/me", {
      headers: await this.getHeaders(token),
      json: body,
    });

    return response.json();
  }
}