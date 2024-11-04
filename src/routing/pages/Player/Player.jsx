import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./player.css";
import back_arrow_icon from "../../../assets/back_arrow_icon.png";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzAyMmI1M2YwMzE0MDA1MzI0MjhjZWE0NWI0YTUyZCIsIm5iZiI6MTczMDI5OTg3My4wNjYwMDQsInN1YiI6IjY1OWE1MjAzYzk5NWVlMDA5NWNmMGI0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zYt9iqMui7uOZ5ddDRwthMXG8cd8cj5eN_0LIB1qDiw'
    }
  };
  
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
          setError(null);
        } else {
          setError("No video found for this movie");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to fetch video");
        setLoading(false);
      });
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className="player-loading">Loading...</div>;
  }

  if (error) {
    return <div className="player-error">{error}</div>;
  }

  return (
    <div className='player'>
      <img 
        src={back_arrow_icon} 
        alt="Go Back" 
        onClick={handleGoBack} 
        className="back-arrow" 
      />
      {apiData.key ? (
        <iframe 
          width="90%" 
          height="90%" 
          src={`https://www.youtube.com/embed/${apiData.key}`} 
          title={apiData.name || 'Movie Trailer'} 
          frameBorder="0" 
          allowFullScreen 
        ></iframe>
      ) : (
        <div className="no-trailer">No trailer available</div>
      )}
      <div className="player-info">
        <p>Published: {apiData.published_at ? new Date(apiData.published_at).toLocaleDateString() : 'N/A'}</p>
        <p>Title: {apiData.name || 'Unknown'}</p>
        <p>Type: {apiData.type || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Player;