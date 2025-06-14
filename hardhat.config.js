/** @type import('hardhat/config').HardhatUserConfig */

//IMPORTANT: when calling npx hardhat set NODE_ENV to the desired ENV or it will default to development
const dotenv = require("dotenv");
dotenv.config({path: `./.env.${process.env.NODE_ENV || "development"}`});

module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY]
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
