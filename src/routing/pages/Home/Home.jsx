import React from "react";
import "./Home.css";

import hero_banner from "../../../assets/hero_banner.jpg";
import hero_title from "../../../assets/hero_title.png";
import TitleCards from "../../../components/TitleCards/TitleCards";
import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";

const Home = () => {
  
  return (
    <div className="home">
      <Navbar/>
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Discover his ties to a secert anicent order ,a young man living in
            modern Istanboul embarks on a quest to save the city from on
            innortal enemy{" "}
          </p>
          <div className="hero-btns">
          <button className="btn"><img/>Play</button>
          <button className="btn dark-btn"><img src={info_icon}/>More Info</button>
          </div>
          <TitleCards/> 
        </div> 
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Moives"} category={"top_rated"}/> 
        <TitleCards title={"Only on Netflix"} category={"popular"}/> 
        <TitleCards title={"Up coming Movies"} category={"upcoming"}/> 

        <TitleCards title={"Top Pics for You"} category={"now_playing"}/> 
      </div>
      <Footer/>
        </div>
  );
};

export default Home;
