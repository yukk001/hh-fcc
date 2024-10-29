// import ethers.js
const { ethers } = require("hardhat");
// 创建一个函数
// init 2 accounts
// someone  is mater and another is funder
// fund contract with first account
// check balance
// fund contract with second account
// check balance of contract
//  check mapping funders address

async function main() {
    // create factory
    const fundMeFactory = await ethers.getContractFactory("FundMe");

    console.log("Deploying contract...");
    // deploy contract  只是发送了deploy 但是不一定完成；
    const fundMe = await fundMeFactory.deploy(10);
    // 等待部署完成
    await fundMe.waitForDeployment();
    console.log("Deployed");
    console.log(`Contract deployed ,the address is  ${fundMe.target}`);

    // verify fundMe
    if (
        hre.network.config.chainId == 11155111 && // 11155111 是测试网的一个id值，不同的链，不同的id
        process.env.ETHERSCAN_API_KEY
    ) {
        console.log("wait for 5 block");
        await fundMe.deploymentTransaction().wait(5);
        verifyFundMe(fundMe.target, [10]);
    } else {
        console.log("verification skipped .....");
    }
    return fundMe;
}

async function verifyFundMe(fundMeAddr, args) {
    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args,
    });
}

// 执行函数
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
