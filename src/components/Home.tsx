// import React from 'react';
import homePageImg from "../assets/images/kaneo.jpg";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const navigateMap = () => {
    navigate('/map');
  }
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
      <div className="w-full h-full" style={{ background: "rgba(0,0,0,0.6)" }}>
        <div className="flex flex-col items-center justify-center space-y-24">
          <h1
            className="mt-16 text-slate-50 text-9xl flex items-center justify-center flex flex-col"
            style={{ fontFamily: "Roboto", fontWeight: "400" }}
          >
            <span className="">Macedonia </span>
            <span className="">Heritage Trail</span>
          </h1>
          <p
            className="text-slate-50 text-2xl"
            style={{ fontFamily: "Roboto", fontWeight: "500" }}
          >
            Со еден клик до сите културно-историски знаменитости на Македонија!
          </p>
          <button
            style={{
              backgroundColor: "white",
              width: "fit-content",
              height: "fit-content",
              borderRadius: "4px",
              marginTop: "24px",
              padding: "10px",
              fontSize: "clamp(16px, 20px, 30px)",
            }}
            className="text-yellow-700"
            onClick={navigateMap}
          >
            Дознај повеќе
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
