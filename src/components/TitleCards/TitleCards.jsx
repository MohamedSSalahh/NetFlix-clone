import React, { useEffect, useRef, useState } from "react";
import "./Titlecards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzAyMmI1M2YwMzE0MDA1MzI0MjhjZWE0NWI0YTUyZCIsIm5iZiI6MTczMDI5OTg3My4wNjYwMDQsInN1YiI6IjY1OWE1MjAzYzk5NWVlMDA5NWNmMGI0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zYt9iqMui7uOZ5ddDRwthMXG8cd8cj5eN_0LIB1qDiw",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    const currentCardsRef = cardsRef.current;
    currentCardsRef.addEventListener("wheel", handleWheel);

    // Cleanup event listener
    return () => {
      currentCardsRef.removeEventListener("wheel", handleWheel);
    };
  }, [category]); // Added category to dependency array

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, i) => (
          <Link to={`/player/${card.id}`} className="card" key={i}>
            <img
              src={`https://image.tmdb.org/t/p/w500/` + card.backdrop_path}
              alt={card.original_title}
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;