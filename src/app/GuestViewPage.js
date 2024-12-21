import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { UseInvitedGame } from "../hooks/UseInvitedGame";
import { useLoader } from "../utils/LoaderManager";
import { AvatarCarousel } from "../components/AvatarCarousel";
import { ColorSelector } from "../components/ColorSelector";
import { postData } from "../utils/ApiUtils";
import toast, { Toaster } from "react-hot-toast";

import "./styles/styles.css";
import Images from "../constants/Images";

export default function GuestViewPage() {
  const router = useNavigate();
  const [invitationCode, setInvitationCode] = useState(sessionStorage.getItem("invitation_code"));
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [nickname, setNickname] = useState("");
  const { game } = UseInvitedGame(true);
  const { showLoader, hideLoader } = useLoader();


  const checkAlreadyInGame = async () => {
    if (!invitationCode) {
      router("/");
    }
  };

  useEffect(() => {
    checkAlreadyInGame();
  }, [invitationCode]);

  const submitDetails = async () => {
    if (!invitationCode || !nickname || !selectedAvatar || !selectedColor) return;

    showLoader();
    const data = {
      invitation_code: invitationCode,
      avatar_id: selectedAvatar.avatar.id,
      color_id: selectedColor.id,
      nickname
    };

    try {
      const response = await postData("session-members/add-guest", data);
      hideLoader();
      switch (response.message) {
        case "in_game":
          router(`/game-session/${invitationCode}`);
          break;
        case "blocked":
          toast.error("Error: You have been blocked by the host.", { position: "top-center", duration: 3000 });
          sessionStorage.removeItem("invitation_code");
          router("/");
          break;
        case "invalid":
          toast.error("Error: Invalid invitation.", { position: "top-center", duration: 3000 });
          sessionStorage.removeItem("invitation_code");
          router("/");
          break;
        default:
          sessionStorage.removeItem("invitation_code");
          router("/");
          break;
      }
    } catch (error) {
      hideLoader();
      toast.error("Error: " + error.message, { position: "top-center", duration: 3000 });
    }
  };

  return (
    <Layout bgColor showBack={false} showLeft={false} showRight={false} withoutPrivate={true}>
      <Toaster />
      <div className="main-content-div">
          <div className="set-guest-div">
            <div className="guest-game">
              <img src={Images.game} alt="logo" className="game-logo" />
              <h6 className="txt">{game?.game?.name}</h6>
            </div>
          </div>

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
                className={`set-btn-1 ${invitationCode && nickname && selectedAvatar && selectedColor ? "" : "disabled"}`}
                onClick={submitDetails}
              >
                <img src={Images.play} style={{ width: "2vh" }} alt="play" /> I’m Ready
              </button>
            </div>
          </div>
        </div>
    </Layout>
  );
}



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "../components/Layout";
// import { UseUserProfile } from "../hooks/UseUserProfile";
// import { UseInvitedGame } from "../hooks/UseInvitedGame";
// import { useLoader } from "../utils/LoaderManager";
// import { AvatarCarousel } from "../components/AvatarCarousel";
// import { ColorSelector } from "../components/ColorSelector";
// import { postData } from "../utils/ApiUtils";
// import toast, { Toaster } from "react-hot-toast";

// import "./styles/styles.css";
// import Images from "../constants/Images";

// export default function GuestViewPage() {
//   const router = useNavigate();
//   const [invitationCode, setInvitationCode] = useState(sessionStorage.getItem("invitation_code"));
//   const [selectedAvatar, setSelectedAvatar] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [nickname, setNickname] = useState("");

//   const { user, loading, error } = UseUserProfile(true);
//   const { game } = UseInvitedGame(true);
//   const { showLoader, hideLoader } = useLoader();

//   useEffect(() => {
//     if (!loading && error) {
//       localStorage.removeItem("authResponse");
//       router("/");
//     }
//   }, [loading, error]);

//   const checkAlreadyInGame = async () => {
//     if (!invitationCode) return;
//     showLoader();
//     try {
//       const response = await postData("session-members/check-already-in-session", { invitation_code: invitationCode });
//       hideLoader();
//       switch (response.message) {
//         case "in_game":
//           router(`/game-session/${invitationCode}`);
//           break;
//         case "blocked":
//           toast.error("Error: You have been blocked by the host.", { position: "top-center", duration: 3000 });
//           sessionStorage.removeItem("invitation_code");
//           router("/");
//           break;
//         case "invalid":
//           toast.error("Error: Invalid invitation.", { position: "top-center", duration: 3000 });
//           sessionStorage.removeItem("invitation_code");
//           router("/");
//           break;
//         default:
//           break;
//       }
//     } catch (error) {
//       hideLoader();
//       toast.error("Error: " + error.message, { position: "top-center", duration: 3000 });
//     }
//   };

//   useEffect(() => {
//     checkAlreadyInGame();
//   }, [invitationCode]);

//   const submitDetails = async () => {
//     if (!invitationCode || !nickname || !selectedAvatar || !selectedColor) return;

//     showLoader();
//     const data = {
//       invitation_code: invitationCode,
//       avatar_id: selectedAvatar.avatar.id,
//       color_id: selectedColor.id,
//       nickname
//     };

//     try {
//       const response = await postData("session-members/add-guest", data);
//       hideLoader();
//       switch (response.message) {
//         case "in_game":
//           router(`/game-session/${invitationCode}`);
//           break;
//         case "blocked":
//           toast.error("Error: You have been blocked by the host.", { position: "top-center", duration: 3000 });
//           sessionStorage.removeItem("invitation_code");
//           router("/");
//           break;
//         case "invalid":
//           toast.error("Error: Invalid invitation.", { position: "top-center", duration: 3000 });
//           sessionStorage.removeItem("invitation_code");
//           router("/");
//           break;
//         default:
//           sessionStorage.removeItem("invitation_code");
//           router("/");
//           break;
//       }
//     } catch (error) {
//       hideLoader();
//       toast.error("Error: " + error.message, { position: "top-center", duration: 3000 });
//     }
//   };

//   return (
//     <Layout bgColor showBack={false} showLeft={false} showRight={false}>
//       <Toaster />
//       {!loading && (
//         <div className="main-content-div">
//           <div className="set-guest-div">
//             <div className="guest-game">
//               <img src={Images.game} alt="logo" className="game-logo" />
//               <h6 className="txt">{game?.game?.name}</h6>
//             </div>
//           </div>

//           <div className="set-guest-game-div">
//             <h4 className="heading">Choose avatar & nickname</h4>
//             <div className="avatar">
//               <AvatarCarousel selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} selectedColor={selectedColor} />
//             </div>
//             <h4 className="heading">Background color</h4>
//             <div className="colors">
//               <ColorSelector setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
//             </div>
//             <div className="names">
//               <input
//                 className="nickname"
//                 type="text"
//                 placeholder="nickname"
//                 minLength={2}
//                 maxLength={15}
//                 value={nickname}
//                 onChange={(e) => setNickname(e.target.value)}
//               />
//             </div>
//             <div className="ready">
//               <button
//                 className={`set-btn-1 ${invitationCode && nickname && selectedAvatar && selectedColor ? "" : "disabled"}`}
//                 onClick={submitDetails}
//               >
//                 <img src={Images.play} style={{ width: "2vh" }} alt="play" /> I’m Ready
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// }
