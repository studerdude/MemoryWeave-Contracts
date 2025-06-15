const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const flowerGardenWallet = process.env.FLOWERGARDEN_ADDRESS;
if (!flowerGardenWallet) throw new Error("Missing FLOWERGARDEN_ADDRESS in active .env");

  const FlowerGrams = await ethers.getContractFactory("MemoryWeaveFlowerGrams");
  const contract = await FlowerGrams.deploy(deployer.address, flowerGardenWallet);
  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});