import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
const { mine } = require("@nomicfoundation/hardhat-network-helpers");
import { expect } from "chai";
import hre from "hardhat";

const AMOUNT_TO_STAKE = 1000;
const LP_TOKEN_INITAL_SUPPLY = 1000;
const REWARD_PER_BLOCK_PERCENT = 10;

// const START_BLOCK = 10;

describe("Chef", function () {
  async function deployContracts() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Chef = await hre.ethers.getContractFactory("Chef");
    const Wind = await hre.ethers.getContractFactory("Wind");
    const LpToken = await hre.ethers.getContractFactory("LpToken");

    const lpToken_dai_ether = await LpToken.deploy(LP_TOKEN_INITAL_SUPPLY);
    const lpToken_usdt_ether = await LpToken.deploy(LP_TOKEN_INITAL_SUPPLY);
    const lpToken_dai_usdt = await LpToken.deploy(LP_TOKEN_INITAL_SUPPLY);

    const wind = await Wind.deploy();
    const chef = await Chef.deploy(1, await wind.getAddress());

    await wind.transferOwnership(await chef.getAddress());

    return {
      chef,
      owner,
      otherAccount,
      wind,
      lpToken_dai_ether,
      lpToken_usdt_ether,
      lpToken_dai_usdt,
    };
  }
  describe("Wind", function () {
    it("Should set the right owner", async function () {
      const { chef, wind } = await loadFixture(deployContracts);
      expect(await wind.owner()).to.equal(await chef.getAddress());
    });
  });

  describe("Chef", function () {
    it("Should revert with not enough allowance", async function () {
      const { chef, lpToken_dai_ether } = await loadFixture(deployContracts);

      // Adding lp token to chef
      await chef.add(await lpToken_dai_ether.getAddress(), 20, 10);

      // Approving less lp tokens
      await lpToken_dai_ether.approve(await chef.getAddress(), AMOUNT_TO_STAKE);

      // Transferrin more lp tokens causes revert
      await expect(chef.deposit(0, AMOUNT_TO_STAKE + 200)).to.be.revertedWith(
        "Not enough allowance"
      );
    });

    it("Should be right values upon depositing", async function () {
      const { owner, chef, lpToken_dai_ether } = await loadFixture(
        deployContracts
      );

      // Adding LP token to chef contract
      await chef.add(
        await lpToken_dai_ether.getAddress(),
        100000,
        REWARD_PER_BLOCK_PERCENT
      );
      // Approving the chef contract address in lp token by user to trasnfer tokens to the chef contract
      await lpToken_dai_ether.approve(await chef.getAddress(), AMOUNT_TO_STAKE);
      // Depositing
      await chef.deposit(0, AMOUNT_TO_STAKE);
      // Testing the values
      expect((await chef.userInfo(0, owner)).exists).to.be.equal(true);

      const _reward_per_block = await (
        await chef.userInfo(0, owner)
      ).reward_per_block;

      expect(_reward_per_block).to.be.equal(
        Math.floor((REWARD_PER_BLOCK_PERCENT / 100) * AMOUNT_TO_STAKE)
      );
    });

    it("Should be right wallet balance after withdrawl", async function () {
      const { wind, owner, chef, lpToken_dai_ether } = await loadFixture(
        deployContracts
      );

      // Adding LP token to chef contract
      await chef.add(
        await lpToken_dai_ether.getAddress(),
        100000,
        REWARD_PER_BLOCK_PERCENT
      );
      // Approving the chef contract address in lp token by user to trasnfer tokens to the chef contract
      await lpToken_dai_ether.approve(await chef.getAddress(), AMOUNT_TO_STAKE);
      // Depositing
      await chef.deposit(0, AMOUNT_TO_STAKE);
      // Withdrawl
      expect(
        await lpToken_dai_ether.balanceOf(await chef.getAddress())
      ).to.be.equal(AMOUNT_TO_STAKE);
      expect(
        await lpToken_dai_ether.balanceOf(await chef.getAddress())
      ).to.be.equal(AMOUNT_TO_STAKE);
      await chef.withdrawLpTokens(0);

      expect(await lpToken_dai_ether.balanceOf(owner)).to.be.equal(
        LP_TOKEN_INITAL_SUPPLY
      );
    });

    it("Should be right pending rewards and reward withdrawl amount", async function () {
      const { wind, owner, chef, lpToken_dai_ether } = await loadFixture(
        deployContracts
      );

      const _BLOCK_TO_MINE = 100;
      // Adding LP token to chef contract
      await chef.add(
        await lpToken_dai_ether.getAddress(),
        100000,
        REWARD_PER_BLOCK_PERCENT
      );
      // Approving the chef contract address in lp token by user to trasnfer tokens to the chef contract
      await lpToken_dai_ether.approve(await chef.getAddress(), AMOUNT_TO_STAKE);
      // Depositing
      await chef.deposit(0, AMOUNT_TO_STAKE);

      await mine(_BLOCK_TO_MINE);

      expect((await chef.userInfo(0, owner)).reward_per_block).to.be.equal(
        (REWARD_PER_BLOCK_PERCENT / 100) * AMOUNT_TO_STAKE
      );
      expect(await chef.pendingReward(owner)).to.be.equal(
        ((AMOUNT_TO_STAKE * REWARD_PER_BLOCK_PERCENT) / 100) *
          (_BLOCK_TO_MINE - 1)
      );
      expect(await wind.balanceOf(owner)).to.be.equal(0);
      await chef.withdrawReward();
      expect(await wind.balanceOf(owner)).to.be.equal(
        ((AMOUNT_TO_STAKE * REWARD_PER_BLOCK_PERCENT) / 100) * _BLOCK_TO_MINE
      );
    });
  });
});
