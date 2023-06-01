const hardhat = require("hardhat");
const fs = require("fs/promises")

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const Mantlemancer = await hre.ethers.getContractFactory("Mantlemancer");
  const mantlemancerContract = await Mantlemancer.deploy();
  await mantlemancerContract.deployed()
  console.log("Mantlemancer contract deployed to:", mantlemancerContract.address);

  await writeDeploymentInfo("mantlemancer", mantlemancerContract)
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
