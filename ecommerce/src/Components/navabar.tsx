import React, { useState,useEffect } from "react";
import "../style/navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fs,sportsItem } from "../config/config";
import { collection, doc, updateDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import {add_cart,add_wishlist,setProducts,user_logout_status,} from "../store/actions/Actions";
import { carttype, itemtype, logintype, producttype, wishtype } from "../interface/type";
import { toast } from "react-toastify";

function Navbar() {
  const cartlist = useSelector((state: carttype) => state.add_cart_reducer);
  const wishlist = useSelector((state: wishtype) => state.wishlist_reducer);
  const user_detail = useSelector((state:any) => state.set_user_status);
  const products=useSelector((state:any)=> state.set_productReducer)
  const [value,setValue]=useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
function setallproducts()
{
  getDocs(sportsItem).then((snapshot:any) => {
    dispatch(
      setProducts(
        snapshot.docs.map((item:any) => {
          return item.data();
        })
      )
    );
  });
}
  

  function go_to_home_page() {
    navigate("/")
  }
  
  function handle_user() {
    updateDataInFirebase();
    localStorage.removeItem('curruser');
    dispatch(
      user_logout_status({
        name: "",
        email: "",
        user_status: false,
      })
    );
    dispatch(add_cart([]));
    dispatch(add_wishlist([]));
    navigate("/login");
  }
  function redirect_loginpage() {
    navigate("/login");
  }
  function directtocart()
  {
    navigate("/cart")
  }
  function directtowishlist()
  {
    navigate("/wishlist")
  }
  function directtoproduct()
  {
    navigate("/products")
  }
  function searchitems(value:string)
  {
     value.toLowerCase()
     const newarr=products.filter((item:itemtype)=>{
          const newstring1=item.brand+" "+item.category
          const newstring2=item.brand+item.category
          newstring1.toLowerCase()
          newstring2.toLowerCase()
        if(value==newstring1 || value==newstring2)
        {
          return item;
        }
        
     })
     if(newarr.length==0)
     {
      toast.error("Item is out of stock")
     }
     dispatch(setProducts(newarr))
     
  }
  const updateDataInFirebase = async () => {
    if (user_detail.user_status) {
      const userDocRef = doc(collection(fs, "users"), user_detail.email);

      try {
        await updateDoc(userDocRef, { cartlist: cartlist, wishlist: wishlist })
      } catch (error) {

      }
    }
  };

  useEffect(()=>{
    if(value=="")
    {
      setallproducts()
    }
    
  },[value])

  
  return (
    <div className="navbar" data-testid="navbarr">
      <div className="menu-logo">
        <img src={require("../assets/images/menulogo.png")}></img>
        <NavLink to="/products" onClick={setallproducts} data-testid="productlink">All Products</NavLink>
      </div>
      <div className="websitelogo">
        <h1>SportYolo</h1>
      </div>

      <div className="search" data-testid="search-field">
        <input placeholder="Search For 25+ Products......." type="text" id="search" onChange={(e)=>{setValue(e.target.value)}}
        value={value}/>
        <span onClick={()=>{searchitems(value)}}>
          <img src={require("../assets/images/searchicon.png")}></img>
        </span>
      </div>
      <div className="person-logo" data-testid="user-div" >
        <p>
          <img src={require("../assets/images/userlogo.png")}></img>
        </p>
         {user_detail.user_status&&<h5>{user_detail.name}</h5>}
         {!user_detail.user_status&&<h5>User</h5>}
        <div className="userinfo" data-testid="hover-div" >
          {user_detail.user_status && <h5>{`Hello ${user_detail.name}`}</h5>}
          {!user_detail.user_status && <h5 data-testid="nouserhover">No user </h5>}
          {user_detail.user_status && (
            <div className="userdiv" >
             
             <p ><button onClick={directtocart} data-testid="hover-cart">Cartlist</button></p>
             <p ><button onClick={directtowishlist} data-testid="hover-wishlist">Wishlist</button></p> 
             <p ><button onClick={directtoproduct} data-testid="hover-product">All Products</button></p>
             <p ><button onClick={handle_user} data-testid="hover-login">Logout</button></p>
            
            </div>
          )}
          {!user_detail.user_status && (
            <>
              <button onClick={redirect_loginpage} data-testid="nouserhover1">Login</button>
            </>
          )}
        </div>
       
      </div>

      <div className="webhome" onClick={go_to_home_page} data-testid="homelink">
        <p>
          <img src={require("../assets/images/homelogo.png")} />
        </p>
        <h5>Home</h5>
      </div>
      <div className="webCart">
      {(cartlist.length!=0)&&<div className="inccart">
         <h6>{cartlist.length}</h6>
          </div>}
          {(cartlist.length==0)&&<div className="inccart">
          </div>}
        <p>
          <img
            src={require("../assets/images/cartlogo.png")}
            onClick={directtocart}
            data-testid="cartlink"
          ></img>

         
          </p>
        <h5>Cart</h5>
       
      </div>

      <div className="webwishlist" onClick={directtowishlist} data-testid="wishlink">
     { (wishlist.length!==0)&&<div className="incwish">
         <h6>{wishlist.length}</h6>
          </div>}
        <p>
          <img src={require("../assets/images/heartlogo.png")}></img>
        </p>
        <h5>Wishlist</h5>
      </div>
    </div>
  );
}

export default Navbar;
