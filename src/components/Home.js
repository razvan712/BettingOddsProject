import React, { useEffect, useState, useRef } from "react";

import axios from "axios";
import "./Home.scss";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import apiKey from "../data/config";
import { Button, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { fetchFixturesApi, fetchLeaguesApi } from "../api/index";

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split("T")[0];

const Home = ({ matchId, setMatchId, setTeams }) => {
  const [league, setLeague] = useState(null);
  const [matches, setMatches] = useState([]);
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [input2, setInput2] = useState('');
  const [selected, setSelected] = useState(
    sessionStorage.getItem("selected") || countries[0] || ""
  );

  const [initial, setInitial]= useState([])

  

  useEffect(() => {
    if (countries.length > 0) {
      setSelected(sessionStorage.getItem("selected") || countries[0]);
    }
  }, [countries]);


  useEffect(() => {
    fetchData(fixtures);
  }, [input2]);

  const { data: fixtures } = useQuery("matches", fetchFixturesApi);

  useEffect(() => {
    if (fixtures) {
      const filteredMatches = fixtures?.data?.response.filter((el) => {
        return el.league.country === selected;
      });
  
      setMatches(filteredMatches);
      console.log(filteredMatches, 'filteredMatches');
    }
  }, [fixtures, selected]);

  

  


  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    const lowercaseInput = input.toLowerCase();
    setInput2(input);
    setInput("");
    setSelected(countries.find((country) => country.toLowerCase() === lowercaseInput) || "");
  }
  
  function fetchData(data) {
    const filteredMatches = data?.data?.response.filter((fixture) => {
      return fixture.league.country.toLowerCase() === input2.toLowerCase();
    });
    setMatches(filteredMatches);
  }

  const {
    data: leagues,
    isLoading: isLoadingLeagues,
    error: errorLeagues,
  } = useQuery("leagues", fetchLeaguesApi);



  useEffect(() => {
    fetchLeagues(leagues);
    console.log(leagues, 'leagues')
  }, [leagues]);

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
          list="leagues-datalist"
          autoComplete="off"
        />

        <datalist id="leagues-datalist">
          {countries.map((item, index) => {
            return <option key={index} value={item} />;
          })}
        </datalist>
        <input type="submit" value="Search" className="form-submit" />
      </form>

      <h2>Available Leagues</h2>
      <div className="w-100 ">
        <div className="d-flex flex-wrap  w-100">
          {isLoadingLeagues?  <p>LOADING</p>:
            countries.map((item, index) => {
              return (
                <button key={index} 
                  className={
                    selected === item
                      ? "league_button_selected league_button text-truncate"
                      : "league_button text-truncate"
                  }
                  onClick={(event) => {
                    setInput2(item);
                    setSelected(item);
                    sessionStorage.setItem("selected", item);
                  }}
                  
                >
                  {item}
                </button>
              );
            })}
        </div>
      </div>

      <Table className="table-success table  table-hover custom-table">
        <thead>
          <tr>
            <th>League</th>
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
                  <td  ><p >{item.league.name}</p></td>
                  <td className="team-table-team"><p>{item.teams.home.name}</p></td>

                  <td className="team-table-team"><p>{item.teams.away.name}</p></td>
                  
                  
                  <td className="team-table-button">
                    {" "}
                    <Link to="betpage">
                      {" "}
                      <Button onClick={() => getData(id, teams)} type="button" >
                        Get Data
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Outlet />
    </>
  );
};

export default Home;
