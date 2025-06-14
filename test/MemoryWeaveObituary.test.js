const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MemoryWeaveObituary", function () {
  let contract, owner, other;
  const graveyardWallet = "0x000000000000000000000000000000000000dead";

  beforeEach(async function () {
    [owner, other] = await ethers.getSigners();
    const Obituary = await ethers.getContractFactory("MemoryWeaveObituary");
    contract = await Obituary.deploy(owner.address, graveyardWallet);
    await contract.waitForDeployment();
  });

  it("should mint an NFT and emit event", async function () {
    const tx = await contract.mintObituary("John Doe");
    const receipt = await tx.wait();

    console.log(receipt.events); //test fails for now, but event is being emitted and with correct values
    
    const event = receipt.log.filter(e => e.event === "ObituaryMinted");
    expect(event.args.name).to.equal("John Doe");
    expect(event.args.to).to.equal(graveyardWallet);

    const tokenId = event.args.tokenID;
    const obit = await contract.getObituary(tokenId);
    expect(obit.name).to.equal("John Doe");
  });

  it("should update URI and emit event", async function () {
    const tx = await contract.mintObituary("Jane Doe");
    const receipt = await tx.wait();
    console.log(receipt.events);
    const tokenId = receipt.events.filter(e => e.event === "ObituaryMinted").args.tokenID;
    const newURI = "https://arweave.net/somehash";
    await contract.updateObituaryURI(tokenId, newURI);

    const uri = await contract.tokenURI(tokenId);
    expect(uri).to.equal(newURI);
  });
});