import { Routes, Route } from "react-router-dom";
import Home from "./view/Home";
import Products from "./view/Products";
import Login from "./view/Login";
import Sign_in from "./view/Sign_up";
import Add_cart from "./view/cart";
import Notfound from "./view/Notfound";
import Wishlist from "./view/Wishlist";
import CricketBat from "./Components/CricketBat";
import Tennis from "./Components/Tennis";
import SoccerBall from "./Components/SoccerBall";
import Shoes from "./Components/Shoes";
import Paymentpage from "./view/orderpage";
import Particular_product from "./view/Particular_product";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./store/actions/Actions";
import { useEffect } from "react";
import { getDocs } from "firebase/firestore";
import { sportsItem, users } from "./config/config";
import { add_cart } from "./store/actions/Actions";
import { ToastContainer } from "react-toastify";
import { add_wishlist } from "./store/actions/Actions";
import { user_login_status } from "./store/actions/Actions";
import Footer from "./Components/footer";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getDocs(sportsItem).then((snapshot: any) => {
      dispatch(
        setProducts(
          snapshot.docs.map((item: any) => {
            return item.data();
          })
        )
      );
    });
    const myItem = JSON.parse(localStorage.getItem("curruser") || "{}");
    console.log(myItem);
    if (myItem) {
      dispatch(
        user_login_status({
          name: myItem.name,
          email: myItem.email,
          user_status: true,
        })
      );

      getDocs(users).then((snapshot: any) => {
        snapshot.docs.map((item: any) => {
          if (myItem.email == item.data().email) {
            dispatch(add_cart(item.data().cartlist));
            dispatch(add_wishlist(item.data().wishlist));
          }
        });
      });
    }
  }, []);

  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Sign_in />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="bats" element={<CricketBat />}></Route>
          <Route path="football" element={<SoccerBall />}></Route>
          <Route path="tennis" element={<Tennis />}></Route>
          <Route path="shoes" element={<Shoes />}></Route>
          <Route path="cart" element={<Add_cart />}></Route>
          <Route path="details" element={<Particular_product />}></Route>
          <Route path="wishlist" element={<Wishlist />}></Route>
          <Route path="paymentpage" element={<Paymentpage />}></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
        <ToastContainer />
        <Footer />
      </div>
    </>
  );
}

export default App;
