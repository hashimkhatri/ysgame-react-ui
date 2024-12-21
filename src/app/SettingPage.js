import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { UseUserProfile } from "../hooks/UseUserProfile";
import { useLoader } from "../utils/LoaderManager";
import GameAttach from "../components/GameAttach";
import GameInvite from "../components/GameInvite";
import Images from "../constants/Images";

import "./styles/styles.css";

export default function SettingPage() {
  const router = useNavigate();
  const { user, loading, error } = UseUserProfile(true);
  const { showLoader, hideLoader } = useLoader();
  useEffect(() => {
    if (!loading) {
      if (error != null) {
        localStorage.removeItem("authResponse");
        router("/");
      }
    }
  }, [error, loading, user]);

  return (
    <Layout
      showBack={true}
      setBack={() => {
        router("/profile"); 
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
            <h3 className="page-name">Settings</h3>
            <div className="setting-scroll-div">
              <p className="section-label">Account</p>
              <div className="section-item"
                onClick={() => {
                  router("/edit-profile");
                }}
              >
                <p className="section-item-label">Edit User Information</p>
                <img className="arrow-right" src={Images.arrow_right} />
              </div>

              <div className="section-item"
                onClick={() => {
                  router("/profile/setup");
                }}
              >
                <p className="section-item-label">Edit User Avatar</p>
                <img className="arrow-right" src={Images.arrow_right} />
              </div>


              <div className="section-item"
                onClick={() => {
                  router("/payment");
                }}
              >
                <p className="section-item-label">Payment</p>
                <img className="arrow-right" src={Images.arrow_right} />
              </div>
              <div className="section-item"
              onClick={() => {
                router("/submit-game");
              }}
              >
                <p className="section-item-label">Submit Game</p>
                <img className="arrow-right" src={Images.arrow_right} />
              </div>
              <div className="section-item" 
              onClick={() => {
                router("/game-submission-status");
              }}
              >
                <p className="section-item-label">Game Submission Status</p>
                <img className="arrow-right" src={Images.arrow_right} />
              </div>




              <p className="section-label">Other</p>
              <div className="section-item" onClick={() => {
                router("/news");
              }}>
                <p className="section-item-label">News</p>
                <img className="arrow-right" src={Images.arrow_right} />
              </div>
              <div className="section-item" onClick={() => {
                router("/feedback");
              }}>
                <p className="section-item-label">Feedback</p>
                <img className="arrow-right" src={Images.arrow_right} />
              </div>


              <p className="section-label">About 1UP.games</p>
              <div className="section-item" onClick={() => {
                router("/terms-and-conditions");
              }}>
                <p className="section-item-label">Terms & Conditions</p>
                <img className="arrow-right" src={Images.arrow_right} />
              </div>
              <div className="section-item" onClick={() => {
                router("/privacy-policy");
              }}>
                <p className="section-item-label">Privacy Policy</p>
                <img className="arrow-right" src={Images.arrow_right} />
              </div>
              
              
            </div>
          </div>
          )}
        </>
      )}
    </Layout>
  );
}
