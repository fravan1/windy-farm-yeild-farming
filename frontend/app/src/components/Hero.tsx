import { eth_usdt_pair, house, dai_usdt_pair } from "../assets";

const Hero = () => {
  const pools = [
    {
      pair: "ETH/USDT",
      apy: 10,
      image: eth_usdt_pair,
    },
    {
      pair: "DAI/USDT",
      apy: 10,
      image: dai_usdt_pair,
    },
    {
      pair: "ETh/DAI",
      apy: 10,
      image: eth_usdt_pair,
    },
  ];
  return (
    <div className="relative  mt-40 flex  items-center justify-center w-full">
      <div className="w-full max-w-[1024px] ">
        {/* Slogan */}
        <div className="w-full flex flex-col gap-6 items-center mt-[100px] mb-[80px]">
          <h1 className="text-n-1 text-6xl w-full text-center font-black tracking-wider font-sans">
            Windy farm where Yeilds <br /> are farmed
          </h1>
          <div className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[3px] rounded-lg">
            <button className="px-6 py-3 rounded-lg bg-black font-code w-fit">
              Get Started
            </button>
          </div>
        </div>
        {/* Hero Image */}
        <div className="relative aspect-[1024/600] overflow-hidden">
          {/* <div className="absolute bottom-0 z-10 left-0 w-full h-9 bg-white"></div> */}
          <div className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] rounded-3xl">
            <div className="bg-black overflow-hidden p-3 rounded-3xl">
              <img
                className="w-full z-1 object-contain -translate-y-[30%]"
                src={house}
              />
            </div>
          </div>
        </div>
        {/* Available farms */}
        <div className="w-full mt-40">
          <h1 className="text-n-1 text-5xl w-full py-9 text-center font-black tracking-wider font-sans">
            Pools
          </h1>
          <div className="grid grid-cols-2 mt-9 gap-9">
            {pools.map((pool) => (
              <div className="w-full  min-w-[200px]  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] rounded-3xl">
                {/* Top heading */}
                <div className="rounded-3xl flex flex-col gap-9 p-9 bg-black">
                  <div className="flex items-center justify-between">
                    <h1 className="text-n-1 w-full text-2xl font-code tracking-wider">
                      {`${pool.pair} Pool`}
                    </h1>
                    <div className="w-[150px] ">
                      <img className="w-full" src={pool.image} />
                    </div>
                  </div>

                  <h1 className="text-n-1 text-2xl font-code tracking-wider">
                    APY : {pool.apy}%
                  </h1>
                  <h1 className="text-n-1 text-2xl font-code tracking-wider">
                    {pool.pair}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
