import { useState } from "react";
import Header from "../components/Header";
import useOpenAI from "../hooks/useOpenAI";

type props = {
  APIKey: string;
};

export default function Home({ APIKey }: props) {
  const [prompt, setPrompt] = useState("");

  const {
    call: callOpenAI,
    response: openAIResponse,
    loading: openAILoading,
  } = useOpenAI(APIKey);

  return (
    <div className="flex flex-col min-h-full bg-slate-100">
      <Header />
      <div className="h-full w-full p-8 mt-14">
        <div
          className="flex flex-col shadow-md rounded-lg bg-white p-6 mx-auto items-start max-w-md"
          style={{
            WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          }}
        >
          <div className="text-gray-500">Prompt</div>
          <input
            placeholder="Tell me a joke..."
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400
          focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          <button
            className="flex justify-center bg-gradient-to-br from-pink-500 to-yellow-500 text-white px-3 py-2 rounded-md self-stretch mt-6 shadow-none hover:shadow-md saturate-100 disabled:saturate-0 transition ease-in-out duration-200"
            disabled={prompt === ""}
            onClick={() => {
              if (!openAILoading) {
                callOpenAI(prompt);
              }
            }}
          >
            {openAILoading && (
              <svg
                className="animate-spin mt-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Submit
          </button>
          {openAIResponse && (
            <div className="w-full">
              <div className="text-gray-500 mt-8 w-full text-left">
                Response
              </div>
              <div className="text-left break-words">{openAIResponse}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
