require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "localhost",
  networks: {
    localhost: {},
    mantletest: {
      url: 'https://mantle-testnet.rpc.thirdweb.com', 
      chainId: 5001, 
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
