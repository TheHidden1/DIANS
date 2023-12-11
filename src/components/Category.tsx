import homePageImg from "../assets/images/endzero.jpg";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Category = () => {
  // const [location, setLocation] = useState("")
  // const [error, setError] = useState("")
  // function find
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
        <div className="w-full h-full" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="flex flex-col items-center justify-center space-y-24">
            <h2 className="text-xl text-white">Пребарај по категорија</h2>
            
            <div className="flex flex-row items-center justify-center space-x-12">
              <div className="flex flex-row h-[64px] rounded-full border border-solid items-center p-3">
                <MagnifyingGlassIcon className="w-[48px] h-[48px] text-white inline-block"/>
                <input className="w-[256px] h-full text-l text-white bg-transparent inline-block border-transparent focus:border-transparent focus:ring-0" placeholder="| Локација"/>
              </div>
            </div>

            {/* Test za delenje vo 2 koloni */}
            <div className="flex flex-row items-center justify-center space-x-12">
              <p
                className="text-slate-50 text-2xl"
                style={{ fontFamily: "Roboto", fontWeight: "500" }}
              >
                Со еден клик до сите културно-историски
              </p>
              <p
                className="text-slate-50 text-2xl"
                style={{ fontFamily: "Roboto", fontWeight: "500" }}>
                знаменитости на Македонија!
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;
