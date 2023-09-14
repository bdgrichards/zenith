import OpenAI from "openai";
import { useState } from "react";

export default function useOpenAI(APIKey: string) {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: APIKey,
    dangerouslyAllowBrowser: true,
  });

  const call = async (prompt: string) => {
    setLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      setResponse(completion.choices[0].message.content ?? "");
    } catch (e) {
      setResponse(String(e));
    } finally {
      setLoading(false);
    }
  };

  return { call, response, loading };
}
