import "../style/home.css";

import Navbar from "../components/Navbar"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [showButton, setShowButton] = useState(true);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="inner-container">
          { showButton ? 
            <button className="start-button" onClick={() => setShowButton(false)}>
              START
            </button> :
            <div>
              <button className="back-button" onClick={() => setShowButton(true)}>Back</button>
              <h3 className="header">Choose your school</h3>
              <div className="school-container">
                <div className="school-box">
                  <img src={require("../media/boun.png")} alt="boun" className="school-image" style={{ cursor: "pointer" }}/>
                </div>
                <div className="school-box">
                  <img src={require("../media/ıtu.png")} alt="ıtu" className="school-image" style={{ width: "160px", height: "200px", margin: "0 20px", filter: "blur(2px)" }}/>
                  <p className="cooming-soon">Coming Soon</p>
                </div>
                <div className="school-box">
                  <img src={require("../media/koc.png")} alt="koc" className="school-image" style={{ width: "200px", height: "70px", margin: "65px 0" , filter: "blur(2px)"}}/>
                  <p className="cooming-soon">Coming Soon</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
