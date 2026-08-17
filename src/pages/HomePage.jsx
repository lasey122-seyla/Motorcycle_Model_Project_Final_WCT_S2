import { Link } from "react-router-dom";
import posterImg from "../assets/poster.jpg";

function HomePage() {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#0b1329] text-white overflow-x-hidden -mt-4">
      {/* HERO BANNER SECTION */}
      <div
        className="w-full min-h-[calc(100vh-65px)] bg-cover bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(11, 19, 41, 0.95) 30%, rgba(11, 19, 41, 0.4) 65%, rgba(11, 19, 41, 0.1)), url(${posterImg})`,
        }}
      >
        {/* Content */}
        <div className="pl-[8%] pr-8 max-w-[650px] flex flex-col gap-3.5">
          <span className="text-blue-500 font-bold tracking-[1.5px] text-sm uppercase">
            SO DEMM
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-[3.2rem] font-black leading-[1.15] text-blue-600 m-0">
            WELCOME TO MODEL
            <br />
            MOTORCYCLE
            <br />
            <span className="text-green-500">IN MY WEBSITE</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Experience the raw power and racing heritage of our newest model.
            Built to dominate every track and trail.
          </p>
          <p className="text-[0.85rem] text-slate-400 italic">
            Professional rider on a closed course. Do not attempt.
          </p>

          <div className="mt-3">
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3.5 rounded-lg no-underline font-bold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
