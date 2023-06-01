const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Mantlemancer", function () {
  let mantlemancerContract;

  before(async function () {
    const Mantlemancer = await ethers.getContractFactory("Mantlemancer");
    mantlemancerContract = await Mantlemancer.deploy();
    await mantlemancerContract.deployed();
  });

  it("should generate 6 numbers within the specified range", async function () {
    const input = [[2], [3], [10, 20], [90]];
    const result = await mantlemancerContract.generateNumbers(input);

    // Assert the length of the result array is 6
    expect(result.length).to.equal(6);

    // Assert that all numbers in the result array are within the specified range
    for (let i = 0; i < result.length; i++) {
      expect(result[i]).to.be.gte(10).and.to.be.lte(20);
    }
  });

  it("should generate an array of random numbers within the specified range", async function () {
    const sets = 3;
    const combos = 4;
    const min = 1;
    const max = 100;
    const s = 123;

    const numbers = await mantlemancerContract.generateNumbers(sets, combos, min, max, s);

    // Check the length of the returned array
    expect(numbers.length).to.equal(sets * combos);

    // Check that all numbers are within the specified range
    for (let i = 0; i < numbers.length; i++) {
      expect(numbers[i]).to.be.within(min, max);
    }
  });

  it.only("should calculate the drops correctly", async function () {
    const itemNamesLength = 4;
    const itemOdds = [0, 0, 100, 100];
    const howManyItems = 2;

    const winners = await mantlemancerContract.calculateDrops(itemNamesLength, itemOdds, howManyItems);

    console.log(winners)
    expect(winners.length).to.equal(howManyItems);
    for (let i = 0; i < winners.length; i++) {
      expect(winners[i]).to.be.within(0, itemOdds.length - 1);
    }
  });
});