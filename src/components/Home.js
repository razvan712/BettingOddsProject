import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import apiKey from "../data/config";
import { Button } from "react-bootstrap";

const Home = ({ matchId, setMatchId, setTeams }) => {
  const [league, setLeague] = useState(null);
  const [matches, setMatches] = useState(null);
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [input2, setInput2] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetchData();
  }, [input2]);

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    setInput2(input);
    setInput("");
    setSelected(countries.find((country) => country === input) || "");
  }

  function fetchData() {
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
        // console.log(response.data.response, "response");

        const filteredMatches = response.data.response.filter((fixture) => {
          // console.log(fixture.league.country, "fixture");
          return fixture.league.country === input2;
        });
        // console.log(filteredMatches, "matches");
        setMatches(filteredMatches);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchLeagues();
  }, []);

  function fetchLeagues() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // Format the current date as "YYYY-MM-DD"
    // console.log(formattedDate, "formattedDate");

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
        // console.log(response.data.response, "response");

        const matches = response.data.response.map((fixture) => {
          // console.log(fixture.league.country, "fixture");
          return fixture.league.country;
        });

        const uniqueCountries = Array.from(new Set(matches)); // Remove duplicates using Set

        // console.log(uniqueCountries, "uniqueCountries");
        setCountries(uniqueCountries);
      })
      .catch((error) => {
        console.log(error);
      });
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
        // console.log(response);
        // console.log(id, "id");
        setMatchId(id);
        setTeams(teams);
        // console.log(teams, "teams");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log(selected, "selected");

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>League</label>
        <input
          type="text"
          name="input"
          value={input}
          onChange={handleInputChange}
          className="leagues_input"
        />

        <input type="submit" value="Submit" className="form-submit" />
      </form>

      <h2>Available Leagues</h2>
      <div className="w-100 ">
        <div className="d-flex flex-wrap  w-100">
          {countries &&
            countries.map((item) => {
              return (
                <button
                  className={
                    selected === item
                      ? "league_button_selected league_button"
                      : "league_button"
                  }
                  onClick={(event) => {
                    setInput2(item);
                    setSelected((prev) => item);
                  }}
                >
                  {item}
                </button>
              );
            })}
        </div>
      </div>

      <table className="table-success table table-striped table-hover custom-table">
        <thead>
          <tr>
            <th>Home Team</th>

            <th>Away Team</th>
            <th></th>
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
              // console.log(id, "id");
              return (
                <tr key={id}>
                  <td className="team-table-data">{item.teams.home.name}</td>

                  <td className="team-table-data">{item.teams.away.name}</td>
                  <td>
                    {" "}
                    <Link to="betpage">
                      {" "}
                      {/* <Button onClick={() => getData(id, teams)} type="button">
                        Get Data
                      </Button> */}
                      <p>musana</p>
                    </Link>
                  </td>
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
