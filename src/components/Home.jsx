import homePageImg from "../assets/images/kaneo.jpg";
const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "url(" + homePageImg + ")",
        backgroundSize: "cover",
        height: "calc(100vh - 64px)",
      }}
    >
      <div
        className="w-full h-full"
        style={{ background: "rgba(0,0,0,0.6)" }}
      >
        <div className="flex flex-column">
            <h1 className="text-slate-50 text-6xl font-family:haboro-nor-lite flex justify-center">Macedonia Heritage Trail</h1>
            <p></p>
        </div>
      </div>
    </div>
  );
};
export default Home;
