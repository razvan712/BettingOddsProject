import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import BetPage from "./components/BetPage";
import Register from "./components/Register";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import banner from './assets/banner.png'

const queryClient = new QueryClient();

function App() {
  const [matchId, setMatchId] = useState(null);
  const [teams, setTeams] = useState({});
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
          <div style={{
            width: '100%',
            justifyContent: 'center',
           
             
          }}>
            <div >
          
              <img src={banner} alt="banner" height='200px' width="100%"  />
            </div>
            <Navbar />

            <Routes>
              <Route
                path="/"
                element={<Home setMatchId={setMatchId} setTeams={setTeams} />}
              />

              <Route path="/about/" element={<About />}>
                
              </Route>
              <Route path="/register" element={<Register />} />
              <Route
                path="/betpage"
                element={
                  <BetPage
                    matchId={matchId}
                 
                    teams={teams}
                  />
                }
              />
            </Routes>
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;

