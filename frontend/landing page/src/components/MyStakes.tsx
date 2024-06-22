import { eth_usdt_pair, dai_usdt_pair } from "../assets";

const MyStakes = () => {
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
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 gap-9 w-full max-w-[900px]">
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
  );
};

export default MyStakes;
