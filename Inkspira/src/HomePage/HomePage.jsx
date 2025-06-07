// HomePage.jsx

import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Inkspira</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Gallery</a></li>
          <li><a href="#">Shop</a></li>
          <li><a href="#">Login/Register</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-text">
          <h1>Unleashing Creativity Through Digital Canvas</h1>
          <p>Where passion meets pixels – Explore a world of artistic brilliance at Inkspira.</p>
          <a href="#" className="btn-explore"><span>Explore Gallery</span></a>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro container">
        <h2>Welcome to Inkspira</h2>
        <p>
          Inkspira is a platform for digital artists to showcase their creative journey.
          Discover unique digital art pieces, shop limited prints, and connect with the creators
          behind each masterpiece.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer container">
        © 2025 Inkspira. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
