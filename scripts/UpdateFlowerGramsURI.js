const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = process.env.FLOWERGRAMS_CONTRACT_ADDRESS;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using deployer:", await deployer.getAddress());

  const contract = await ethers.getContractAt("MemoryWeaveFlowerGrams", CONTRACT_ADDRESS);

  const tx = await contract.updateFlowerGramsURI(0, "PRETEND I UPLOADED AN ARWEAVE URL");
  const receipt = await tx.wait();
  
  console.log(receipt.logs);
}
main().catch(console.error);