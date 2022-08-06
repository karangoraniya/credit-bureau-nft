import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/iaMqWrr-vV8FpPeRTTYoIiG4ADyuaA7q`,
      accounts: [``]
    }
  }
};

export default config;
