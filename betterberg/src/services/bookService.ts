import ApiService from "@/http/apiService";
import Cookies from "@/http/cookies";

export default class BookService extends ApiService {
  protected static instance: BookService;

  protected isAuthorized(): boolean {
    return this.cookies.getValue("token") !== undefined;
  }

  protected static async initialize() {
    const cookies = await Cookies.initialize();
    return new BookService(cookies);
  }

  public static async getInstance() {
    if (!BookService.instance) {
      BookService.instance = await BookService.initialize();
    }

    return BookService.instance;
  }

  getBooks(query?: string) {
    return this.get("/api/books" + query);
  }

  getBookById(id: string, query?: string) {
    return this.get(`/api/books/${id}` + query);
  }

  putBookFavorite(id: string) {
    return this.put(`/api/books/${id}/favorite`, {});
  }

  deleteBookFavorite(id: string) {
    return this.delete(`/api/books/${id}/favorite`);
  }

  aiSummarizeBook(id: string) {
    return this.get(`/api/books/${id}/ai/summarize`);
  }

  aiDetectLanguagesOfBook(id: string) {
    return this.get(`/api/books/${id}/ai/language-detection`);
  }

  aiGetKeyCharactersOfBook(id: string) {
    return this.get(`/api/books/${id}/ai/key-characters`);
  }

  aiDetectSentimentOfBook(id: string) {
    return this.get(`/api/books/${id}/ai/sentiment-analysis`);
  }

  aiAnalyzeSemanticsOfBook(id: string) {
    return this.get(`/api/books/${id}/ai/semantic-analysis`);
  }
}