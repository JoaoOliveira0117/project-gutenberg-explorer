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

  getBooks(query?: string, headers?: { [key: string]: any }) {
    return this.get("/api/books" + query, headers);
  }

  getBookById(id: string, query?: string, headers?: { [key: string]: any }) {
    return this.get(`/api/books/${id}` + query, headers);
  }

  putBookFavorite(id: string, headers?: { [key: string]: any }) {
    return this.put(`/api/books/${id}/favorite`, {}, headers);
  }

  deleteBookFavorite(id: string, headers?: { [key: string]: any }) {
    return this.delete(`/api/books/${id}/favorite`, headers);
  }

  aiSummarizeBook(id: string, headers?: { [key: string]: any }) {
    return this.get(`/api/books/${id}/ai/summarize`, headers);
  }

  aiDetectLanguagesOfBook(id: string, headers?: { [key: string]: any }) {
    return this.get(`/api/books/${id}/ai/language-detection`, headers);
  }

  aiGetKeyCharactersOfBook(id: string, headers?: { [key: string]: any }) {
    return this.get(`/api/books/${id}/ai/key-characters`, headers);
  }

  aiDetectSentimentOfBook(id: string, headers?: { [key: string]: any }) {
    return this.get(`/api/books/${id}/ai/sentiment-analysis`, headers);
  }

  aiAnalyzeSemanticsOfBook(id: string, headers?: { [key: string]: any }) {
    return this.get(`/api/books/${id}/ai/semantic-analysis`, headers);
  }
}