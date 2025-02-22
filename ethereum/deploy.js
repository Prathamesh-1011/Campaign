const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying contract on ${hre.network.name} with account:`, deployer.address);

  let routerAddress;
  if (hre.network.name === "sepolia") {
    routerAddress = "0x7029F240fe34cB577bC45ba855798bA21A8bbeeF"; // 🔴 Replace with actual Sepolia Router Address
  } else if (hre.network.name === "khopoli") {
    routerAddress = "0x9b9BB25f1A81078C544C829c5EB7822d747Cf434"; // 🔵 Replace with actual Khopoli Router Address
  } else {
    throw new Error("Unsupported network. Use --network sepolia or --network khopoli");
  }

  const minimumContribution = hre.ethers.parseEther("0.01");

  const CrossChainCampaign = await hre.ethers.getContractFactory("CrossChainCampaign");
  const campaign = await CrossChainCampaign.deploy(minimumContribution, deployer.address, routerAddress);

  await campaign.waitForDeployment();
  console.log(`CrossChainCampaign deployed to ${await campaign.getAddress()} on ${hre.network.name}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
