import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [APIKey, setAPIKey] = useState<string>();

  return (
    <div className="text-center h-[100vh] w-[100vw]">
      {APIKey !== undefined ? (
        <Home APIKey={APIKey} />
      ) : (
        <Login setAPIKey={setAPIKey} />
      )}
    </div>
  );
}

export default App;
