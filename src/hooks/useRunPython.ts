import { useEffect, useRef } from "react";

declare global {
  interface Window {
    loadPyodide: any;
  }
}

export default function useRunPython() {
  const pyodideRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      pyodideRef.current = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.0/full/",
      });
    })();
  }, []);

  const runScript = async (code: string) => {
    if (pyodideRef.current != null) {
      return await pyodideRef.current.runPythonAsync(code);
    } else {
      return;
    }
  };

  return runScript;
}
