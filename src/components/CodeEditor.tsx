import { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/ext-language_tools";
import useRunPython from "../hooks/useRunPython";
import PrimaryButton from "./PrimaryButton";
import Papa from "papaparse";
import CSVTable from "./CSVTable";
import SectionTitle from "./SectionTitle";
import PageSection from "./PageSection";

interface Props {
  isCSVUploaded: boolean;
  code: string;
  setCode: (newCode: string) => void;
}

export default function CodeEditor({ isCSVUploaded, code, setCode }: Props) {
  const [output, setOutput] = useState("");
  const [outputIsCSV, setOutputIsCSV] = useState(false);

  const runScript = useRunPython();

  const onButtonClick = async () => {
    try {
      const out = await runScript(code);

      // check whether output is a valid CSV or not
      Papa.parse(out, {
        complete: function (results) {
          if (results.errors.length === 0) {
            // it is a CSV
            setOutputIsCSV(true);
          } else {
            // it's not a CSV
            setOutputIsCSV(false);
          }
          setOutput(out);
        },
      });
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
    <>
      <PageSection className="p-4 mt-4">
        <div className="mb-4">
          <SectionTitle title="Step 3" subtitle="Review Python code" />
        </div>
        <AceEditor
          height="35vh"
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
          <PrimaryButton onClick={onButtonClick} disabled={!isCSVUploaded}>
            Run
          </PrimaryButton>
        </div>
      </PageSection>
      <PageSection className="p-4 mt-4">
        <div className="mb-4">
          <SectionTitle title="Step 4" subtitle="Review Output" />
        </div>
        <div className="">
          {output ? (
            outputIsCSV ? (
              <>
                <div className="max-h-96 mt-2 overflow-auto rounded-lg outline-1 outline outline-gray-100 shadow-md">
                  <CSVTable csvString={output} />
                </div>
                <PrimaryButton className="mt-4" onClick={onDownload}>
                  Download CSV
                </PrimaryButton>
              </>
            ) : (
              <div>
                <p className="mt-1 text-gray-400">Output:</p>
                <p className="break-words w-full">{output}</p>
              </div>
            )
          ) : (
            <div className="text-sm text-gray-300">
              Run Python code to generate an output...
            </div>
          )}
        </div>
      </PageSection>
    </>
  );
}
