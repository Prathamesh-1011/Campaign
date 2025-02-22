import web3 from "./web3";

import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x63F5a1B578C8dd071158AF3957b944235c17326C"
);

export default instance;