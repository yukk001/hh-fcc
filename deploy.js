const ethers = require("ethers");
// const solc = require("solc")
const fs = require("fs-extra");
const {
  TASK_FLATTEN_GET_FLATTENED_SOURCE_AND_METADATA,
} = require("hardhat/builtin-tasks/task-names");
const { hrtime } = require("process");
require("dotenv").config();

async function main() {
  // First, compile this!

  let provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  // let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  // const contract = await contractFactory.deploy({ gasPrice: 100000000000 })
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(`Contract deployed to ${contract.address}`);
  let currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber}`);
  console.log("Updating favorite number...");
  let transactionResponse = await contract.store(7);
  let transactionReceipt = await transactionResponse.wait();
  currentFavoriteNumber = await contract.retrieve();
  console.log(`New Favorite Number: ${currentFavoriteNumber}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
