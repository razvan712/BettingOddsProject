import React from "react";
import "./Bets.scss";
import { Table } from "react-bootstrap";

const Bets = ({ activeBookie, teams }) => {
  console.log(activeBookie, "activeBookie");
  const bothTeamsScore = activeBookie?.bets?.filter(
    (bet) => bet.name === "Both Teams Score"
  );
  console.log(bothTeamsScore, "BothTeamsScore");
  const exactScore = activeBookie?.bets?.filter(
    (bet) => bet.name === "Exact Score"
  );
  console.log(exactScore, "exactScore");
  const asianHandicap = activeBookie?.bets?.filter(
    (bet) => bet.name === "Asian Handicap"
  );
  console.log(asianHandicap, "asian Handicap");

  return (
    <>
      <div>
        <h3>
          Bets for {teams.home} vs {teams.away} {activeBookie?.name}
        </h3>
        {activeBookie && activeBookie.name ? (
          <>
            {" "}
            <Table className="match_winner_table" bordered variant="dark">
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
                  <td className="hover-highlight">
                    {teams.home}{" "}
                    <p className="odd">
                      {activeBookie.bets[0]?.values[0]?.odd}{" "}
                    </p>
                  </td>
                  <td className="hover-highlight">
                    draw{" "}
                    <p className="odd">
                      {activeBookie.bets[0]?.values[1]?.odd}{" "}
                    </p>
                  </td>
                  <td className="hover-highlight">
                    {teams.away}{" "}
                    <p className="odd">
                      {activeBookie.bets[0]?.values[2]?.odd}
                    </p>
                  </td>
                </tr>
              </tbody>
            </Table>
            {bothTeamsScore && bothTeamsScore[0] ? (
              <Table className="match_winner_table" bordered variant="dark">
                <thead>
                  <tr>
                    <th colSpan={3}>
                      <div className="d-flex justify-content-center">
                        Both teamss score {teams.home} vs {teams.away}
                      </div>{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="hover-highlight">
                      Yes{" "}
                      <p className="odd">
                        {bothTeamsScore[0]?.values[0]?.odd}{" "}
                      </p>
                    </td>
                    <td className="hover-highlight">
                      No{" "}
                      <p className="odd">{bothTeamsScore[0]?.values[1]?.odd}</p>
                    </td>
                  </tr>
                </tbody>
              </Table>
            ) : null}
          </>
        ) : null}
        {exactScore && exactScore[0] ? (
          <Table className="exact_score_table" bordered variant="dark">
            <thead>
              <tr>
                <th colSpan={3}>
                  <div className="d-flex justify-content-center">
                    Exact score {teams.home} vs {teams.away}
                  </div>{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {exactScore[0]?.values
                ?.reduce((acc, value, index) => {
                  const rowIndex = Math.floor(index / 3);
                  if (!acc[rowIndex]) {
                    acc[rowIndex] = [];
                  }
                  acc[rowIndex].push(
                    <td key={value.value} className="hover-highlight">
                      <div>{value.value}</div>{" "}
                      <div className="odd">{value.odd}</div>
                    </td>
                  );
                  return acc;
                }, [])
                ?.map((row, rowIndex) => (
                  <tr key={rowIndex}>{row}</tr>
                ))}
            </tbody>
          </Table>
        ) : null}
        {asianHandicap && asianHandicap[0] ? (
          <Table className="asian_handicap_table" bordered variant="dark">
            <thead>
              <tr>
                <th colSpan={3}>
                  <div className="d-flex justify-content-center">
                    Asian handicap {teams.home} vs {teams.away}
                  </div>{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {asianHandicap[0]?.values
                ?.reduce((acc, value, index) => {
                  const rowIndex = Math.floor(index / 2);
                  if (!acc[rowIndex]) {
                    acc[rowIndex] = [];
                  }
                  acc[rowIndex].push(
                    <td key={value.value} className="hover-highlight">
                      <div>{value.value}</div>{" "}
                      <div className="odd">{value.odd}</div>
                    </td>
                  );
                  return acc;
                }, [])
                ?.map((row, rowIndex) => (
                  <tr key={rowIndex}>{row}</tr>
                ))}
            </tbody>
          </Table>
        ) : null}
      </div>
    </>
  );
};

export default Bets;
