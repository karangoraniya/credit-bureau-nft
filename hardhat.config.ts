import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ganache: {
      url: `HTTP://127.0.0.1:7545`,
      accounts: [`0x2422aeccabbc69a27eb213473dd80ee9fe9437a93db2a63f9e839cd552f53fb3`]
    }
  }
};

export default config;
