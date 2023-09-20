import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";

import Header from "../components/Header";
import AISuggest from "../components/AISuggest";

declare global {
  interface Window {
    loadPyodide: any;
  }
}

const runScript = async (code: string) => {
  const pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.0/full/",
  });

  return await pyodide.runPythonAsync(code);
};

export default function Home() {
  const [output, setOutput] = useState("(loading...)");
  const [code, setCode] = useState("'a' + 'b'");

  const onButtonClick = async () => {
    const out = await runScript(code);
    setOutput(out);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100">
      <Header />
      <div className="flex flex-col px-8">
        <div className="shadow-md rounded-lg bg-white p-4 mx-auto max-w-md mt-20">
          <div className="text-gray-500">Upload CSV</div>
        </div>
        <AISuggest />
        <div className="shadow-md w-full rounded-lg bg-white p-4 mx-auto max-w-md mt-4">
          <div className="text-gray-500 mb-2">Run Python Code</div>
          <AceEditor
            height="20vh"
            width="100%"
            name="editor"
            placeholder="Add some Python code..."
            mode="python"
            theme="tomorrow"
            fontSize={16}
            showGutter={true}
            showPrintMargin={true}
            highlightActiveLine={true}
            wrapEnabled={true}
            value={code}
            onChange={setCode}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
            }}
          />
          <button
            className="bg-gradient-to-br from-pink-500 to-yellow-500 text-white px-3 py-2 rounded-md self-stretch mt-6 shadow-none hover:shadow-md saturate-100 disabled:saturate-0 transition ease-in-out duration-200"
            onClick={onButtonClick}
          >
            Run
          </button>
          {output && <p className="mt-2">Output: {output}</p>}
        </div>
      </div>
    </div>
  );
}
