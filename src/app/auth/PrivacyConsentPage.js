import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleSignInContext } from "../../context/GoogleSignInContext";
import { fetchData, postData } from "../../utils/ApiUtils";
import { useLoader } from "../../utils/LoaderManager";
import toast, { Toaster } from "react-hot-toast";
import LoggedInRoute from "../../components/LoggedInRoute";
import "../styles/styles.css";
import Images from "../../constants/Images";

export default function PrivacyConsentPage() {
  const router = useNavigate();
  const { setGoogleData, googleData } = useGoogleSignInContext();
  const { showLoader, hideLoader } = useLoader();
  const [customData, setCustomData] = useState(null);

  useEffect(() => {
    if (googleData === null) {
      router("/");
    }

    const getContent = async () => {
      showLoader()
      try {
        const response = await fetchData("custom-datas/get/privacy_policy", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response) {
          setCustomData(response);
        } else {
          setCustomData(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setCustomData(null);
      } finally {
        hideLoader()
      }
    };
    getContent();
  }, []);
  const handleSignUp = async () => {
    showLoader();

    try {
      const result = await postData(
        "register",
        {
          auth_payload: googleData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("authResponse", JSON.stringify(result));
      hideLoader();
      router("/lobby");
    } catch (error) {
      hideLoader();
      toast.error("Sign-In Error: " + error.message, {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  return (
    <LoggedInRoute>
      <div className="second-login-screen set-div-1">
        <Toaster />
        <div className="set-div-2">
          <div className="set-child-div">
            <img src={Images.logo} />
          </div>
          <div className="set-text-div">
            <p>Read our privacy policy and terms of service</p>
          </div>

          <div className="set-content-div">
            <p className="privacy-p-1">{customData}</p>
          </div>

          <button className="set-btn-1" onClick={handleSignUp}>
            Confirm
          </button>
        </div>
      </div>
    </LoggedInRoute>
  );
}
