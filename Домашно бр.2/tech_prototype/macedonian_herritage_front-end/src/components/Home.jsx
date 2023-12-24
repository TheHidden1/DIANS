import React from 'react';
import { useNavigate } from "react-router-dom";
import homePageImg from "../assets/images/kaneo.jpg";
import { useLocation } from 'react-router-dom';

const Home = () => {

    const location = useLocation();
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = location + '/about'; 
    navigate(path);
  }

  return (
    <div
      style={{
        backgroundImage: "url(" + homePageImg + ")",
        backgroundSize: "cover",
        height: "calc(100vh - 64px)",
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
              width: "13vw",
              height: "6.5vh",
              borderRadius: "4px",
              marginTop: "24px",
            }}
            className="text-yellow-700 text-2xl " 
            onClick={routeChange}
          >
            Дознај повеќе
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;