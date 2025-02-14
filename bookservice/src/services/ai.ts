import Groq from "groq-sdk";
import aiClient from "../config/ai.js";
import splitString from "../utils/splitString.js";
import Summarize from '../config/prompts/summarize.js'
import KeyCarachters from "../config/prompts/keyCharacters.js";
import LanguageDetection from "../config/prompts/languageDetection.js";
import SentimentAnalysis from "../config/prompts/sentimentAnalysis.js";
import SemanticAnalysis from "../config/prompts/semanticAnalysis.js";

export default class AiService {
  private TEXT_SPLIT_SIZE = 500;
  private BATCH_SIZE = 10;
  private MAX_BATCH_SIZE = 10;
  protected client;

  constructor(client: Groq) {
    this.client = client;
  }

  public static async initialize() {
    const client = await aiClient();
    return new AiService(client);
  }

  private getMessages(prompt: string, text: string, textSplitSize = this.TEXT_SPLIT_SIZE, batchSize = this.BATCH_SIZE) {
    const splitted = splitString(text, textSplitSize);
    const messages = [
      {
        role: "system",
        content: prompt
      }
    ]

    const size = Math.floor(splitted.length / batchSize)

    if (size > this.MAX_BATCH_SIZE) {
      const lastMessages = []

      for (let i = 0; i < Math.floor(this.MAX_BATCH_SIZE / 2); i++) {
        messages.push({
          role: "user",
          content: `${i === 0 ? '{{START}}' : ''}\n${splitted[i]}\n{{END_PARAGRAPH}}`,
        })
  
        messages.push({ role: "assistant", content: "Ok" });

        lastMessages.push({
          role: "user",
          content: `${splitted[i + Math.floor(this.MAX_BATCH_SIZE / 2)]}\n{{END_PARAGRAPH}}`,
        })

        lastMessages.push({ role: "assistant", content: "Ok" });
      }

      messages.push(...lastMessages);
    } else {
      for (let i = 0; i < size; i++) {
        messages.push({
          role: "user",
          content: `${i === 0 ? '{{START}}' : ''}\n${splitted[i]}\n{{END_PARAGRAPH}}`,
        })
  
        messages.push({ role: "assistant", content: "Ok" });
      }
    }
  
    messages.push({
      role: "user",
      content: "{{END_BOOK}}"
    })
    

    return messages;
  }

  async getBookSummary(text: string) {
    const messages = this.getMessages(Summarize.prompt, text);
    
    const response = await this.client.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: messages as any,
      temperature: 0.7,
    });

    return response;
  }

  async getBookKeyCharacters(text: string) {
    const messages = this.getMessages(KeyCarachters.prompt, text);
    
    const response = await this.client.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: messages as any,
      temperature: 0.7,
    });

    return response;
  }

  async getBookLanguage(text: string) {
    const messages = this.getMessages(LanguageDetection.prompt, text, 500);
    
    const response = await this.client.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: messages as any,
      temperature: 0.7,
    });

    return response;
  }

  async getBookSentimentAnalysis(text: string) {
    const messages = this.getMessages(SentimentAnalysis.prompt, text);
    
    const response = await this.client.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: messages as any,
      temperature: 0.7,
    });

    return response;
  }

  async getBookSemanticAnalysis(text: string) {
    const messages = this.getMessages(SemanticAnalysis.prompt, text);
    
    const response = await this.client.chat.completions.create({
      model: 'llama3-70b-8192',
      messages: messages as any,
      temperature: 0.7,
    });

    return response;
  }
}