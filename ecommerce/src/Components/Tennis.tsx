import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./navabar";
import { add_cart } from "../store/actions/Actions";
import { add_wishlist } from "../store/actions/Actions";
import { toast } from "react-toastify";
import { carttype, itemtype, logintype, producttype, wishtype } from "../interface/type";
function Tennis() {
  const data = useSelector((state: producttype) => state.set_productReducer);
  const user_detail = useSelector((state: logintype) => state.set_user_status);
  const cartlist = useSelector((state: carttype) => state.add_cart_reducer);
  const Wishlist = useSelector((state: wishtype) => state.wishlist_reducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tennis_data = data.filter((tennis_data: itemtype) => {
    if (tennis_data.category == "racket") {
      return tennis_data;
    }
  });

  function go_to_detail_page(item: itemtype) {
    navigate("/details", {
      state: {
        data: item,
      },
    });
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
  function add_to_wishlist(item: itemtype) {
    if (user_detail.user_status) {
      if (
        Wishlist.some((product: itemtype) => {
          if (product.id == item.id) {
            return true;
          } else return false;
        })
      ) {
        toast.error("this item is already in wishlist");
      } else {
        Wishlist.push(item);
        dispatch(add_wishlist(Wishlist));
        toast.success("Item is added to wishlist");
      }
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <Navbar />
      <div className="allproducts">
        {tennis_data.map((item: itemtype) => {
          return (
            <div className="item-card">
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
                  <h4>{item.brand}</h4>
                  <img
                    src={require("../assets/images/wishlistlogo1.png")}
                    onClick={() => add_to_wishlist(item)}
                  ></img>
                </div>

                <span>{item.description}</span>
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
    </>
  );
}

export default Tennis;
