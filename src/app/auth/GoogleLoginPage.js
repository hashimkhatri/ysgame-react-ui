import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useGoogleSignInContext } from "../../context/GoogleSignInContext";
import { useLoader } from "../../utils/LoaderManager";
import axios from "axios";
import LoggedInRoute from "../../components/LoggedInRoute";
import Images from "../../constants/Images";

export default function Home() {
  const router = useNavigate();
  const { setGoogleData } = useGoogleSignInContext();
  const { showLoader, hideLoader } = useLoader();
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user) {
      showLoader();
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          hideLoader();
          setGoogleData(res.data);
          router("/auth/account-confirmation");
        })
        .catch((err) => {
          hideLoader()
          console.log(err)
        });
    }
  }, [user]);
  const logOut = () => {
    setGoogleData(null);
    googleLogout();
  };

  return (
    <LoggedInRoute>
    <div className="set-div-1">
      <div className="set-div-2">
        <div className="set-child-div">
          <img src={Images.logo} />
        </div>
        <div className="set-text-div">
          <h2>Welcome</h2>
          <p>Please sign in to continue</p>
        </div>

        <button className="set-btn-1" onClick={handleGoogleSignIn}>
          <img src={Images.google} /> Signin with Google
        </button>
      </div>
    </div>
    </LoggedInRoute>
  );
}
