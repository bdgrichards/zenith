import OpenAI from "openai";
import { useState } from "react";

const systemMessage = `You are a highly accomplished Python programmer who writes the best code in the world. 
Your code never fails to compile, and never has any errors in it.
Your non-technical colleague has a CSV which they want to edit or change in some way, and they'll give you your request in English
Your role is then to translate their English request into Python code, outputting the a new CSV string to give back to your colleague. 
Always respond with pure Python code, NEVER add any additional words before or after your code.
You are allowed to add comments to your Python code to communicate your thoughts

The template you must follow is the following code, since this is how the CSV data is loaded into the Python runtime:

# load csv and packages
from js import csvData
import pandas as pd
import numpy as np
from io import StringIO
df = pd.read_csv(StringIO(csvData))

# insert your dataframe edits here
# eg. df.dropna()


# output final csv
df.to_csv(index=False)

You must only change the code in the middle of the example, where the comment instructs you to add your dataframe edits
Never import extra packages, just make do with pandas and numpy

Here are the first 2 rows of the CSV so that you can better understand what code to generate:
%CSVData%

NEVER EVER UNDER ANY CIRCUMSTANCES use this data in the final code that you generate, you must always import it in the way outlined at the beginning of the template
`;

export default function useOpenAI(APIKey: string) {
  const [loading, setLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: APIKey,
    dangerouslyAllowBrowser: true,
  });

  const call = async (prompt: string) => {
    setLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            // get the csvData from the globalThis context on the window
            content: systemMessage.replace(
              "%CSVData%",
              // leave just the headers and two lines of data
              window.csvData.split("\n").slice(0, 3).join("\n")
            ),
          },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo",
      });
      setLoading(false);
      return completion.choices[0].message.content ?? "";
    } catch (e) {
      setLoading(false);
      return String(e);
    }
  };

  return { call, loading };
}
