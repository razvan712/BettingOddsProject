import axios from "axios";
import apiKey from "../data/config";

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split("T")[0];

const fetchFixturesApi = () => {
  return axios({
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: { date: formattedDate },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  });
};

const fetchLeaguesApi = () => {
  return axios({
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: { date: formattedDate },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  });
};

export { fetchFixturesApi, fetchLeaguesApi };
