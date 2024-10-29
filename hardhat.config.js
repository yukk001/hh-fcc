require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config();

const SEPOLIA_URL = process.env.SEPOLIA_URL; // 没有注册成功对应的账号
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY; //待完善，需要获取对应的私钥
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.27",
    networks: {
        spolia: {
            url: SEPOLIA_URL, // rpc地址 , Alchemy , Infura , QuickNode
            accounts: [SEPOLIA_PRIVATE_KEY], // 私钥地址
            chainId: 11155111,
        },
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_API_KEY,
        },
    },
};
