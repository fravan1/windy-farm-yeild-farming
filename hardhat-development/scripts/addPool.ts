import hre from "hardhat";

const CHEF_ADDRESS = "0x7a50C46311A941C1Bb6deD3D3dD4088Af3f80ad8";

async function main() {
  const lp_token: { target: string; transferOwnership: any } =
    await hre.ethers.deployContract("LpToken", [100000000000]);

  const chef = hre.ethers.getContractAt("Chef", CHEF_ADDRESS);
  (await chef).add(lp_token.target, 100000, 10);
  //0xc7f602302caf28340bfde77a24ac9d93a10db6ba
}

main();
