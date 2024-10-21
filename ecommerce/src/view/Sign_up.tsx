import { useState } from "react";
import { auth, fs, storage } from "../config/config";
import { NavLink, useNavigate } from "react-router-dom";
import "../style/sign.css";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import Navbar from "../Components/navabar";
function Sign_in() {
  const [credentials, setCredentials] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [errormsg, setErrormsg] = useState<null | string>("");
  const [successmsg, setSuccessmsg] = useState<null | string>("");

  const navigate = useNavigate();

  const handlesignup = (e: any) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((cred) => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: credentials.fullname,
          })
            .then(() => {
              setSuccessmsg("SignUp successfull.");
              setErrormsg("");
              setTimeout(() => {
                setSuccessmsg("");
                createUserCollection(credentials.email);
                navigate("/login");
              }, 1500);
            })
            .catch((error) => {
              setErrormsg(error.code);
            });
        }
      })
      .catch((error) => {
        setErrormsg(error.code);
      });
  };

  const createUserCollection = async (mail: string) => {
    try {
      const userCollectionRef = collection(fs, "users");
      const userDocRef = doc(userCollectionRef, mail);
      const initialUserData = {
        email: mail,
        wishlist: [],
        cartlist: [],
        orderHistory: [],
      };
      await setDoc(userDocRef, initialUserData);
    } catch (error) {
    }
  };

  return (
    <>
      <Navbar />
      <div className="signin">
        <div className="background-sign">
          <video
            src={require("../assets/videos/cricket.mp4")}
            autoPlay
            loop
            muted
          />
        </div>
        <form onSubmit={handlesignup} autoComplete="on">
          <h2>SignUp</h2>
          <input
          data-testid="signup-name"
            placeholder="Enter Name"
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, fullname: e.target.value }));
            }}
            value={credentials.fullname}
          ></input>
          <input
           data-testid="signup-email"
            placeholder="Enter Mail"
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, email: e.target.value }));
            }}
            value={credentials.email}
          ></input>
          <input
           data-testid="signup-pass"
            placeholder="Enter Password"
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, password: e.target.value }));
            }}
            value={credentials.password}
          ></input>
          <button type="submit" data-testid="signupbtn" >SignUp</button>

          <div className="link">
            <h4>
              Already have an account?<NavLink to="/login"> Login</NavLink>{" "}
              here.
            </h4>
          </div>
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
        </form>
      </div>
    </>
  );
}

export default Sign_in;
