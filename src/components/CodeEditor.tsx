import { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";
import useRunPython from "../hooks/useRunPython";
import PrimaryButton from "./PrimaryButton";

export default function CodeEditor() {
  const [output, setOutput] = useState("");
  const [code, setCode] = useState("'a' + 'b'");

  const runScript = useRunPython();

  const onButtonClick = async () => {
    try {
      const out = await runScript(code);
      setOutput(out);
    } catch (e) {
      setOutput(`An error occurred: ${e}`);
    }
  };

  const onDownload = () => {
    const blob = new Blob([output], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "file.csv";
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
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
      <div className="flex mt-6 w-full">
        <PrimaryButton onClick={onButtonClick}>Run</PrimaryButton>
        {output && (
          <PrimaryButton className="ml-4" onClick={onDownload}>
            Download CSV
          </PrimaryButton>
        )}
      </div>
      {output && <p className="mt-2 break-words w-full">Output: {output}</p>}
    </div>
  );
}
