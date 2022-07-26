import React, { useEffect, useState } from "react";
import "./Home.scss";
import tvLogo from "./assets/images/tvmLogo.png";

function Home() {
  const [movie, setMovie] = useState([]);
  const [wordSearch, setWordSearch] = useState("");

  const serchMovies = async () => {
    await fetch("https://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((response) => setMovie(response));
  };
  console.log(movie);
  const feltredMovies = movie.filter((sum:any) => {
    return sum.name.toLowerCase().includes(wordSearch.toLowerCase());
  });

  useEffect(() => {
    serchMovies();
  }, []);

  return (
    <div>
      <div className="Header">
        <img src={tvLogo} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="40"
          fill="currentColor"
          className="bi bi-tv-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2z" />
        </svg>
      </div>

      <div className="inputbox">
        <h1> Choose A Life Of Entertainment Over The Boring Life</h1>

        <input
          type="text"
          placeholder="Search Your TV Show..."
          onChange={(e) => {
            setWordSearch(e.target.value);
          }}
        />
      </div>
      <div className="products-container">
        {feltredMovies
          ? feltredMovies.map((movie:any) => (
              <div key={movie.id}>
                <div className="card">
                  <img src={movie.image.medium} />
                  <h5>{movie.name}</h5>
                  <h6>{movie.genres + "  "} </h6>
                  <p>
                    {movie.schedule.days} {movie.schedule.time}
                  </p>

                  <a
                    href={`https://www.tvmaze.com/shows/${movie.id}`}
                    target="_blank"
                  >
                    View Details..
                  </a>
                </div>
              </div>
            ))
          : " No Results "}
      </div>
    </div>
  );
}

export default Home;
