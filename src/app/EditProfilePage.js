import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { UseUserProfile } from "../hooks/UseUserProfile";
import { UseCountry } from "../hooks/UseCountry";
import { useLoader } from "../utils/LoaderManager";
import toast from "react-hot-toast";
import { postData } from "../utils/ApiUtils";

import "./styles/styles.css";

export default function EditProfilePage() {
  const router = useNavigate();
  const { user, loading, error } = UseUserProfile(true);
  const {
    country
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
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
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
        toast.success("Profile updated successfully", { position: "top-center", duration: 3000 });
      } catch (error) {
        hideLoader();
        toast.error("Error: " + error.message, { position: "top-center", duration: 3000 });
      }
}



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
              <h3 className="page-name">Edit user information</h3>
              <div className="setting-scroll-div">
                <div className="section-input">
                  <p className="section-input-label">User Name</p>
                  <input
                    className="section-input-item"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className="section-input">
                  <p className="section-input-label">Email</p>
                  <input
                    className="section-input-item"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>

                <div className="section-input">
                  <p className="section-input-label">Bio</p>
                  <input
                    className="section-input-item"
                    value={userBio}
                    onChange={(e) => setUserBio(e.target.value)}
                  />
                </div>

                <div className="section-input">
                  <p className="section-input-label">Nick Name</p>
                  <input
                    className="section-input-item"
                    value={userNickName}
                    onChange={(e) => setUserNickName(e.target.value)}
                  />
                </div>

                <div className="section-input">
                  <p className="section-input-label">Phone</p>
                  <input
                    className="section-input-item"
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                  />
                </div>

                <div className="section-input">
                  <p className="section-input-label">Country</p>
                  <select
                    className="section-input-item"
                    value={userCountry}
                    onChange={(e) => setUserCountry(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {country &&
                      country.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="section-input">
                  <p className="section-input-label">Date of Birth</p>
                  <input
                    className="section-input-item"
                    type="date"
                    value={formatDate(userDateOfBirth)}
                    onChange={(e) => setUserDateOfBirth(e.target.value)}
                  />
                </div>

                <div className="section-input-button">
                  <button
                    className="set-btn-1"
                    type="button"
                    onClick={updateProfile}
                  >Submit</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}
