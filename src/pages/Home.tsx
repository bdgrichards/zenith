import Header from "../components/Header";
import AISuggest from "../components/AISuggest";
import CodeEditor from "../components/CodeEditor";
import FileUploader from "../components/FileUploader";
import { useState } from "react";

const defaultCode = `# load csv and packages
from js import csvData
import pandas as pd
import numpy as np
from io import StringIO
df = pd.read_csv(StringIO(csvData))

# insert your dataframe edits here
# eg. df.dropna()


# output final csv
df.to_csv(index=False)
`;

export default function Home() {
  const [isCSVUploaded, setIsCSVUploaded] = useState(false);
  const [code, setCode] = useState(defaultCode);

  return (
    <div className="flex flex-col min-h-full bg-slate-100 pb-20">
      <Header />
      <div className="flex flex-col px-8">
        <FileUploader setIsCSVUploaded={setIsCSVUploaded} />
        <AISuggest isCSVUploaded={isCSVUploaded} setCode={setCode} />
        <CodeEditor
          isCSVUploaded={isCSVUploaded}
          code={code}
          setCode={setCode}
        />
      </div>
    </div>
  );
}
