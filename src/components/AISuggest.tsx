import { useState } from "react";
import useOpenAI from "../hooks/useOpenAI";
import PrimaryButton from "./PrimaryButton";
import SectionTitle from "./SectionTitle";

export default function AISuggest() {
  const [APIKey, setAPIKey] = useState<string>();

  return (
    <div className="flex flex-col w-full shadow-md rounded-lg bg-white p-4 mx-auto max-w-md mt-4">
      <SectionTitle title="Step 2" subtitle="Tell AI How to Edit CSV" />
      <div className="mt-4">
        {APIKey ? (
          <GetAISuggestion APIKey={APIKey} />
        ) : (
          <GetAPIKey setAPIKey={setAPIKey} />
        )}
      </div>
    </div>
  );
}

function GetAPIKey({ setAPIKey }: { setAPIKey: (apiKey: string) => void }) {
  const [APIKeyInput, setAPIKeyInput] = useState("");

  return (
    <div>
      <div className="text-gray-500">OpenAI API key</div>
      <input
        placeholder="12345..."
        type="text"
        value={APIKeyInput}
        onChange={(e) => setAPIKeyInput(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400
        focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
      />
      <PrimaryButton
        className="self-stretch mt-6"
        disabled={APIKeyInput === ""}
        onClick={() => {
          if (APIKeyInput !== "") {
            setAPIKey(APIKeyInput);
          }
        }}
      >
        Submit
      </PrimaryButton>
    </div>
  );
}

function GetAISuggestion({ APIKey }: { APIKey: string }) {
  const [prompt, setPrompt] = useState("");

  const {
    call: callOpenAI,
    response: openAIResponse,
    loading: openAILoading,
  } = useOpenAI(APIKey);

  return (
    <div>
      <div className="text-gray-500">Prompt</div>
      <input
        placeholder="Tell me a joke..."
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400
          focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
      />
      <PrimaryButton
        className="flex justify-centerself-stretch mt-6"
        disabled={prompt === ""}
        loading={openAILoading}
        onClick={() => {
          if (!openAILoading) {
            callOpenAI(prompt);
          }
        }}
      >
        Submit
      </PrimaryButton>
      {openAIResponse && (
        <div className="w-full">
          <div className="text-gray-500 mt-8 w-full text-left">Response</div>
          <div className="text-left break-words">{openAIResponse}</div>
        </div>
      )}
    </div>
  );
}
