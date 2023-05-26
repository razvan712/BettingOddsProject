import React from "react";
import "./Bets.scss";
import { Table } from "react-bootstrap";

const Bets = ({ activeBookie, teams }) => {
  return (
    <>
      <div>
        <h3>
          Bets for {teams.home} vs {teams.away}{" "}
        </h3>
        { activeBookie && activeBookie.name &&  <Table  className="match_winner_table" bordered striped hover variant="dark">
          <thead>
            <tr>
              <th colSpan={3}>
                <div className="d-flex justify-content-center">
                  Match winner {teams.home} vs {teams.away}
                </div>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td >{teams.home}  {activeBookie.bets[0].values[0].odd}  </td>
              <td >draw   {activeBookie.bets[0].values[1].odd}</td>
              <td >{teams.away} {activeBookie.bets[0].values[2].odd}</td>
            </tr>
          </tbody>
        </Table>}
      </div>
    </>
  );
};

export default Bets;
