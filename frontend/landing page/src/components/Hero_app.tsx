import { windy_logo } from "../assets";

const Hero = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-40">
      <div className="w-full h-full max-w-[300px]  ">
        <img className="" src={windy_logo} />
      </div>
      <div className="flex gap-9">
        <div className="w-full  min-w-[700px]  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] rounded-3xl">
          {/* Top heading */}
          <div className="rounded-3xl flex flex-col items-center p-9 bg-black">
            <div className="w-full h-full rounded-full max-w-[100px]  ">
              <img className="" src={windy_logo} />
            </div>
            <div className=" items-center flex flex-col gap-1 justify-between">
              <h1 className="text-n-1 w-full text-4xl text-center font-code tracking-wider">
                1,100,1000
              </h1>
              <h1 className="text-n-1 w-full text-xl text-center font-code tracking-wider">
                $WIND earned
              </h1>
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[3px] mt-6 rounded-lg">
                <button className="rounded-lg flex flex-col font-code tracking-wider items-center p-3 px-6 bg-black">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
