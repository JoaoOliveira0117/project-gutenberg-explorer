import Service from "../http/service.js";

export default class BooksService extends Service {
  constructor() {
    super(process.env.BOOKS_SERVICE!);
  }
  
  async getHealthCheck() {
    const response = this.client.get("api/health");
    return response.json();
  }

  async getBooks(query: { search?: string, fields?: string | string[], skip: number, take: number }, user_id: string, filter?: 'favorites' | 'last-seen') {
    const { search, fields, skip, take } = query;
    const searchParams: Record<string, string> = {};

    searchParams.skip = String(skip);
    searchParams.take = String(take);
    if (search) searchParams.search = search;
    if (fields) searchParams.fields = typeof fields === "string" ? fields : fields?.join(",");
    const urlFilter = filter ? '/' + filter : ''

    const response = this.client.get(`api/${user_id}/books${urlFilter}`, {
      headers: await this.getHeaders(),
      searchParams 
    });

    return response.json();
  }

  async getBookById(id: string, user_id: string, fields?: string[]) {
    const searchParams: Record<string, string> = {};

    if (fields) searchParams.fields = typeof fields === "string" ? fields : fields?.join(",");
    const response = this.client.get(`api/${user_id}/books/${id}`, {
      headers: await this.getHeaders(),
      searchParams
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