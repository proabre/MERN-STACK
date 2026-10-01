import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((currentMode) => !currentMode);
  };

  return (
    <div className={darkMode ? "App dark" : "App light"}>
      <BrowserRouter>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
