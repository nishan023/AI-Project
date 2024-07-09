import { GoogleGenerativeAI } from "@google/generative-ai";

export class GenAiService {
  private static connectToModel() {
    const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);
    const model = genAi.getGenerativeModel({
      model: "gemini-pro",
    });
    return model;
  }

  public static async checkGrammar(text: string) {
    const prompt = `Please check the grammar of the following text and provide corrections if necessary: "${text}"`;
    const response = await this.connectToModel().generateContent(prompt);
    const reply = response.response.text();
    return reply.trim();
  }
}
