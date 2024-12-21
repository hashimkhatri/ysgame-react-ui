import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { UseUserProfile } from "../hooks/UseUserProfile";
import { useLoader } from "../utils/LoaderManager";
import { AvatarCarousel } from "../components/AvatarCarousel";
import { ColorSelector } from "../components/ColorSelector";
import { postData } from "../utils/ApiUtils";
import toast, { Toaster } from "react-hot-toast";

import "./styles/styles.css";
import Images from "../constants/Images";

export default function ProfileSetupPage() {
  const router = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [nickname, setNickname] = useState("");

  const { user, loading, error } = UseUserProfile(true);
  const { showLoader, hideLoader } = useLoader();

  
  useEffect(() => {
    if (!loading) {
      if (error != null) {
        localStorage.removeItem("authResponse");
        router("/");
      }
    }
    setNickname(user?.name);
  }, [error, loading, user]);

  const submitDetails = async () => {
    if (!nickname || !selectedAvatar || !selectedColor) return;

    showLoader();
    const data = {
      avatar_id: selectedAvatar.avatar.id,
      color_id: selectedColor.id,
      nickname
    };
    try {
      const response = await postData("update-image", data);
      hideLoader();
      toast.success("Profile updated successfully", { position: "top-center", duration: 3000 });
      router("/setting");

    } catch (error) {
      hideLoader();
      toast.error("Error: " + error.message, { position: "top-center", duration: 3000 });
    }
  };

  return (
    <Layout bgColor showBack={false} showLeft={false} showRight={false}>
      <Toaster />
      {!loading && (
        <div className="main-content-div">
          

          <div className="set-guest-game-div">
            <h4 className="heading">Choose avatar & nickname</h4>
            <div className="avatar">
              <AvatarCarousel selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} selectedColor={selectedColor} />
            </div>
            <h4 className="heading">Background color</h4>
            <div className="colors">
              <ColorSelector setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
            </div>
            <div className="names">
              <input
                className="nickname"
                type="text"
                placeholder="nickname"
                minLength={2}
                maxLength={15}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="ready">
              <button
                className={`set-btn-1 ${nickname && selectedAvatar && selectedColor ? "" : "disabled"}`}
                onClick={submitDetails}
              >
                <img src={Images.play} style={{ width: "2vh" }} alt="play" /> I’m Ready
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
