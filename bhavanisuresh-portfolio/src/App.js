import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import ProjectPreview from "./ProjectPreview";
import Contact from "./Contact";

import Projects from "./Projects";
import Certificates from "./Certificates";

import "./App.css";


function Home() {

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectPreview />
      <Contact />
    </>
  );

}


function App() {

  return (

    <>

      <Navbar />

      <Routes>

        <Route 
          path="/" 
          element={<Home />} 
        />

        <Route 
          path="/projects" 
          element={<Projects />} 
        />

        <Route 
          path="/certificates" 
          element={<Certificates />} 
        />

        <Route 
          path="/about" 
          element={<About />} 
        />

        <Route 
          path="/skills" 
          element={<Skills />} 
        />

        <Route 
          path="/contact" 
          element={<Contact />} 
        />

      </Routes>

      <Footer />

    </>

  );

}


export default App;