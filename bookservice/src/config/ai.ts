import Secrets from "./secrets.js";
import Groq from "groq-sdk";

const aiClient = async () => {
  const secrets = await Secrets.getInstance()
  return new Groq({ apiKey: secrets.getSecret("GROQ_API_KEY")})
}

export default aiClient;