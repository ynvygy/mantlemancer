const hardhat = require("hardhat");
const fs = require("fs/promises")

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const MmiNFT = await hre.ethers.getContractFactory("MamaItemNFT");
  const mmiNFTContract = await MmiNFT.deploy();
  await mmiNFTContract.deployed()
  console.log("MamaItemNFT contract deployed to:", mmiNFTContract.address);

  await writeDeploymentInfo("mamaitemnft", mmiNFTContract)
}

async function writeDeploymentInfo(filename, contract) {
  const data = {
    contract: {
      address: contract.address,
      signerAddress: contract.signer.address,
      abi: contract.interface.format(),
    }
  }

  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(`src/data/${filename}-contract.json`, content, { encoding: "utf-8"})
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
