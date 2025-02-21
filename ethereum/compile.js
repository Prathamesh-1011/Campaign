const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath); // Remove the existing build folder

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

// Solidity Compiler Input (Standard JSON Format)
const input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

// Compile the contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Ensure the build directory exists
fs.ensureDirSync(buildPath);

// Extract and save compiled contracts
for (let contractName in output.contracts["Campaign.sol"]) {
  fs.outputJsonSync(
    path.resolve(buildPath, contractName + ".json"),
    output.contracts["Campaign.sol"][contractName]
  );
}

console.log("Contracts compiled successfully!");
