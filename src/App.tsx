import Navbar from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import { BrowserRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Hero />
      <AboutSection/>

      {/* Navbar component will still render */}
      {/* Commenting out the Routes for now */}
      {/* { <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<Experience />} />
            </Routes> } */}
    </Router>
  );
}

export default App;
