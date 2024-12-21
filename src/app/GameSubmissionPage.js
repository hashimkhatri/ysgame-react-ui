import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { UseUserProfile } from "../hooks/UseUserProfile";
import { UseCountry } from "../hooks/UseCountry";
import { useLoader } from "../utils/LoaderManager";
import toast, { Toaster } from "react-hot-toast";
import { postData } from "../utils/ApiUtils";
import Images from "../constants/Images";

import "./styles/styles.css";

export default function GameSubmissionPage() {
  const router = useNavigate();
  const { user, loading, error } = UseUserProfile(true);
  const {
    country,
    loading: countryLoading,
    error: countryError,
  } = UseCountry();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userNickName, setUserNickName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userDateOfBirth, setUserDateOfBirth] = useState("");
  const { showLoader, hideLoader } = useLoader();

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const updateProfile = async () => {
    showLoader();
    const data = {
      name: userName,
      email: userEmail,
      bio: userBio,
      nick_name: userNickName,
      phone: userPhone,
      country_id: userCountry,
      date_of_birth: formatDate(userDateOfBirth),
    };
    console.log(data);

    try {
      const response = await postData("update-profile", data);
      hideLoader();
      console.log(response);
      toast.success("Profile updated successfully", {
        position: "top-center",
        duration: 3000,
      });
    } catch (error) {
      hideLoader();
      toast.error("Error: " + error.message, {
        position: "top-center",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      if (error != null) {
        localStorage.removeItem("authResponse");
        router("/");
      }

      if (user) {
        setUserName(user.name);
        setUserEmail(user.email);
        setUserBio(user.profile?.bio);
        setUserNickName(user.profile?.nick_name);
        setUserPhone(user.profile?.phone);
        setUserCountry(user.profile?.country_id);
        setUserDateOfBirth(user.profile?.date_of_birth);
      }
    }
  }, [error, loading, user]);

  return (
    <Layout
      showBack={true}
      setBack={() => {
        router(-1);
      }}
      showLeft={!!user}
      showRight={!!user}
      bgColor={true}
      bgClass="set-div-3-bg"
      showLogout={true}
      rightAction = {() => {
        localStorage.removeItem("authResponse");
        router("/");
      }}
    >
      {loading ? null : (
        <>
          {user && (
            <div className="setting-div">
              <h3 className="page-name">Game submission status</h3>
              <div className="setting-scroll-div">
                <div className="section-item">
                  <p
                    className="section-item-label"
                    style={{ textAlign: "left" }}
                  >
                    <img src={Images.greenball} />
                    <span className="label-span-1">
                      {" "}
                      Game submitted
                    </span> <br /> Super Mario Bros. 3
                  </p>
                  <img className="arrow-right" src={Images.arrow_down} />
                </div>
                <div className="section-item">
                  <p
                    className="section-item-label"
                    style={{ textAlign: "left" }}
                  >
                    <img src={Images.grayball} />
                    <span className="label-span-2">
                      {" "}
                      Waiting for mailer
                    </span>{" "}
                    <br /> StarTropics
                  </p>
                  <img className="arrow-right" src={Images.arrow_down} />
                </div>
                <div className="section-item-2">
                  <div className="section-item">
                    <p
                      className="section-item-label"
                      style={{ textAlign: "left" }}
                    >
                      <img src={Images.whiteball} />
                      <span className="label-span-3">
                        {" "}
                        On the way
                      </span> <br /> Ghost ‘n Goblins
                    </p>
                    <img className="arrow-right" src={Images.arrow_up} />
                  </div>
                  <div className="inner-div-section">
                    <div>
                      <hr />
                    </div>
                    <div className="setting-item-details">
                      <div>Submission ID</div>
                      <div>3489734534</div>
                    </div>
                    <div className="setting-item-details">
                      <div>Mailing Date</div>
                      <div>12 May 2022</div>
                    </div>
                    <div className="setting-item-details">
                      <div>Track</div>
                      <a href="#">Track Link</a>
                    </div>

                    <div className="setting-item-details">
                      <div
                        className="section-input-button"
                        style={{ width: "100%", margin: '1vh 0px 1vh 0px' }}
                      >
                        <button className="set-btn-1" type="button" style={{background: "#ffffff45", border: 'none', color:'#ffffff'}}>
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}
