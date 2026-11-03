import Background from "./components/Background";
import Home from "./components/Home";
import Work from "./components/Work";
import Mba from "./components/Mba";
import Games from "./components/Games";
import Contact from "./components/Contact";
import PillNav from "./components/PillNav";
import Footer from "./components/Footer";
import { useReveal } from "./components/useReveal";

function App() {
  useReveal();
  return (
    <>
      <Background />
      <main className="wrap">
        <Home />
        <Work />
        <Mba />
        <Games />
        <Contact />
      </main>
      <Footer />
      <PillNav />
    </>
  );
}

export default App;
