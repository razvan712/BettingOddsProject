import React, {useState, useEffect } from "react";
import axios from "axios";


const Contact = ({matchId}) => {

  const [bookies, setBookies] = useState(null);
   
useEffect(() => {
  axios({
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
    params: {fixture: matchId},
    headers: {
      'X-RapidAPI-Key': '28cdf070a2mshf23d9b35518f007p12a63bjsn357aa4935178',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  })
  .then((response) => {
    console.log(matchId, "uuuuuuuuuuu")
    console.log(response.data.response[0].bookmakers[0].name, "odds");
    setBookies(response.data.response[0].bookmakers[0].name);
  })

}, [matchId]);

  

  return (
    <div>
      <h1>Contact</h1>
      <p>Match ID: {matchId}</p>
      <p>{bookies}</p>
      
    </div>
    
  );
};

export default Contact;