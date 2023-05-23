import React, {useState} from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Us from "./components/AboutComp/Us";
import They from "./components/AboutComp/They";
import MatchData from './components/MatchData/MatchData';


function App() {
  const [matchId, setMatchId] = useState(null);
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <h1>RazBet</h1>
        </div>
       < Navbar />


        <Routes>
          <Route path="/" element={<Home setMatchId={setMatchId} />} />
          
     

          <Route path="/about/" element={<About />} >
            <Route path="us" element={<Us />} />
            <Route path="they" element={<They />} />
          </Route>
          <Route path="/contact" element={<Contact matchId={matchId} setMatchId={setMatchId} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
