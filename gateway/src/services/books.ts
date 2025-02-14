import Service from "../http/service.js";
import toQueryString from "../utils/toQueryString.js";

export default class BooksService extends Service {
  constructor() {
    super(process.env.BOOKS_SERVICE!);
  }
  
  async getHealthCheck() {
    const response = this.client.get("api/health");
    return response.json();
  }

  async getBooks(query: { search?: string, fields?: string | string[], page?: string, pageSize?: string }, user_id: string, filter?: 'favorites' | 'last-seen') {
    const queryString = toQueryString(query)

    const filterParam = filter? `/${filter}` : ''

    const response = this.client.get(`api/${user_id}/books${filterParam}${queryString}`, {
      headers: await this.getHeaders()
    });

    return response.json();
  }

  async getBookById(id: string, user_id: string, fields?: string[]) {
    const queryString = toQueryString({ fields })

    const response = this.client.get(`api/${user_id}/books/${id}${queryString}`, {
      headers: await this.getHeaders()
    })

    return response.json();
  }

  async putFavoriteBook(id: string, user_id: string) {
    const response = this.client.put(`api/${user_id}/books/${id}/favorite`, {
      headers: await this.getHeaders()
    })

    return response.json();
  }

  async deleteFavoriteBook(id: string, user_id: string) {
    const response = this.client.delete(`api/${user_id}/books/${id}/favorite`, {
      headers: await this.getHeaders()
    })

    return response.json();
  }

  async putLastSeenBook(id: string, user_id: string) {
    const response = this.client.put(`api/${user_id}/books/${id}/last-seen`, {
      headers: await this.getHeaders()
    })

    return response.json();
  }

  async GetBookAnalysis(id: string, user_id: string, slug: string) {
    const response = this.client.get(`api/${user_id}/books/${id}/ai/${slug}`, {
      headers: await this.getHeaders()
    })

    return response.json();
  }
}