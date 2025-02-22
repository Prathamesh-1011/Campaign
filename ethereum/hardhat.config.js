const path = require("path"); 
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  resolve: {
    alias: {
      "@openzeppelin": path.resolve(__dirname, "node_modules/@openzeppelin"),
    },
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/eb60a3eb5e7b40c2b1bdc6f4ab46d099",
      accounts: ["d31c5ea930dd753de5a2ae2ffad88cb5a3a3bb061e1476ae6f1db9e8a888068d"],
    },
    khopoli: {
      url: "https://kopli-rpc.rnk.dev/", // 🔵 Replace with actual Khopoli RPC
      accounts: ["dfcef05ef688ac776952501ed0a31d52b5022ec9cf47cde73e6b6656db08db56"]
    }
  },
};
