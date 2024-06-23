import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
const { mine } = require("@nomicfoundation/hardhat-network-helpers");
import { expect } from "chai";
import hre from "hardhat";

const AMOUNT_TO_STAKE = 100;
const LP_TOKEN_INITAL_SUPPLY = 1000;
const REWARD_PER_BLOCK_PERCENT = 1;
const DECIMAL_PLACE_ROUND_OFF = 5 - 2;

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
    const chef = await Chef.deploy(1, await wind.getAddress(), owner);

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
      expect((await chef.userinfo(0, owner)).exists).to.be.equal(true);
      const _reward_per_block = await (
        await chef.userinfo(0, owner)
      ).reward_per_block;

      expect(
        Math.floor(Number(_reward_per_block) / 10 ** DECIMAL_PLACE_ROUND_OFF)
      ).to.be.equal(
        Math.floor((REWARD_PER_BLOCK_PERCENT / 100) * AMOUNT_TO_STAKE)
      );
    });

    it("Should be the right reward count", async function () {
      const { owner, chef, lpToken_dai_ether } = await loadFixture(
        deployContracts
      );

      // Adding LP token to chef contract
      await chef.add(
        await lpToken_dai_ether.getAddress(),
        20,
        REWARD_PER_BLOCK_PERCENT
      );

      // Approving the chef contract address in lp token by user to trasnfer tokens to the chef contract
      await lpToken_dai_ether.approve(await chef.getAddress(), AMOUNT_TO_STAKE);

      // Depositing
      await chef.deposit(0, AMOUNT_TO_STAKE);

      // Mining 100 blocks
      await mine(100);

      expect((await chef.userinfo(0, owner)).exists).to.be.equal(true);
    });
  });

  // it("Should set the right owner", async function () {
  //   const { lock, owner } = await loadFixture(deployOneYearLockFixture);

  //   expect(await lock.owner()).to.equal(owner.address);
  // });

  //     it("Should receive and store the funds to lock", async function () {
  //       const { lock, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       expect(await hre.ethers.provider.getBalance(lock.target)).to.equal(
  //         lockedAmount
  //       );
  //     });

  //     it("Should fail if the unlockTime is not in the future", async function () {
  //       // We don't use the fixture here because we want a different deployment
  //       const latestTime = await time.latest();
  //       const Lock = await hre.ethers.getContractFactory("Lock");
  // await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
  //   "Unlock time should be in the future"
  // );
  //     });
  //   });

  //   describe("Withdrawals", function () {
  //     describe("Validations", function () {
  //       it("Should revert with the right error if called too soon", async function () {
  //         const { lock } = await loadFixture(deployOneYearLockFixture);

  //         await expect(lock.withdraw()).to.be.revertedWith(
  //           "You can't withdraw yet"
  //         );
  //       });

  //       it("Should revert with the right error if called from another account", async function () {
  //         const { lock, unlockTime, otherAccount } = await loadFixture(
  //           deployOneYearLockFixture
  //         );

  //         // We can increase the time in Hardhat Network
  //         await time.increaseTo(unlockTime);

  //         // We use lock.connect() to send a transaction from another account
  //         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //           "You aren't the owner"
  //         );
  //       });

  //       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //         const { lock, unlockTime } = await loadFixture(
  //           deployOneYearLockFixture
  //         );

  //         // Transactions are sent using the first signer by default
  //         await time.increaseTo(unlockTime);

  //         await expect(lock.withdraw()).not.to.be.reverted;
  //       });
  //     });

  //     describe("Events", function () {
  //       it("Should emit an event on withdrawals", async function () {
  //         const { lock, unlockTime, lockedAmount } = await loadFixture(
  //           deployOneYearLockFixture
  //         );

  //         await time.increaseTo(unlockTime);

  //         await expect(lock.withdraw())
  //           .to.emit(lock, "Withdrawal")
  //           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //       });
  //     });

  //     describe("Transfers", function () {
  //       it("Should transfer the funds to the owner", async function () {
  //         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //           deployOneYearLockFixture
  //         );

  //         await time.increaseTo(unlockTime);

  //         await expect(lock.withdraw()).to.changeEtherBalances(
  //           [owner, lock],
  //           [lockedAmount, -lockedAmount]
  //         );
  //       });
  //     });
  //   });
});
