import Navbar from "../Components/navabar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../style/wishlist.css";
import { add_cart } from "../store/actions/Actions";
import { add_wishlist } from "../store/actions/Actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { carttype, itemtype, logintype, wishtype } from "../interface/type";

function Wishlist() {
  const Wishlist = useSelector((state: wishtype) => state.wishlist_reducer);
  const user_detail = useSelector((state: logintype) => state.set_user_status);
  const cartlist = useSelector((state: carttype) => state.add_cart_reducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function go_to_detail_page(item: itemtype) {
    navigate("/details", {
      state: {
        data: item,
      },
    });
  }
  function gotologin() {
    navigate("/login");
  }
  function gotoproducts() {
    navigate("/products");
  }
  function add_to_cart(item: itemtype) {
    if (user_detail.user_status) {
      if (
        cartlist.some((product: itemtype) => {
          if (product.id == item.id) {
            return true;
          } else return false;
        })
      ) {
        toast.error("Item is already in cart");
      } else {
        cartlist.push(item);
        dispatch(add_cart(cartlist));
        const newwwishlist = Wishlist.filter((product: itemtype) => {
          if (product.id !== item.id) {
            return item;
          }
        });
        dispatch(add_wishlist(newwwishlist));
        toast.success("Item added To orderlist");
      }
    } else {
      navigate("/login");
    }
  }

  function deleteitem(item: itemtype) {
    const newwishlist = Wishlist.filter((product: itemtype) => {
      if (product.id !== item.id) {
        return item;
      }
    });
    dispatch(add_wishlist(newwishlist));
  }
  return (
    <>
      <Navbar />
      {!user_detail.user_status && (
        <>
          <div className="emptywishlist">
            <div className="emptywishlogo">
              <img src={require("../assets/images/emptywishlistlogo.png")} />
            </div>
            <div className="emptycontent">
              <button onClick={gotologin}>Login</button>
            </div>
          </div>
        </>
      )}
      {Wishlist.length == 0 && user_detail.user_status && (
        <>
          <div className="emptywishlist">
            <div className="emptywishlogo">
              <img src={require("../assets/images/emptywishlistlogo.png")} />
            </div>
            <div className="emptycontent">
              <button onClick={gotoproducts}>Shop Now</button>
            </div>
          </div>
        </>
      )}
      <div className="wishpage">
        <div className="wishlist">
          {Wishlist.map((item: itemtype) => {
            return (
              <div className="item-card-wish">
                <div className="productimagewish">
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
                <div className="itemcontentwish">
                  <h4>{item.description}</h4>
                  <h2>{`${item.brand} ${item.category}`}</h2>

                  <span>{item.detail}</span>

                  <div className="itempricewish">
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

                  <button onClick={() => add_to_cart(item)}>Add Cart</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="wishpageimg">
          <img src={require("../assets/images/wishlistrightdivimg.png")} />
        </div>
      </div>
    </>
  );
}

export default Wishlist;
