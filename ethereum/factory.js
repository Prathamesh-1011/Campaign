import web3 from "./web3";
import CampaignFactory from "../artifacts/contracts/CrossChainCampaign.sol/CrossChainCampaign.json ";  // Make sure this path is correct

const factoryAddress = "0x32518cDEA3d50ec265eC5F6f983282B4eee01354";  // Replace with actual deployed address

const factory = new web3.eth.Contract(CampaignFactory.abi, factoryAddress);

export default factory;

