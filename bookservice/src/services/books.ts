import BooksRepository, { BookRequest } from "../repositories/books.repository.js";
import UploadService from "./upload.js";

export default class BooksService {
  protected repository;

  private constructor(repository: BooksRepository) {
    this.repository = repository;
  }

  static async init() {
    const booksRepository = await BooksRepository.init();
    return new BooksService(booksRepository);
  }

  async findAllBooks(user_id: string, fields?: string, search?: string, page?: number, pageSize?: number) {
    return this.repository.findAllBooks(user_id, fields, search, page, pageSize);
  }

  async findAllFavoriteBooks(user_id: string, fields?: string, page?: number, pageSize?: number) {
    return this.repository.findAllFavoriteBooks(user_id, fields, page, pageSize);
  }

  async findAllLastSeenBooks(user_id: string, fields?: string, page?: number, pageSize?: number) {
    return this.repository.findAllLastSeenBooks(user_id, fields, page, pageSize);
  }

  async findBookById(id: string, user_id: string, fields?: string) {
    return this.repository.findBookById(id, user_id, fields);
  }

  async findFavoriteBooks(user_id: string, fields?: string, page?: number, pageSize?: number) {
    return this.repository.findFavoriteBooks(user_id, fields, page, pageSize);
  }

  async findLastSeenBooks(user_id: string, fields?: string) {
    return this.repository.findLastSeenBooks(user_id, fields);
  }

  async updateBookById(user_id: string, book_id: string, body: Partial<BookRequest>, fields?: string) {
    return this.repository.updateBookById(user_id, book_id, body, fields);
  }

  async findOrUploadBook(id: string) {
    const uploadService = new UploadService();
    const filename = `${id}.txt`

    const bookTextExists = await uploadService.fileExists(filename);

    if (!bookTextExists) {
      const response = await fetch(`https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`)
      const stream = response.body;
      await uploadService.uploadFile(filename, stream as any);
    }
    
    return uploadService.getFileUrl(filename)
  }
}