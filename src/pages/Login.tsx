import { useState } from "react";
import Header from "../components/Header";

type props = {
  setAPIKey: (newKey: string) => void;
};

export default function Login({ setAPIKey }: props) {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-full bg-slate-100">
      <Header />
      <div className="h-full w-full p-8">
        <div className="flex flex-col shadow-md rounded-lg bg-white p-6 items-start mx-auto max-w-md mt-[10vh] md:mt-[25vh]">
          <div className="text-gray-500">OpenAI API key</div>
          <input
            placeholder="12345..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400
          focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          <button
            className="bg-gradient-to-br from-pink-500 to-yellow-500 text-white px-3 py-2 rounded-md self-stretch mt-6 shadow-none hover:shadow-md saturate-100 disabled:saturate-0 transition ease-in-out duration-200"
            disabled={input === ""}
            onClick={() => {
              if (input !== "") {
                setAPIKey(input);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
