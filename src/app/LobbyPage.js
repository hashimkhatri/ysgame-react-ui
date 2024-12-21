import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { UseUserProfile } from "../hooks/UseUserProfile";
import { useLoader } from "../utils/LoaderManager";
import GameAttach from "../components/GameAttach";
import GameInvite from "../components/GameInvite";
import Images from "../constants/Images";

import "./styles/styles.css";

export default function LobbyPage() {
  const router = useNavigate();
  const [invitationCode, setInvitationCode] = useState(
    sessionStorage.getItem("invitation_code")
  );
  const [showGameAttach, setShowGameAttach] = useState(false);
  const [showGameInvite, setShowGameInvite] = useState(false);

  const [selectedGame, setSelectedGame] = useState(null);
  const { user, loading, error } = UseUserProfile(true);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    selectedGame
      ? localStorage.setItem("selectedGame", JSON.stringify(selectedGame))
      : localStorage.removeItem("selectedGame");
  }, [selectedGame]);

  useEffect(() => {
    if (!loading) {
      if (error != null) {
        localStorage.removeItem("authResponse");
        router("/");
      }
      if(invitationCode) {
        router("/guest-view");
      }
    }
  }, [error, loading, user]);

  const gameAttach = () => {
    setShowGameAttach(!showGameAttach);
  };
  const gameInvite = () => {
    setShowGameInvite(!showGameInvite);
  };

  return (
    <Layout
      showBack={showGameAttach}
      setBack={gameAttach}
      showLeft={!!user}
      showRight={!!user}
      rightAction={()=>router("/profile")}
    >
      {loading ? null : (
        <>
          {!user
            ? !invitationCode && (
                <div className="main-content-div">
                  <div className="set-error-div">
                    <h5 className="left-heading">Welcome</h5>
                    <p>
                      Your email is not recognized, please wait until you are
                      invited to a game by a friend.
                    </p>
                  </div>
                </div>
              )
            : !showGameAttach && (
                <div className="main-content-div">
                  <div className="set-user-div">
                    <div className="left-sec">
                      <img
                        className="picture"
                        src={
                          user.avatar.url || Images.default_avatar
                        }
                      />
                      <h6 className="txt">{user?.name}</h6>
                    </div>
                    <div className="right-sec">
                      <img src={Images.notification} />
                    </div>
                  </div>
                  <div className="set-text-div">
                    <h5 className="left-heading">Create game session</h5>
                  </div>

                  <div className="set-game-attach-div">
                    <div className="action-img-div">
                      {selectedGame ? (
                        <div className="selected-circle">
                          <img
                            src={selectedGame.thumbnail.url}
                            className="selected-image"
                          />
                          <span className="heading">{selectedGame.name}</span>
                          <span className="sub-heading">4 players</span>
                        </div>
                      ) : (
                        <img
                          className="attach-img"
                          src={Images.insert_btn}
                          onClick={gameAttach}
                        />
                      )}
                    </div>
                    <div className="action-button-div">
                      {selectedGame ? (
                        <>
                          <button className="set-btn-1" onClick={gameInvite}>
                            <img src={Images.add_friend_icon} />{" "}
                            Invite friends
                          </button>
                          <button className="set-btn-2" onClick={gameAttach}>
                            Back to game library
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="set-btn-1" onClick={gameAttach}>
                            <img src={Images.folder_plus} /> Attach
                            game
                          </button>
                          {user.user_game_sessions.length > 0 && (
                            <button className="set-btn-2">
                              View previous sessions
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
          {showGameAttach && (
            <GameAttach
              gameAttach={gameAttach}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
            />
          )}
          {showGameInvite && (
            <GameInvite
              user={user}
              gameInvite={gameInvite}
              selectedGame={selectedGame}
              setSelectedGame={setSelectedGame}
            />
          )}
        </>
      )}
    </Layout>
  );
}
