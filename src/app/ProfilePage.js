import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { UseUserProfile } from "../hooks/UseUserProfile";
import { useLoader } from "../utils/LoaderManager";
import { fetchData } from "../utils/ApiUtils";

import "./styles/styles.css";

export default function ProfilePage() {
  const router = useNavigate();
  const { user, loading, error } = UseUserProfile(true);
  const { showLoader, hideLoader } = useLoader();
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (!loading) {
      if (error != null) {
        localStorage.removeItem("authResponse");
        router("/");
      }
    }
  }, [error, loading, user]);
  useEffect(() => {
    const getGames = async () => {
      showLoader();
      try {
        const response = await fetchData("games", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.data) {
          setGames(response.data);
        } else {
          setGames([]);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setGames([]);
      } finally {
        hideLoader();
      }
    };
    getGames();
  }, []);
  return (
    <Layout
      showBack={true}
      setBack={() => {
        router("/lobby");
      }}
      showLeft={!!user}
      showRight={!!user}
      bgColor={true}
      zeroOpacity={false}
      bgClass="set-div-3-bg"
      rightAction={() => {
        router("/setting");
      }}
    >
      {loading ? null : (
        <>
          {user && (
            <div className="setting-div">
              <div className="profile-div">
                <img
                  className="profile-img"
                  src={user.avatar.url}
                  alt="profile"
                />
                <div className="profile-name">{user.name}</div>
                <div className="profile-email">{user.email}</div>
              </div>
              <h3 className="page-name">Game library</h3>
              <div className="setting-scroll-div">
                <div className="set-games-div setting-game-div">
                  <div className="game-list">
                    <div className="game-boxes">
                      {games.map((game, index) => (
                        <img
                          className={"game-box"}
                          key={index}
                          src={game.thumbnail.url}
                        />
                      ))}
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
