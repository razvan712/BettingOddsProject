import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import apiKey from "../data/config";

const Home = ({ matchId, setMatchId, setTeams }) => {
  const [data, setData] = useState(null);
  const [matches, setMatches] = useState(null);

 

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
    axios({
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      params: { date: "2023-05-23" },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    })
      .then((response) => {
        console.log(response.data.response, "response");

        const matches = response.data.response.filter((fixture) => {
          console.log(fixture.league.country, "fixture");
          return fixture.league.country === "Colombia";
        });
        console.log(matches, "matches");
        setMatches(matches);
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
      <h2>Live Leagues</h2>

      <button onClick={Json} type="button" className="btn btn-primary">
        Get Brazil
      </button>
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
