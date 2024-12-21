import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import GameLayout from "../components/GameLayout";
import { UseUserProfile } from "../hooks/UseUserProfile";
import { UseGameDetailFromSessionId } from "../hooks/UseGameDetailFromSessionId";
import useDetectDevice from "../hooks/UseDetectDevice";

import "./styles/styles.css";
import "./styles/game_styles.css";

export default function GameSessionPage() {
  const { invitation_code } = useParams();
  const [userData, setUserData] = useState(null);
  const {device, orientation} = useDetectDevice();
  const router = useNavigate();
  const { user, loading: userLoading, error: userError } = UseUserProfile(true);
  const {game, loading: gameLoading, error: gameError } = UseGameDetailFromSessionId(invitation_code);

  const [gameUrl, setGameUrl] = useState('');
  const [core, setCore] = useState();
  const gameContainerRef = useRef(null);

  useEffect(() => {
    if (gameUrl != '' && gameContainerRef.current) {
      const existingScript = document.querySelector('script[src="/emulator/loader.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      window.EJS_player = gameContainerRef.current;
      window.EJS_gameUrl = gameUrl;
      window.EJS_core = core;
      window.EJS_multitap = true;
      const script = document.createElement("script");
      script.src = "/emulator/loader.js";
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
    
    return () => {
      const existingScript = document.querySelector('script[src="/emulator/loader.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [gameUrl]);

  useEffect(() => {
    if (!userLoading) {
      if (userError != null) {
        localStorage.removeItem("authResponse");
        router("/");
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
    }
  },[game, gameLoading, gameError])

  return (
    <>
      <GameLayout
        showHeader={false}
        bgColor={true}
        bgClass="set-div-3-open-game-bg"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <div style={{ background: "yellow", height: "100%", width: "20%" }}>
            <p>{device}</p>
          </div>
          <div
            style={{
              height: "100%", width: "60%", display: "flex", justifyContent:"center", alignItems:"center"
            }}
          >
            <div ref={gameContainerRef} id="game" style={{width:"100%", height:"100%"}}></div>
          </div>

          <div style={{ background: "orange", height: "100%", width: "20%" }}>
            zxczxc
          </div>
        </div>
      </GameLayout>
    </>
  );
}
