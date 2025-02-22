require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/eb60a3eb5e7b40c2b1bdc6f4ab46d099",
      accounts: ["25686ea200a8fc862faa7291c19fb78484399db96f539f8da641d47a85433524"],
    },
  },
};
