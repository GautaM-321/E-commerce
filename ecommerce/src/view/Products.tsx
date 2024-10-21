import React from "react";
import Navabar from "../Components/navabar";
import "../style/products.css";
import { sportsItem } from "../config/config";
import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { add_cart } from "../store/actions/Actions";
import { add_wishlist } from "../store/actions/Actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setProducts } from "../store/actions/Actions";
import { carttype, itemtype, logintype, wishtype } from "../interface/type";
function Products() {
  const data = useSelector((state: any) => state.set_productReducer);
  const user_detail = useSelector((state:logintype) => state.set_user_status);
  const cartitems = useSelector((state: carttype) => state.add_cart_reducer);
  const wishlistitems = useSelector((state: wishtype) => state.wishlist_reducer);
  const [imagechange, setImagechange] = useState(false);
  const [price, setPrice] = useState(0);
  const products = useSelector((state: any) => state.set_productReducer);
  const [range, setRange] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function go_to_detail_page(item: any) {
    navigate("/details", {
      state: {
        data: item,
      },
    });
  }

  function add_to_cart(item: any) {
    if (user_detail.user_status) {
      if (
        cartitems.some((product: any) => {
          if (product.id === item.id) {
            return true;
          } else return false;
        })
      ) {
        toast.error("Item is already in cart");
      } else {
        navigate("/products");
        cartitems.push(item);
        dispatch(add_cart(cartitems));
        toast.success("Item added to cart");
      }
    } else {
      navigate("/login");
    }
  }
  function add_to_wishlist(item: any) {
    if (user_detail.user_status) {
      if (
        wishlistitems.some((product: any) => {
          if (product.id == item.id) {
            return true;
          } else return false;
        })
      ) {
        toast.error("this item is already in wishlist");
      } else {
        navigate("/products");
        wishlistitems.push(item);
        dispatch(add_wishlist(wishlistitems));
        toast.success("Item is added to wishlist");
      }
      setImagechange(true);
    } else {
      navigate("/login");
    }
  }
  function varyprice(event: any) {
    setPrice(event.target.value);
  }
  function varyrange(event: any) {
    setRange(event.target.value);
  }

  
  useEffect(() => {
    const newarr = products.filter((item: itemtype) => {
      if (item.Price <= price && item.rating <= range) {
        return item;
      }
    });
    if (newarr.length == 0  ) {
      getDocs(sportsItem).then((snapshot: any) => {
        dispatch(
          setProducts(
            snapshot.docs.map((item: any) => {
              return item.data();
            })
          )
        );
      });
    }
    dispatch(setProducts(newarr));
  }, [price, range]);
 
  return (
    <>
      <Navabar />
      <div className="carasol">
        <img src={require("../assets/images/carasol1.webp")} alt="" />
      </div>
      <div className="productspage">
        <div className="filtersection">
          <div className="filterheading">
            <h4>
              Filter <img src={require("../assets/images/slider.png")} alt="" />
            </h4>
          </div>
          <h4>Price</h4>
          <input
            type="range"
            min="0"
            max="8000"
            id="slider1"
            onChange={varyprice}
            value={price}
          />
          <p>
            <span>&#x20B9;</span>
            {`${price}`}
          </p>
          <h4>Rating</h4>
          <input
            type="range"
            min="0"
            max="5"
            id="slider1"
            onChange={varyrange}
            value={range}
          />
          <p>
            <img src={require("../assets/images/rating.png")} />
            {`${range}`}
          </p>
           
        </div>
        <div className="allproducts">
          {data.map((item: any) => {
            return (
              <div className="item-card" id={item.id}>
                <div className="productimage">
                  <img
                    src={item.imgurl}
                    onClick={() => go_to_detail_page(item)}
                  ></img>
                  <p id="newtag">New</p>

                  <div className="rating">
                    <img src={require("../assets/images/rating.png")}></img>
                    <h5>{item.rating}</h5>
                  </div>
                </div>

                <div className="itemcontent">
                  <div className="wishlogo">
                    <h4>{`${item.brand} ${item.category}`}</h4>

                    <img
                      src={require("../assets/images/wishlistlogo1.png")}
                      onClick={() => add_to_wishlist(item)}
                    ></img>
                  </div>

                  <span>{item.description}</span>
                  <br />
                  <del>
                    <span>&#x20B9;</span>
                    {item.cancelledPrice}
                  </del>
                  <p>
                    <span>&#x20B9;</span>
                    {item.Price}
                  </p>
                </div>

                <button onClick={() => add_to_cart(item)}>Add Cart</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Products;
