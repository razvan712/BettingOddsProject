import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BetPage.scss";
import Bets from "./Bets";
import apiKey from "../data/config";

const BetPage = ({ matchId, teams }) => {
  const [bookies, setBookies] = useState([]);
  const [activeBookie, setActiveBookie] = useState({});

  useEffect(() => {
    console.log(matchId, "fffffffffffff");
    axios({
      method: "GET",
      url: "https://api-football-v1.p.rapidapi.com/v3/odds",
      params: { fixture: matchId },
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
      },
    })
      .then((response) => {
        console.log(response.data, "odds");
        setBookies(response.data.response[0].bookmakers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [matchId]);

  useEffect(() => {
    console.log(activeBookie, "activeBookie");
  }, [activeBookie]);

  return (
    <>
      <div>
        {/* <p>Match ID: {matchId}</p> */}
        <div className="bookies_container">
          {bookies?.map((bookie) => {
            return (
              <button
                onClick={() => {
                  setActiveBookie((prev) => bookie);
                }}
                className="bookies_button"
                key={bookie.id}
              >
                {bookie.name}
              </button>
            );
          })}
        </div>
        <Bets activeBookie={activeBookie} teams={teams} />
      </div>
    </>
  );
};

export default BetPage;
