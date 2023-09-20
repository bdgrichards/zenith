import Header from "../components/Header";
import AISuggest from "../components/AISuggest";
import CodeEditor from "../components/CodeEditor";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-slate-100">
      <Header />
      <div className="flex flex-col px-8">
        <div className="shadow-md rounded-lg bg-white p-4 mx-auto max-w-md mt-20">
          <div className="text-gray-500">Upload CSV</div>
        </div>
        <AISuggest />
        <CodeEditor />
      </div>
    </div>
  );
}
