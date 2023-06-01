import { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomNav from "./CustomNav";
import mantlemancerContractData from './data/mantlemancer-contract.json';
import Simulator from './Simulator'
import Items from './Items'
import Drops from './Drops'
import Characters from './Characters'

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState("");
  const [mantlemancerContract, setMantlemancerContract] = useState({});
  const [accountType, setAccountType] = useState("");
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const [multiplier1, setMultiplier1] = useState(0);
  const [multiplier2, setMultiplier2] = useState(0);
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(0);
  const [maxSum, setMaxSum] = useState(0);

  const savedWalletAddress = localStorage.getItem("walletAddress");

  const mantlemancerAddress = mantlemancerContractData.contract.address;
  const mantlemancerAbi = mantlemancerContractData.contract.abi;

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
        localStorage.setItem("walletAddress", accounts[0]);

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

  const generateNumbers = async () => {
    try {
      const result = await mantlemancerContract.generateNumbers(multiplier1, multiplier2, rangeMin, rangeMax, maxSum);
      setGeneratedNumbers(result);
    } catch (error) {
      console.error("Error generating numbers:", error);
      // Handle the error in your DApp UI
    }
  };
  
  useEffect(() => {
    if (savedWalletAddress) {
      setAccount(savedWalletAddress);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <CustomNav account={account} setAccount={setAccount} connectWallet={connectWallet} disconnectHandler={disconnectHandler} accountType={accountType}/>
        <div className="dashboard">
          <Routes>
            <Route path="/items" element={<Items mantlemancerContract={mantlemancerContract}/>} />
            <Route path="/drops" element={<Drops mantlemancerContract={mantlemancerContract}/>} />
            <Route path="/characters" element={<Characters mantlemancerContract={mantlemancerContract}/>} />
            <Route path="/simulator" element={<Simulator mantlemancerContract={mantlemancerContract}/>} />
          </Routes>
        </div>
      </BrowserRouter>
      <div>
        <input type="number" value={multiplier1} onChange={(e) => setMultiplier1(parseInt(e.target.value))} />
        <input type="number" value={multiplier2} onChange={(e) => setMultiplier2(parseInt(e.target.value))} />
        <input type="number" value={rangeMin} onChange={(e) => setRangeMin(parseInt(e.target.value))} />
        <input type="number" value={rangeMax} onChange={(e) => setRangeMax(parseInt(e.target.value))} />
        <input type="number" value={maxSum} onChange={(e) => setMaxSum(parseInt(e.target.value))} />
        <button onClick={generateNumbers}>Generate Numbers</button>
        <div>
          Generated Numbers: {generatedNumbers.map((number, index) => (
            <span key={index}>{number.toString()} </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
