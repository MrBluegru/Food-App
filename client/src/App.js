import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./componentes/LandingPage";
import Home from "./componentes/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
