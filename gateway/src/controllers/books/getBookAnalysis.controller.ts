import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

class GetBookAnalysis extends BooksController {
  async handle() {
    const { id, type } = this.params;
    console.log(id)
    return this.service.GetBookAnalysis(id, this.user.id, type);
  }
}

export default withController(GetBookAnalysis);