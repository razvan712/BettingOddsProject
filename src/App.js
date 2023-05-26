import React, {useState} from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import BetPage from "./components/BetPage";
import Us from "./components/AboutComp/Us";
import They from "./components/AboutComp/They";
import MatchData from './components/MatchData/MatchData';


function App() {
  const [matchId, setMatchId] = useState(null);
  const [teams, setTeams] = useState({});
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <h1>RazBet</h1>
        </div>
       < Navbar />


        <Routes>
          <Route path="/" element={<Home setMatchId={setMatchId} setTeams={setTeams} />} />
          
     

          <Route path="/about/" element={<About />} >
            <Route path="us" element={<Us />} />
            <Route path="they" element={<They />} />
          </Route>
          <Route path="/betpage" element={<BetPage matchId={matchId} setMatchId={setMatchId} teams={teams} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
