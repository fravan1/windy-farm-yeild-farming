import hre from "hardhat";

const main = async () => {
  const wind: { target: string } = await hre.ethers.deployContract("Wind");
  console.log(wind.target);
};

main();
