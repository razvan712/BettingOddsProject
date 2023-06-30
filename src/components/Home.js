import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import apiKey from "../data/config";
import { Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { fetchFixturesApi, fetchLeaguesApi } from "../api/index";

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split("T")[0];

const Home = ({ matchId, setMatchId, setTeams }) => {
  const [league, setLeague] = useState(null);
  const [matches, setMatches] = useState(null);
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [input2, setInput2] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetchData(fixtures);
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

  const { data: fixtures } = useQuery("matches", fetchFixturesApi);

  function fetchData(data) {
    const filteredMatches = data?.data?.response.filter((fixture) => {
      return fixture.league.country === input2;
    });
    setMatches(filteredMatches);
  }

  const {
    data: leagues,
    isLoading: isLoadingLeagues,
    error: errorLeagues,
  } = useQuery("leagues", fetchLeaguesApi);

  console.log(leagues, "leagues");

  useEffect(() => {
    fetchLeagues(leagues);
  }, []);

  function fetchLeagues(data) {
    const matches = data?.data?.response.map((fixture) => {
      return fixture.league.country;
    });

    const uniqueCountries = Array.from(new Set(matches)); // Remove duplicates using Set

    setCountries(uniqueCountries);
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
        setMatchId(id);
        setTeams(teams);
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

              return (
                <tr key={id}>
                  <td className="team-table-data">{item.teams.home.name}</td>

                  <td className="team-table-data">{item.teams.away.name}</td>
                  <td>
                    {" "}
                    <Link to="betpage">
                      {" "}
                      <Button onClick={() => getData(id, teams)} type="button">
                        Get Data
                      </Button>
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
