  
async function main() {
    // We get the contract to deploy
    const Contract = await ethers.getContractFactory("Greeter");
    const contract = await Contract.deploy("Hello, Hardhat!");
  
    console.log("Greeter deployed to:", contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });