const Selecttab = ({
  activetab,
  setactivetab,
}: {
  activetab: string;
  setactivetab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full flex justify-center mt-40 mb-20">
      <div className="flex gap-9 items-center justify-between">
        <div
          className={
            activetab === "MYSTAKES"
              ? "bg-gradient-to-r text-n-1 from-indigo-500 via-purple-500 to-pink-500 p-[1px] rounded-2xl"
              : "text-n-3"
          }
        >
          <button
            onClick={() => setactivetab("MYSTAKES")}
            className=" font-code uppercase font-black tracking-wider bg-black px-3 py-2 rounded-2xl"
          >
            My stakes
          </button>
        </div>
        <div
          className={
            activetab === "POOL"
              ? "bg-gradient-to-r text-n-1 from-indigo-500 via-purple-500 to-pink-500 p-[1px] rounded-2xl"
              : "text-n-3"
          }
        >
          <button
            onClick={() => setactivetab("POOL")}
            className=" uppercase font-black font-code tracking-wider bg-black px-3 py-2 rounded-2xl"
          >
            AVAILABLE POOLS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Selecttab;
