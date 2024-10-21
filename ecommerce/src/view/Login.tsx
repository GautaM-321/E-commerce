import { useState } from "react";
import "../style/login.css";
import { auth, fs, storage } from "../config/config";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { user_login_status } from "../store/actions/Actions";
import Navbar from "../Components/navabar";
import { users } from "../config/config";
import { add_cart } from "../store/actions/Actions";
import { add_wishlist } from "../store/actions/Actions";
import { getDocs } from "firebase/firestore";
import { logintype } from "../interface/type";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrormsg] = useState<string | null>(null);
  const [successmsg, setSuccessmsg] = useState<string | null>(null);
  const [loader,setLoader]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user_cred) => {
        setLoader(true)
        localStorage.setItem('curruser', JSON.stringify({ name: user_cred.user.displayName, email:user_cred.user.email }));
        setSuccessmsg("Loggedin Successfull.");
        setErrormsg("");

        dispatch(
          user_login_status({
            name: user_cred.user.displayName,
            email: user_cred.user.email,
            user_status: true,
          })
        );
        set_user_details(user_cred.user.email);
        setTimeout(() => {
          setSuccessmsg("");
          navigate("/products");
        }, 1500);
      })
      .catch((error) => {
        setErrormsg(error.code);
        setTimeout(() => {
          setErrormsg("")
        },1000);
      });
      
  };
  
  function set_user_details(mail: string|null) {
    getDocs(users).then((snapshot: any) => {
      snapshot.docs.map((item: any) => {
        if (mail == item.data().email) {
          dispatch(add_cart(item.data().cartlist));
          dispatch(add_wishlist(item.data().wishlist));
        }
      });
    });
  }
  return (
    <>
      <Navbar />
      {
      loader&&<div className="loader">
        <h5>Logging In...........</h5>
        <img src={require("../assets/images/spinner.gif")}  />
      </div>
      }
      {!loader&&<div className="login">
        <div className="background-login">
          <video
            src={require("../assets/videos/cricket.mp4")}
            autoPlay
            loop
            muted
          ></video>
        </div>
        <form  data-testid="login-form-submit" >
          <h2>Login Here</h2>
          <input
             data-testid="login-email"
            placeholder="Enter Mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          ></input>
          <input
           data-testid="login-pass"
            type="password"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          ></input>
          <button onClick={handlelogin} data-testid="login-btn">Login</button>

          <div className="link">
            <h4>
              Don't have an account?<NavLink to="/signup"> signup</NavLink>{" "}
              here.
            </h4>
            <div className="errormsg">
              {errormsg && (
                <>
                  <h3>Error:{errormsg}</h3>{" "}
                </>
              )}
            </div>
            <div className="successmsg">
              {successmsg && (
                <>
                  <h3>{successmsg}</h3>
                </>
              )}
            </div>
          </div>
        </form>
      </div>}
    </>
  );
}

export default Login;


