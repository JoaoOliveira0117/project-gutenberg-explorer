import ApiService from "@/http/apiService";
import Cookies from "@/http/cookies";

export default class BookService extends ApiService {
  protected static instance: BookService;

  protected isAuthorized(): boolean {
    return this.cookies.getValue("token") !== undefined;
  }

  protected static async initialize() {
    const cookies = await Cookies.getInstance();
    return new BookService(cookies);
  }

  public static async getInstance() {
    if (!BookService.instance) {
      BookService.instance = await BookService.initialize();
    }

    return BookService.instance;
  }

  getBooks(): Promise<any> {
    return this.get("/api/books");
  }

  getBookById(id: string): Promise<any> {
    return this.get(`/api/books/${id}`);
  }

  putBookFavorite(id: string): Promise<any> {
    return this.put(`/api/books/${id}/favorite`, {});
  }

  deleteBookFavorite(id: string): Promise<any> {
    return this.delete(`/api/books/${id}/favorite`);
  }
}