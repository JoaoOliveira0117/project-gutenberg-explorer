import { AI_SLUGS } from "../../config/prompts/index.js";
import AiService from "../../services/ai.js";
import withController from "../../utils/withController.js";
import BooksController from "./books.controller.js";

/**
 * @openapi
 * /api/{user_id}/books/{book_id}/ai/{type}:
 *  get:
 *    tags: [Books]
 *    summary: Use AI to generate content based on type for the given book
 *    parameters:
 *      - in: path
 *        name: user_id
 *        required: true
 *        description: User id
 *      - in: path
 *        name: book_id
 *        required: true
 *        description: Book id
 *      - in: path
 *        name: type
 *        required: true
 *        schema:
 *          type: string
 *          enum: [key-characters, language-detection, semantic-analysis, sentiment-analysis, summarize]
 *        description: AI type
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Internal server error
 */
class AiByBookId extends BooksController {
  async handle() {
    const { book_id, user_id, type } = this.params as { book_id: string, user_id: string, type: typeof AI_SLUGS[keyof typeof AI_SLUGS]};

    const service = await this.service;

    const book = await service.findBookById(book_id, user_id);

    if (!book.book_url) {
      return { success: false }
    }

    const response = await fetch(book.book_url)
    
    const text = await response.text();

    const aiService = await AiService.initialize();

    let summary;

    switch (type) {
      case AI_SLUGS.KEY_CHARACTERS:
        summary = await aiService.getBookKeyCharacters(text);
        break;
      case AI_SLUGS.LANGUAGE_DETECTION:
        summary = await aiService.getBookLanguage(text);
        break;
      case AI_SLUGS.SENTIMENT_ANALYSIS:
        summary = await aiService.getBookSentimentAnalysis(text);
        break;
      case AI_SLUGS.SEMANTIC_ANALYSIS:
        summary = await aiService.getBookSemanticAnalysis(text);
        break;
      default:
        summary = await aiService.getBookSummary(text);
    }

    const content = summary.choices[0].message.content;

    return { content };
  }
}

export default withController(AiByBookId);