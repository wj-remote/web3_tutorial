require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@chainlink/env-enc").config();
require("./tasks");

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_1;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia.publicnode.com",//SEPOLIA_URL,//Alchemy API URL
      accounts:[PRIVATE_KEY,PRIVATE_KEY_1],
      chainId: 11155111,
    },
  },
  etherscan:{
      apiKey:{
        sepolia: ETHERSCAN_API_KEY
      }
    }
}

