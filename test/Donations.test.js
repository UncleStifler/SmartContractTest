const { expect, assert } = require("chai");
const { ethers } = require("hardhat");


describe("Funding", function() {
  const ETHERS = 10**18;
  const numOfDonates = 2;

  const deployContract = async () => {
    const Donations = await ethers.getContractFactory("Donations");
    const donations = await Donations.deploy();

    return donations.deployed();
  }

  const getContractBalance = async (currentContract) => {
    return web3.eth.getBalance(currentContract.address);
  }

  it("deploy contract", async () => {
    contract = await deployContract();
  });

  it("donations from different accounts", async () => {
    signers = await ethers.getSigners();

    let initialBalance = await getContractBalance(contract);
    expect(initialBalance).to.be.eq('0');

    let expectedBalance = 0;
    for (let i = 1; i <= numOfDonates; i++) {
      await contract.connect(signers[i]).donate({
        value: ETHERS * .004
      });
      expectedBalance += ETHERS * .004;
    }

    let finishBalance = await getContractBalance(contract);
    expect(finishBalance).to.be.eq(expectedBalance.toString());
  });

  it("add up the totals if donations have been made twice ", async () => {
    let signer = signers[0];
    let donate = ETHERS * .004;

    await contract.connect(signer).donate({
      value: donate
    });

    let currentDonate = await contract.getDonates(signer.getAddress());
    expect(currentDonate).to.be.eq(donate);

    await contract.connect(signer).donate({
      value: donate
    });

    currentDonate = await contract.getDonates(signer.getAddress());
    expect(currentDonate).to.be.eq(2 * donate);
  });

  it("the contract has the addresses of those who donated", async () => {
    for(let i = 1; i <= numOfDonates; i++){
      let signer = signers[i].getAddress();
      let flag = await contract.inDonaters(signer);

      assert.equal(flag, true);
    }
  });

  it("transfer donations from contract", async () => {
    let initialContractBalance = await getContractBalance(contract);
    expect(initialContractBalance).to.not.be.eq('0');

    let addressOf = signers.slice(numOfDonates - 1);

    for(let i = 0; i < numOfDonates + 2; i++){
      await contract.transfer(addressOf[i].getAddress(), ETHERS * .004);
    }

    let finishContractBalance = await getContractBalance(contract);
    expect(finishContractBalance).to.be.eq('0');
  });
});