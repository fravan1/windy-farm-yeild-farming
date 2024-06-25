const { task } = require("hardhat/config");

task(
  "accounts",
  "Prints the accounts and there PVKs provided by current provider"
).setAction(async () => {
  const acc = await ethers.getSigners();

  console.log(acc[0]);
});
