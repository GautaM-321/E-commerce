import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/navabar";
import { useSelector, useDispatch } from "react-redux";
import "../style/particular_product.css";
import { add_cart } from "../store/actions/Actions";
import { add_wishlist } from "../store/actions/Actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react"
import { itemtype } from "../interface/type";
function Particular_product() {
  const location = useLocation();
  const dispatch = useDispatch();
  const cartlist = useSelector((state: any) => state.add_cart_reducer);
  const wishlist = useSelector((state: any) => state.wishlist_reducer);
  const user_detail = useSelector((state: any) => state.set_user_status);
  const navigate = useNavigate();

  function add_to_cart() {
    if (user_detail.user_status) {
      if (
        cartlist.some((product: itemtype) => {
          if (product.id == location.state.data.id) {
            return true;
          } else return false;
        })
      ) {
        toast.error("Item is already in cart");
      } else {
        cartlist.push(location.state.data);
        dispatch(add_cart(cartlist));
        toast.success("Item is added to cartlist");
        
      }
    } else {
      navigate("/login");
    }
  }

  function add_to_wishlist() {
    if (user_detail.user_status) {
      if (
        wishlist.some((product: itemtype) => {
          if (product.id == location.state.data.id) {
            return true;
          } else return false;
        })
      ) {
        toast.error("Item is already in wishlist");
      } else {
        wishlist.push(location.state.data);
        dispatch(add_wishlist(wishlist));
        toast.success("Item is added to wishlist");
      }
    } else {
      navigate("/login");
    }
  }
  
  return (
    <>
      <Navbar />

      <div className="detailsection">
        <div className="leftsec">
          <img src={location.state.data.imgurl}></img>
        </div>
        <div className="rightsec">
          <div className="detail_description">
            <h4>{`${location.state.data.description}`}</h4>
          </div>
          <div className="detailbrand">
            <h2>
              {`${location.state.data.brand} ${location.state.data.category}`}
            </h2>
          </div>

          <div className="detail_rating">
            <img src={require("../assets/images/rating.png")}></img>
            <h4>{`${location.state.data.rating}/5`}</h4>
          </div>

          <div className="detail_price">
            <h5>
              <del>
                {" "}
                <span>&#x20B9;</span>
                {`${location.state.data.cancelledPrice}`}
              </del>
            </h5>
            <h4>
              <span>&#x20B9;</span>
              {`${location.state.data.Price}`}
            </h4>
          </div>
          <div className="detail_detailing">
            <span>{location.state.data.content}</span>
          </div>
          <div className="detailtag">
            <img src={require("../assets/images/pricetag.png")} alt="" />
            <h5>New in Stock</h5>
          </div>

          <div className="detail_buttons">
            <button onClick={add_to_cart} id="cartaddbtn">
              Add Cart
            </button>
            <button onClick={add_to_wishlist} id="wishaddbtn">
              Add WishList
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Particular_product;
