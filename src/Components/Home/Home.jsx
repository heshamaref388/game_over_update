/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import spinner from "../../images/spinner";
export default function Home() {
  const [AllGames, setAllGames] = useState([]);

  const Allgame = {
    method: "GET",
    url: `https://free-to-play-games-database.p.rapidapi.com/api/games`,
    headers: {
      "X-RapidAPI-Key": `1a614a2a9emsha645a3888a373c1p17a193jsn340fc56d0468`,
      "X-RapidAPI-Host": `free-to-play-games-database.p.rapidapi.com`,
    },
  };
  async function getAllGames() {
    let { data } = await axios.request(Allgame);
    setAllGames(data);
    // console.log(data);
  }

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <>
      <div className="head-home text-center pt-4">
        <h1 className="h2 fw-bolder mb-3">
          Find & track the best <span className=" text-info">free-to-play</span>{" "}
          games!
        </h1>
        <p className=" mb-3">
          Track what you've played and search for what to play next! Plus get
          free premium loot!
        </p>
        <Link to="/all">
          <button className="btn btn-outline-secondary btn-sm">
            Browse Games
          </button>
        </Link>
      </div>
      <div className="container">
        <h3 className="mt-5">
          <i className="fas fa-robot"></i> Personalized Recommendations
        </h3>
        {AllGames.length > 0 ? (
          <div className="row">
            {AllGames.slice(0, 3).map((game, index) => (
              <div key={index} className="col-md-4 mt-3">
                <Link to={"/gamedetails/" + game.id}>
                  <div className="game">
                    <img className="w-100" src={game.thumbnail} alt="" />
                    <div className=" d-flex justify-content-between align-items-center p-4">
                      <h5>{game.title}</h5>
                      <button className="btn btn-info btn-sm">Free</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="spinner">
            <img width="100px" src={spinner} alt="" />
          </div>
        )}
      </div>
    </>
  );
}
