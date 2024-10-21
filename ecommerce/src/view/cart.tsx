import Navbar from "../Components/navabar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../style/cartlist.css";
import { add_cart } from "../store/actions/Actions";
import { toast } from "react-toastify";
import { carttype,itemtype,logintype } from "../interface/type";
import{useState} from "react"
function Add_cart() {
  const cartlist = useSelector((state: carttype) => state.add_cart_reducer);
  const user_detail = useSelector((state: logintype) => state.set_user_status);
  const [loader,setLoader]=useState(false);
  var expectedprice = 0;
  var netprice = 0;
  var finalprice = 0;

  if (cartlist.length !== 0) {
    const expectedpricearr = cartlist.map((item: itemtype) => {
      return item.cancelledPrice * item.quantity;
    });
    const netpricearr = cartlist.map((item: itemtype) => {
      return item.cancelledPrice * item.quantity - item.Price * item.quantity;
    });

    const finalpricearr = cartlist.map((item: itemtype) => {
      return item.Price * item.quantity;
    });

    expectedprice = expectedpricearr.reduce((total: number, price: number) => {
      total = total + price;
      return total;
    });
    netprice = netpricearr.reduce((total: number, price: number) => {
      total = total + price;
      return total;
    });
    finalprice = finalpricearr.reduce((total: number, price: number) => {
      total = total + price;
      return total;
    });
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function go_to_detail_page(item: itemtype) {
    navigate("/details", {
      state: {
        data: item,
      },
    });
  }
  if (!user_detail.user_status) {
  }

  function gotologin() {
    navigate("/login");
  }

  function gotoproducts() {
    navigate("/products");
  }

  function deleteitem(item: itemtype) {
    const newcartlist = cartlist.filter((product: any) => {
      if (product.id !== item.id) {
        return item;
      }
    });
    dispatch(add_cart(newcartlist));
  }
  function addquantity(item: itemtype) {
    const addedcart = cartlist.map((product: itemtype) => {
      if (product.id === item.id) {

        return {
          Price: item.Price,
          brand: item.brand,
          category: item.category,
          description: item.description,
          id: item.id,
          imgurl: item.imgurl,
          quantity: product.quantity + 1,
          rating: item.rating,
          detail: item.detail,
          cancelledPrice: item.cancelledPrice,
          content: item.content,
        };
      } else return product;
    });
    dispatch(add_cart(addedcart));
  }
  function subquantity(item: itemtype) {
    if (item.quantity == 1) {
      toast.error("Quantity cannot be less than 1 ");
      return;
    }

    const subitemquantity = cartlist.map((product: itemtype) => {
      if (product.id === item.id) {

        return {
          Price: item.Price,
          brand: item.brand,
          category: item.category,
          description: item.description,
          id: item.id,
          imgurl: item.imgurl,
          quantity: product.quantity - 1,
          rating: item.rating,
          detail: item.detail,
          cancelledPrice: item.cancelledPrice,
          content: item.content,
        };
      } else return product;
    });
    dispatch(add_cart(subitemquantity));
  }
  function paypage() {
    setLoader(true);
    dispatch(add_cart([]));
     setTimeout(()=>{
      navigate("/paymentpage");
        },1500)
    
    
  }

  return (
    <>
      <Navbar />
      {
        loader&&<div className="loader">
          <p>Fetching payment details</p>
          <img src={require("../assets/images/spinner.gif")}  /></div>
      }
      {(!user_detail.user_status &&!loader ) && (
        <>
          <div className="emptycartlist" data-testid="nousercart">
            <div className="emptycartlogo">
              <img src={require("../assets/images/emptyCartimg.png")} />
            </div>
            <div className="emptycontent">
              <button onClick={gotologin}>Login</button>
            </div>
          </div>
        </>
      )}

      {(cartlist.length == 0 && user_detail.user_status&& !loader) && (
        <>
          <div className="emptycartlist">
            <div className="emptycartlogo">
              <img src={require("../assets/images/emptyCartimg.png")} />
            </div>
            <div className="emptycontent">
              <button onClick={gotoproducts}>Shop Now</button>
            </div>
          </div>
        </>
      )}
     
      {user_detail.user_status && cartlist.length !== 0 && (
        <div className="cartpage">
          <div className="cartList">
            {cartlist.map((item: itemtype) => {
              return (
                <div className="item-card-cart">
                  <div className="productimagecart">
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
                  <div className="cancelitem">
                    <img
                      src={require("../assets/images/cancellogo.png")}
                      onClick={() => deleteitem(item)}
                    />
                  </div>
                  <div className="itemcontentcart">
                    <h2>{item.brand}</h2>
                    <h4>{item.description}</h4>
                    <span>{item.detail}</span>
                    <div className="itemquantity">
                      <button onClick={() => addquantity(item)}>+</button>
                      <input value={item.quantity}></input>
                      <button
                        onClick={() => {
                          subquantity(item);
                        }}
                      >
                        -
                      </button>
                    </div>
                    <div className="itempricecart">
                      <span>
                        <del>
                          <span>&#x20B9;</span>
                          {item.cancelledPrice}
                        </del>
                      </span>
                      <p>
                        <span>&#x20B9;</span>
                        {item.Price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="orderpage">
            <div className="orderheading">
              <h1>OrderList</h1>
            </div>

            <div className="ordercontent">
              <div className="leftorderpage">
                <h4>Expected Price</h4>
                <h4>Deducted Price</h4>
              </div>

              <div className="rightorderpage">
                <h4>
                  <span>&#x20B9;</span>
                  <span>{expectedprice}</span>
                </h4>
                <h4>
                  <span>&#x20B9;</span>
                  <span>{netprice}</span>
                </h4>
              </div>
            </div>
            <div className="ordertotalpricediv">
              <h4>Total Bill</h4>
              <h4>
                <span>&#x20B9;</span>
                <span>{finalprice}</span>
              </h4>
            </div>

            <div className="placeorderbutton">
              <button onClick={paypage}>Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Add_cart;
