import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleSignInContext } from "../../context/GoogleSignInContext";
import { googleLogout } from "@react-oauth/google";
import { useLoader } from "../../utils/LoaderManager";
import LoggedInRoute from "../../components/LoggedInRoute";
import { fetchData } from '../../utils/ApiUtils';
import "../styles/styles.css";
import Images from "../../constants/Images";

export default function AccountConfirmationPage() {
  const router = useNavigate();
  const { googleData, setGoogleData } = useGoogleSignInContext();
  const [customData, setCustomData] = useState(null);

  const { showLoader, hideLoader } = useLoader();
  

  useEffect(() => {
    if(googleData === null){
      router('/')
    }
    const getContent = async () => {
showLoader()
        try {
            const response = await fetchData('custom-datas/get/account_confirmation', {
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
            console.error('Error fetching user profile:', error);
            setCustomData(null);
        } finally {
            hideLoader()
        }
    };
    getContent();
}, []);
  const reLogin = () =>{
    setGoogleData(null);
    googleLogout();
    router('/')
  }

  return (
    <LoggedInRoute>
    <div className="second-login-screen set-div-1">
      <div className="set-div-2">
        <div className="set-child-div">
          <img src={Images.logo} />
        </div>
        <div className="set-text-div">
          <p>Confirm your Google account</p>
        </div>
        <div className="set-profile-div">
          <img src={googleData?.picture} alt="" />
          <p>
            {googleData?.name} <span className="d-block">{googleData?.email} </span>
          </p>
        </div>
        <div className="set-content-div">
          <p>{customData}</p>
        </div>

        <button className="set-btn-1" onClick={()=>router('/auth/privacy-consent')}>
          <img src={Images.google} /> Signin with Google
        </button>
        <button className="set-btn-2" onClick={reLogin}>Change Account</button>
      </div>
    </div>
    </LoggedInRoute>
  );
}
