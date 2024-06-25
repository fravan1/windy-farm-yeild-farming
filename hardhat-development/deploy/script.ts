import hre from "hardhat";

const main = async () => {
  const wind: { target: string; transferOwnership: any } =
    await hre.ethers.deployContract("Wind");
  console.log(`Wind deployed at ${wind.target}`);
  const chef: { target: string } = await hre.ethers.deployContract("Chef", [
    1,
    wind.target,
  ]);
  console.log(`Chef deployed at ${chef.target}`);
  wind.transferOwnership(wind.target);
};

main();
