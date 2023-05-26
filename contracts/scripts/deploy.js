const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });


async function main() {
  /*
 A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
 so randomWinnerGame here is a factory for instances of our RandomWinnerGame contract.
 */
  const randomWinnerGame = await ethers.getContractFactory("SmartLotteryVRFv2Consumer");
  // deploy the contract
  const deployedRandomWinnerGameContract = await randomWinnerGame.deploy(4635);

  await deployedRandomWinnerGameContract.deployed();

  // print the address of the deployed contract
  console.log(
    "Verify Contract Address:",
    deployedRandomWinnerGameContract.address
  );

 
  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);
 

  // Verify the contract after deploying in Ether-Polygon Scan web
  await hre.run("verify:verify", {
    address: deployedRandomWinnerGameContract.address
  });

}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });