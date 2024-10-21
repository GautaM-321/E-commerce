import React from "react";
import Navbar from "../Components/navabar";
import "../style/success.css";
import { useNavigate } from "react-router-dom";
function Paymentpage() {
  const navigate = useNavigate();
  function gotoproductpage() {
    navigate("/products");
  }
  return (
    <>
      <Navbar />

      <div className="successpage">
        <div className="successvideo">
          <img src={require("../assets/images/paymentsuccess.gif")} data-testid="paygif"  />
        </div>
        <div className="successbtn">
          <button data-testid="shoppingbtn" onClick={gotoproductpage}>
            <h3>Continue Shopping</h3>
          </button>
        </div>
      </div>
    </>
  );
}

export default Paymentpage;
