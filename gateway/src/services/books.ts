import Service from "../http/service.js";

export default class BooksService extends Service {
  constructor() {
    super(process.env.BOOKS_SERVICE!);
  }

  async getBooks(query: { search?: string, fields?: string[], skip: number, take: number }, user_id: string) {
    const { search, fields, skip, take } = query;
    const searchParams: Record<string, string> = {};

    searchParams.skip = String(skip);
    searchParams.take = String(take);
    if (search) searchParams.search = search;
    //if (fields) searchParams.fields = typeof fields === "string" ? fields : fields?.join("&fields=");

    const response = this.client.get(`api/${user_id}/books?fields=id&fields=book_id`, { searchParams });

    return response.json();
  }

  async getBookById(id: string, user_id: string, fields?: string[]) {
    const searchParams: Record<string, string> = {};

    if (fields && fields.length > 0) searchParams.fields = fields.join(",");
    const response = this.client.get(`api/${user_id}/books/${id}`, { searchParams })

    return response.json();
  }

  async putFavoriteBook(id: string, user_id: string) {
    const response = this.client.put(`api/${user_id}/books/${id}/favorite`)

    return response.json();
  }

  async deleteFavoriteBook(id: string, user_id: string) {
    const response = this.client.delete(`api/${user_id}/books/${id}/favorite`)

    return response.json();
  }

  async putLastSeenBook(id: string, user_id: string) {
    const response = this.client.put(`api/${user_id}/books/${id}/last-seen`)

    return response.json();
  }
}