const { ethers } = require("hardhat");

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using deployer:", await deployer.getAddress());

  const contract = await ethers.getContractAt("MemoryWeaveObituary", CONTRACT_ADDRESS);

  const tx = await contract.mintObituary("Jane Doe 5", "funeralHomeCode");
  const receipt = await tx.wait();
  
  console.log(receipt.logs);

  const event = receipt.events.find(e => e.event === "ObituaryMinted");

   if (event) {
    const { tokenID, name, to } = event.args;
    console.log("Minted Token ID:", tokenID.toString());
    console.log("Name:", name);
    console.log("To:", to);
  } else {
    console.log("No ObituaryMinted event found");
  }

}
main().catch(console.error);
