import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import HomePage from "./components/Homepage";
import AboutPage from "./components/About";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <br />
        <div>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about/:coinId" element={<AboutPage />} />

        </Routes>
      </div>
    </Router>
  );
}

 



export default App;
