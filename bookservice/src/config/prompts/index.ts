import KeyCharacters from "./keyCharacters.js";
import LanguageDetection from "./languageDetection.js";
import SemanticAnalysis from "./semanticAnalysis.js";
import SentimentAnalysis from "./sentimentAnalysis.js";
import Summarize from "./summarize.js";

export const AI_SLUGS = {
  KEY_CHARACTERS: "key-characters",
  LANGUAGE_DETECTION: "language-detection",
  SEMANTIC_ANALYSIS: "semantic-analysis",
  SENTIMENT_ANALYSIS: "sentiment-analysis",
  SUMMARIZE: "summarize"
} as const

export const AI_PROMPTS = {
  KEY_CHARACTERS: KeyCharacters,
  LANGUAGE_DETECTION: LanguageDetection,
  SEMANTIC_ANALYSIS: SemanticAnalysis,
  SENTIMENT_ANALYSIS: SentimentAnalysis,
  SUMMARIZE: Summarize
}