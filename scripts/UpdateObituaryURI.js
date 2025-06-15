const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using deployer:", await deployer.getAddress());

  const contract = await ethers.getContractAt("MemoryWeaveObituary", CONTRACT_ADDRESS);

  const tx = await contract.updateObituaryURI(1, "https://arweave.net/O3bBhgvMmWPAV35sf9Hov9FEGwQNXqsHEjYyUIBpmXg");
  const receipt = await tx.wait();
  
  console.log(receipt.logs);
}
main().catch(console.error);