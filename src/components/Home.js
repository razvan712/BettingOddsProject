import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import apiKey from "../data/config";

const Home = ({ matchId, setMatchId, setTeams }) => {
  const [league, setLeague] = useState(null);
  const [matches, setMatches] = useState(null);
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);



function handleInputChange(event) {
  setInput(event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0]; // Format the current date as "YYYY-MM-DD"

  axios({
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      params: { date: formattedDate },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    })
      .then((response) => {
        console.log(response.data.response, "response");

        const matches = response.data.response.filter((fixture) => {
          console.log(fixture.league.country, "fixture");
          return fixture.league.country === input;
        });
        console.log(matches, "matches");
        setMatches(matches);
      })
      .catch((error) => {
        console.log(error);
      });
      setInput("");
     }
    
 

  function getData(id, teams) {
    axios({
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: { fixture: id },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    })
      .then((response) => {
        console.log(response);
        console.log(id, "id");
        setMatchId(id);
        setTeams(teams);
        console.log(teams, "teams");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function Json() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Format the current date as "YYYY-MM-DD"
    console.log(formattedDate, "formattedDate");
    
    axios({
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      params: { date: formattedDate },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    })
      .then((response) => {
        console.log(response.data.response, "response");
  
        const matches = response.data.response.map((fixture) => {
          console.log(fixture.league.country, "fixture");
          return fixture.league.country;
        });
  
        const uniqueCountries = Array.from(new Set(matches)); // Remove duplicates using Set
  
        console.log(uniqueCountries, "uniqueCountries");
        setCountries(uniqueCountries);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      <button onClick={Json} type="button" className="btn btn-primary">
        Get Available Leagues
      </button>
      <h2>Available Leagues</h2>
      <div className="w-100 d-flex flex-wrap">
      {countries && countries.map((item) => {
        return <p className="league_button">{item}</p>
      })
      }
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          League
        </label>
          <input type="text" name="input" value={input} onChange={handleInputChange}/>
       
        <input type="submit" value="Submit" />

      </form>

      
      <table className="table-success table table-striped table-hover custom-table">
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>Home Odds</th>
            <th>Away Odds</th>
          </tr>
        </thead>
        <tbody>
          {matches &&
            matches.map((item) => {
              const id = item.fixture.id;
              const teams = {
                home: item.teams.home.name,
                away: item.teams.away.name,
              };
              console.log(id, "id");
              return (
                <tr key={id}>
                  <td>
                    {item.teams.home.name}
                    <Link to="betpage">
                      {" "}
                      <button
                        onClick={() => getData(id, teams)}
                        type="button"
                        class="btn btn-primary"
                      >
                        Get Data
                      </button>
                    </Link>
                  </td>
                  <td>{item.teams.away.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Outlet />
    </>
  );
};

export default Home;
