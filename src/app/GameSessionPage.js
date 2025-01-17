import React, { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import GameLayout from "../components/GameLayout";
import { UseUserProfile } from "../hooks/UseUserProfile";
import { UseGameDetailFromSessionId } from "../hooks/UseGameDetailFromSessionId";

import Layout from "../components/Layout";

import "./styles/styles.css";
import "./styles/game_styles.css";

export default function GameSessionPage() {
  const { invitation_code } = useParams();
  const [userData, setUserData] = useState(null);
  const router = useNavigate();
  const { user, loading: userLoading, error: userError } = UseUserProfile(true);
  const {game, loading: gameLoading, error: gameError } = UseGameDetailFromSessionId(invitation_code);

  const [gameUrl, setGameUrl] = useState('');
  const [core, setCore] = useState('');
  const [gameName, setGameName] = useState('');
  const [bgColor, setBgColor] = useState('black');

  useEffect(() => {
    if (!userLoading) {
      if (userError != null) {
        // localStorage.removeItem("authResponse");
        // router("/");
      }
    }
    if (user) {
      setUserData(user);
    }
  }, [userError, userLoading, user]);

  useEffect(()=>{
    console.log(gameLoading);
    if (!gameLoading && game) {

      if(game?.data?.game?.core){
        setCore(game?.data?.game?.core)
      }
      if(game?.data?.game?.game?.original_url){
        setGameUrl(game?.data?.game?.game?.original_url);
      }
      if(game?.data?.game?.name){
        setGameName(game?.data?.game?.name);
      }
      if(game?.data?.background_color){
        setBgColor(game?.data?.background_color);
      }

    }
  },[game, gameLoading, gameError])

  return (
    <>
      <GameLayout
        withoutPrivate={true}
        showHeader={false}
        bgColor={true}
        bgClass="set-div-3-open-game-bg"
      >
        <div className="main-content-div">
        <iframe src={
          // "https://api.yester.games/public/emulator/?game_url=https://api.yester.games/storage/110/6772cf1864016_NBA.sfc&core=snes&game_name=NBA&bgcolor=black"
          "https://api.yester.games/public/emulator/?game_url="+gameUrl+"&core="+core+"&game_name="+gameName+"&bgcolor="+bgColor+""
          
          } className={"iframeClass"} />
        </div>
      </GameLayout>
    </>
  );
}
