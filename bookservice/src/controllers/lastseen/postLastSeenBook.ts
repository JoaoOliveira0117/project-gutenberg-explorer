import withController from "../../utils/withController.js";
import LastSeenController from "./lastseen.controller.js";

class PostLastSeenBook extends LastSeenController {
  async handle() {
    const { user_id, book_id } = this.params as { user_id: string, book_id: string };

    return this.service.insert({ user_id, book_id });
  }
}

export default withController(PostLastSeenBook);