const hardhat = require("hardhat");
const fs = require("fs/promises")

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const MantlemancerToken = await hre.ethers.getContractFactory("MamaToken");
  const mantlemancerTokenContract = await MantlemancerToken.deploy();
  await mantlemancerTokenContract.deployed()
  console.log("MantlemancerToken contract deployed to:", mantlemancerTokenContract.address);

  await writeDeploymentInfo("mantlemancertoken", mantlemancerTokenContract)
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
