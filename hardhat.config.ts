import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ganache: {
      url: `HTTP://127.0.0.1:7545`,
      accounts: [`0xac127b3c96eef6c48d75ff5e03bafe002178f5ab5b52ef2ca324dd4c073fb845`]
    }
  }
};

export default config;
