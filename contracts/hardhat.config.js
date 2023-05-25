require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const NODE_HTTP_URL = process.env.NODE_HTTP_URL;
const NODE_HTTP_URL_MUMBAI = process.env.NODE_HTTP_URL_MUMBAI;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2;
const EHTERSCAN_KEY = process.env.EHTERSCAN_KEY;
const EHTERSCAN_KEY_MUMBAI = process.env.EHTERSCAN_KEY_MUMBAI;

module.exports = {
  solidity: "0.8.7",
  networks: {
    sepolia: {
      url: NODE_HTTP_URL,
      accounts: [PRIVATE_KEY,PRIVATE_KEY_2],
    },
    mumbai: {
      url: NODE_HTTP_URL_MUMBAI,
      accounts: [PRIVATE_KEY,PRIVATE_KEY_2],
    }
  },
  etherscan: {
    apiKey: EHTERSCAN_KEY_MUMBAI
  },
};