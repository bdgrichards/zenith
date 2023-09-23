import { useState } from "react";
import useOpenAI from "../hooks/useOpenAI";
import PrimaryButton from "./PrimaryButton";
import SectionTitle from "./SectionTitle";
import PageSection from "./PageSection";

interface Props {
  isCSVUploaded: boolean;
  setCode: (newCode: string) => void;
}

export default function AISuggest({ isCSVUploaded, setCode }: Props) {
  const [APIKey, setAPIKey] = useState<string>();

  return (
    <PageSection className="flex flex-col p-4 mt-4">
      <SectionTitle title="Step 2" subtitle="Tell AI How to Edit CSV" />
      <div className="mt-4">
        {APIKey ? (
          <GetAISuggestion APIKey={APIKey} setCode={setCode} />
        ) : (
          <GetAPIKey setAPIKey={setAPIKey} isCSVUploaded={isCSVUploaded} />
        )}
      </div>
    </PageSection>
  );
}

function GetAPIKey({
  setAPIKey,
  isCSVUploaded,
}: {
  setAPIKey: (apiKey: string) => void;
  isCSVUploaded: boolean;
}) {
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
        disabled={APIKeyInput === "" || isCSVUploaded === false}
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

function GetAISuggestion({
  APIKey,
  setCode,
}: {
  APIKey: string;
  setCode: (newCode: string) => void;
}) {
  const [prompt, setPrompt] = useState("");

  const { call: callOpenAI, loading: openAILoading } = useOpenAI(APIKey);

  const onClick = async () => {
    if (!openAILoading) {
      const newCode = await callOpenAI(prompt);
      setCode(newCode);
      setPrompt("");
    }
  };

  return (
    <div>
      <div className="text-gray-500">Prompt</div>
      <input
        placeholder="Eg. remove the column about the..."
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
        onClick={onClick}
      >
        Submit
      </PrimaryButton>
    </div>
  );
}
