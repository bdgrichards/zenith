import React, { useEffect, useState } from "react";
import CSVTable from "./CSVTable";
import SectionTitle from "./SectionTitle";

declare global {
  interface Window {
    csvData: string;
  }
}

function CsvUploader() {
  const [csvData, setCsvData] = useState<string | null>(null);
  useEffect(() => {
    // save csvData to global state so Python can access it
    window.csvData = csvData ?? "";
  }, [csvData]);

  const handleFileUpload: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event?.target?.files) {
      const file = event.target.files[0];
      // Check if the selected file is a CSV file
      if (
        (file != null && file.type === "text/csv") ||
        file?.name.endsWith(".csv")
      ) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e?.target != null) {
            const csvContent = e.target.result;
            window.csvData = String(csvContent);
            setCsvData(String(csvContent));
          }
        };
        reader.readAsText(file);
      } else {
        alert("Please select a valid CSV file.");
      }
    }
  };

  return (
    <div className="w-full shadow-md rounded-lg bg-white mx-auto max-w-md mt-20 pr-4">
      <div className="mx-4 mt-4">
        <SectionTitle title="Step 1" subtitle="Upload CSV File" />
      </div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="w-full text-sm text-gray-500
          file:py-2 file:px-4 file:m-4
          file:rounded-md file:border-0
          file:font-semibold file:text-white
          file:bg-gradient-to-br file:from-pink-500 
          file:to-yellow-500 file:shadow-none
          hover:file:shadow-md file:saturate-100 
          disabled:file:saturate-0 file:transition 
          file:ease-in-out file:duration-200
          file:cursor-pointer
          "
      />
      {csvData != null && (
        <div className="max-h-64 overflow-auto ml-4 mb-4 rounded-lg outline-1 outline outline-gray-100 shadow-md">
          <CSVTable csvString={csvData} />
        </div>
      )}
    </div>
  );
}

export default CsvUploader;
