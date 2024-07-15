import Navbar from "./components/Header";
import Hero from "./components/Hero";
import Monologue from "./components/Monologue";
import AboutSection from "./components/AboutSection";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Hero />
      <Monologue/>
      <AboutSection />
      <Projects />
      <Footer />


      {/* Navbar component will still render */}
      {/* Commenting out the Routes for now */}
      {/* { <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutSection />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
            </Routes> } */}
    </Router>
  );
}

export default App;
