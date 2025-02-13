import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";
import UploadService from "../../services/upload.js";

class GetById extends BooksController {
  async handle() {
    const { fields } = this.query as { fields: string, user_id: string };
    const { id, user_id } = this.params;

    const service = await this.service;

    const book = await service.findBookById(id, user_id, fields);

    if (!book.book_url) {
      const fileUrl = await service.findOrUploadBook(id);

      return service.updateBookById(user_id, id, { book_url: fileUrl }, fields);
    }

    return book;
  }
}

export default withController(GetById);