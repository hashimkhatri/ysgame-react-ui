import React, { useEffect, useState } from "react";
import { UseColor } from "../hooks/UseColor";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Images from "../constants/Images";

export const ColorSelector = ({ selectedColor = "", setSelectedColor }) => {
  const [refresh, setRefresh] = useState(0);
  const { color, loading, error } = UseColor(refresh);
  const settings = {
    wrapAround: true,
    slidesToShow: 6,
    speed: 500,
    rows: 2,
    dots: false,
    autoplay: false,
    nextArrow: <></>,
    prevArrow: <></>,
    swipeToSlide: true,
  };

  useEffect(() => {
    setRefresh((prev) => prev + 1);
  }, []);

  const handleSelectColor = (col) => {
    setSelectedColor(col);
  };


  if (loading) return <>Loading...</>;
  if (error) return <></>;

  if (color)
    return (
      <div style={{ height: "100%" }}>
        <Slider {...settings}>
          {color.map((col, index) => {
            return (
              <div key={index} onClick={() => handleSelectColor(col)}>
                <div
                  style={{
                    backgroundColor: col.color_code,
                    height: "5vh",
                    margin: "1vh",
                    borderRadius: "1.5vh",
                    justifyContent:"center",
                    alignItems:"center",
                    display: "flex",
                    border:
                      selectedColor?.id === col.id ? "0.5vh solid #012572" : "none",
                  }}
                >
                  {selectedColor?.id === col.id && (
                    <img src={Images.tick2} alt="check" />
                  )}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
};
