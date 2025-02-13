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

  getBooks() {
    return this.get("/api/books");
  }

  getBookById(id: string) {
    return this.get(`/api/books/${id}`);
  }

  putBookFavorite(id: string) {
    return this.put(`/api/books/${id}/favorite`, {});
  }

  deleteBookFavorite(id: string) {
    return this.delete(`/api/books/${id}/favorite`);
  }

  aiSummarizeBook(id: string) {
    return this.get(`/api/books/${id}/summarize`);
  }

  aiDetectLanguagesOfBook(id: string) {
    return this.get(`/api/books/${id}/language-detection`);
  }

  aiGetKeyCharactersOfBook(id: string) {
    return this.get(`/api/books/${id}/key-characters`);
  }

  aiDetectSentimentOfBook(id: string) {
    return this.get(`/api/books/${id}/sentiment-detection`);
  }

  aiAnalyzeSemanticsOfBook(id: string) {
    return this.get(`/api/books/${id}/semantic-analysis`);
  }
}