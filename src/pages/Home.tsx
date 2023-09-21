import Header from "../components/Header";
import AISuggest from "../components/AISuggest";
import CodeEditor from "../components/CodeEditor";
import FileUploader from "../components/FileUploader";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full bg-slate-100">
      <Header />
      <div className="flex flex-col px-8">
        <FileUploader />
        <AISuggest />
        <CodeEditor />
      </div>
    </div>
  );
}
