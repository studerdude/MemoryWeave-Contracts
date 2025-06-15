const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = process.env.OBITUARY_CONTRACT_ADDRESS;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using deployer:", await deployer.getAddress());

  const contract = await ethers.getContractAt("MemoryWeaveObituary", CONTRACT_ADDRESS);

  const tx = await contract.mintObituary("Francesca Taylor", "FH-CNW23");
  const receipt = await tx.wait();
  
  console.log(receipt.logs);
}

main().catch(console.error);
