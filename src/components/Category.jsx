import React from "react";
import homePageImg from "../assets/images/endzero.png";

const Category = () => {
  return (
    <div
      style={{
        backgroundImage: "url(" + homePageImg + ")",
        backgroundSize: "cover",
        height: "calc(100vh - 64px)",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="w-full h-full"
        style={{ background: "rgba(113,63,18,0.6)" }}
      ></div>
    </div>
  );
};
export default Category;
