import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero_app";
import MyStakes from "./components/MyStakes";
import Selecttab from "./components/Selecttab";
import Pools from "./components/Pools";

const App = () => {
  const [activetab, setactivetab] = useState("POOL");
  return (
    <div className="w-full h-full">
      <Header />
      <Hero />
      <Selecttab activetab={activetab} setactivetab={setactivetab} />
      {activetab === "MYSTAKES" && <MyStakes />}
      {activetab === "POOL" && <Pools />}
    </div>
  );
};

export default App;
