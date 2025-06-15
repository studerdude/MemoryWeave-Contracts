const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const graveyardWallet = process.env.GRAVEYARD_ADDRESS;
if (!graveyardWallet) throw new Error("Missing GRAVEYARD_ADDRESS in active .env");

  const Obituary = await ethers.getContractFactory("MemoryWeaveObituary");
  const contract = await Obituary.deploy(deployer.address, graveyardWallet);
  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});