import { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import CustomNav from "./CustomNav";
import mantlemancerContractData from './data/mantlemancer-contract.json';
import mamaTokenContractData from './data/mantlemancertoken-contract.json';
import Simulator from './Simulator'
import Items from './Items'
import Drops from './Drops'
import Characters from './Characters'
import Dashboard from './Dashboard'
import Staking from './Staking'

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState("");
  const [mantlemancerContract, setMantlemancerContract] = useState({});
  const [mamaTokenContract, setMamaTokenContract] = useState({});
  const [accountType, setAccountType] = useState("");

  const savedWalletAddress = localStorage.getItem("walletAddress");

  const mantlemancerAddress = mantlemancerContractData.contract.address;
  const mantlemancerAbi = mantlemancerContractData.contract.abi;

  const mamaTokenAddress = mamaTokenContractData.contract.address;
  const mamaTokenAbi = mamaTokenContractData.contract.abi;

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        
        window.ethereum.on("accountsChanged", handleAccountsChanged);

        const accounts = await provider.listAccounts();
        setAccounts(accounts);
        setAccount(accounts[0]);

        const mantlemancerContract = new ethers.Contract(mantlemancerAddress, mantlemancerAbi, provider);
        console.log(mantlemancerContract)
        setMantlemancerContract(mantlemancerContract);
        const mamaTokenContract = new ethers.Contract(mamaTokenAddress, mamaTokenAbi, provider);
        setMamaTokenContract(mamaTokenContract);
        localStorage.setItem("walletAddress", accounts[0]);
        console.log("address", mamaTokenAbi)
      } else {
        console.log("Please install MetaMask to use this application");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const disconnectHandler = () => {
    localStorage.removeItem("walletAddress");
    setAccount(null);
  };

  const handleAccountsChanged = (newAccounts) => {
    setAccounts(newAccounts);
    setAccount(newAccounts[0]);
    localStorage.setItem("walletAddress", newAccounts[0]);
  };

  const getBalance = async () => {
    await mamaTokenContract.balanceOf("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  }

  useEffect(() => {
    if (savedWalletAddress) {
      setAccount(savedWalletAddress);
    }
  }, []);

  return (
    <div className="theme">
      <BrowserRouter>
        <CustomNav account={account} setAccount={setAccount} connectWallet={connectWallet} disconnectHandler={disconnectHandler} accountType={accountType}/>
        <div className="dashboard">
          <Routes>
            <Route path="/" element={<Dashboard account={account} mantlemancerContract={mantlemancerContract}/>}/>
            <Route path="/items" element={<Items signer={signer} mantlemancerContract={mantlemancerContract}/>} />
            <Route path="/drops" element={<Drops mantlemancerContract={mantlemancerContract}/>} />
            <Route path="/characters" element={<Characters mantlemancerContract={mantlemancerContract}/>} />
            <Route path="/simulator" element={<Simulator mantlemancerContract={mantlemancerContract}/>} />
            <Route path="/staking" element={<Staking signer={signer} />} />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
};

export default App;