import "./App.css";

function Header() {
  return (
    <header className="header">
      <h2>My Website</h2>

      <nav>
        <a href="#home">Home</a>
      </nav>
    </header>
  );
}


function Home() {
  return (
    <section id="home" className="home">

      <h1>
        Welcome to My Single Page Application
      </h1>

      <p>
        This is a React application deployed using GitHub Pages.
      </p>

      <button>
        Learn More
      </button>

    </section>
  );
}


function Footer() {
  return (
    <footer className="footer">
      <p>
        © 2026 Bhoomika Umesh
      </p>
    </footer>
  );
}


function App() {
  return (
    <div className="app">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}


export default App;