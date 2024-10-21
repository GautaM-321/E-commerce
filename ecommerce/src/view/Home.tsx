import React from "react";
import Navbar from "../Components/navabar";
import Background from "../Components/Background";
import "../style/home.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { sportsItem } from "../config/config";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/actions/Actions";


function Home() {
  const [myData, setMyData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getDocs(sportsItem).then((snapshot: any) => {
      setMyData(
        snapshot.docs.map((item: any) => {
          return item.data();
        })
      );
    });
  }, []);

  function navigate_allproducts() {
    navigate("/products");
  }
  function navigate_shoes() {
    navigate("/shoes");
  }
  function navigate_football() {
    navigate("/football");
  }
  function navigate_tennis() {
    navigate("/tennis");
  }
  function navigate_bats() {
    navigate("/bats");
  }
  return (
    <>
      <Navbar />
      <Background />
      <div className="All-Categories">
        <div className="upper-div">
          <div className="homeproduct" onClick={navigate_allproducts}>
            <img src={require("../assets/images/allproducts.jpg")}></img>
            <h1>All-Products</h1>
          </div>

          <div className="homeproduct">
            <img
              src={require("../assets/images/shoe.jpg")}
              onClick={navigate_shoes}
            ></img>
            <h1>Shoes</h1>
          </div>

          <div className="homeproduct">
            <img
              src={require("../assets/images/soccer.jpg")}
              onClick={navigate_football}
            ></img>
            <h1>Football</h1>
          </div>
        </div>

        <div className="lower-div">
          <div className="homeproduct">
            <img
              src={require("../assets/images/tennis.jpg")}
              onClick={navigate_tennis}
            ></img>
            <h1>tennis</h1>
          </div>

          <div className="homeproduct">
            <img
              src={require("../assets/images/cricketbat.jpg")}
              onClick={navigate_bats}
            ></img>
            <h1>CricketBats</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
