import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchData, postData, updateData, deleteData } from "../utils/ApiUtils";
import { useLoader } from "../utils/LoaderManager";
import "../app/styles/styles.css";
import Images from "../constants/Images";

export default function GameAttach({ gameAttach, selectedGame, setSelectedGame }) {
  const [games, setGames] = useState([]);
  const { showLoader, hideLoader } = useLoader();
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
      } finally{
        hideLoader()
      }
    };
    getGames();
  }, []);

const gameSelect = (game) =>{
    if(selectedGame?.id === game.id){
        setSelectedGame(null)
    }else{
        setSelectedGame(game)
    }
}


  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: "0" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.5 }}
      className="main-content-div"
    >
      <>
        <div className="set-text-div">
          <h5 className="left-heading attach-game-heading">Attach game</h5>
        </div>

        <div className="set-games-div">
          <div className="game-list">
              <div className="game-boxes">
                {games.map((game, index) => (
                    <img 
                    
                    className={(selectedGame?.id === game.id ? "game-box game-selected" : "game-box")} 

                    key={index} src={game.thumbnail.url} onClick={()=>gameSelect(game)}/>
                ))}
            </div>
          </div>
          <div className="action-button-div">
            <button 
            
            className={(selectedGame == null ? "set-btn-1  btn-disable": "set-btn-1")} 
            onClick={gameAttach}>
              <img src={Images.tick} /> Continue
            </button>
          </div>
        </div>
      </>
    </motion.div>
  );
}
