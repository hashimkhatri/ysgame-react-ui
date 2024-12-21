import React, { useEffect, useState } from 'react';
import { UseAvatar } from "../hooks/UseAvatar";
import Slider from "./Slider";
import "../app/styles/flickity.css";

export const AvatarCarousel = ({selectedAvatar, setSelectedAvatar, selectedColor}) => {
  const [refresh, setRefresh] = useState(0);
  const [colorCode, setColorCode] = useState(null);
  const { avatar, loading, error } = UseAvatar(refresh);

  useEffect(() => {
    setRefresh((prev) => prev + 1);
  }, []); 

  useEffect(() => {
    setColorCode(selectedColor?.color_code)
  }, [selectedColor]); 
  
  if (loading) return <>Loading...</>;
  if (error) return <></>;
  
  if (avatar)
    return (
      <div style={{ height: "100%" }}>
        <Slider
          options={{
            autoPlay: false,
            wrapAround: true,
            pageDots: false,
            prevNextButtons: false,
          }}
          defaultActiveIndex={selectedAvatar?.index?selectedAvatar.index: 0}
          style={{ height: "100%" }}
          onSelect={(e) => setSelectedAvatar({index: e, avatar:avatar[e]})}
        >
          {avatar.map((ava, index) => (
            <div
              key={index}
              style={{
                height: "100%",
                width: "45%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: (colorCode && selectedAvatar?.index === index) ? colorCode : "#ec6c0d00",
                borderRadius: (colorCode && selectedAvatar?.index === index) ? "5vh" : "",
              }}
            >
              <img
                src={ava.avatar.url}
                key={ava.id}
                style={{ height: "100%", objectFit: "contain" }}
                
              />
            </div>
          ))}
        </Slider>
      </div>
    );
};
