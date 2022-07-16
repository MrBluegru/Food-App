import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./componentes/LandingPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
