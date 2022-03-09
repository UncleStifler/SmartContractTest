const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Donations", function () {
  let acc1;
  let acc2;
  let donations;

  beforeEach(async function () {
    [acc1, acc2] = await ethers.getSigners();
    const Donations = await ethers.getContractFactory("Donations", acc1);
    donations = await Donations.deploy()
    await donations.deployed()

  })

  it("the address of the deployed contract is correct", async function() {
     expect(donations.address).to.be.properAddress
  })

  it("should have 0 ether by default", async function() {
    const balance = await donations.currentBalance()
    expect(balance).to.eq(0)
  })

  it("should be possible to send founds", async function() {
    const sum = 100
    const transaction = await donations.connect(acc2).donate({value: sum})

    await expect(() => transaction)
        .to.changeEtherBalances([acc2, donations], [-sum, sum])

    await transaction.wait()
  })
});
