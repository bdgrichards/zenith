import React, { useEffect, useState } from "react";
import Papa from "papaparse";

interface CSVTableProps {
  csvString: string;
}

const CSVTable: React.FC<CSVTableProps> = ({ csvString }) => {
  const [tableData, setTableData] = useState([]);

  const handleParseCSV = (csvData: any) => {
    setTableData(csvData.data);
  };

  useEffect(() => {
    // Parse CSV when the csvString prop changes
    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      complete: handleParseCSV,
    });
  }, [csvString]);

  return (
    <div className="text-left">
      <table>
        <thead>
          {tableData.length > 0 && (
            <tr className="sticky top-0">
              {Object.keys(tableData[0]).map((header, index) => (
                <th
                  key={index}
                  className="text-xs font-semibold text-gray-500 bg-gray-100 p-4"
                >
                  {header}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="text-sm border-y border-gray-100 px-4 py-2"
                >
                  {cell as any}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVTable;
