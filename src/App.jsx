import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";


function Header() {
  return (
    <header className="header">

      <h2>My Website</h2>

      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/about">About</Link>
      </nav>

    </header>
  );
}


function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Bhoomika Umesh</p>
    </footer>
  );
}


function App() {

  return (
    <BrowserRouter basename="/Pages">

      <Header />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}


export default App;