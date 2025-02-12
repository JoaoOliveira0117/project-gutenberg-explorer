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
      const uploadService = new UploadService();
      const filename = `${id}.txt`
  
      const bookTextExists = await uploadService.fileExists(filename);
      let fileUrl
  
      if (!bookTextExists) {
        const response = await fetch(`https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`)
        const stream = response.body;
        await uploadService.uploadFile(filename, stream as any);
      }
      
      fileUrl = await uploadService.getFileUrl(filename);

      return service.updateBookById(user_id, id, { book_url: fileUrl }, fields);
    }

    return book;
  }
}

export default withController(GetById);