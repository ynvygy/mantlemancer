import { useState } from "react";
import mmiContractData from './data/mamaitemnft-contract.json';
import { useEffect } from 'react';
import { ethers } from "ethers";
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer';
import mamaitemnftContractData from './data/mamaitemnft-contract.json';

const projectId = process.env.REACT_APP_INFURA_API_KEY
const projectSecret = process.env.REACT_APP_INFURA_API_SECRET
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  }
})

const mamaItemNftAbi = mamaitemnftContractData.contract.abi;
const mamaItemNftAddress = mamaitemnftContractData.contract.address;

const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const signer = provider.getSigner();
const mamaItemNftContract = new ethers.Contract(mamaItemNftAddress, mamaItemNftAbi, signer);

const Items = ({ signer, mantlemancerContract }) => {
  const [name, setName] = useState("");
  const [traits, setTraits] = useState("");
  const [ranges, setRanges] = useState("");
  const [item, setItem] = useState([]);
  const [apiOn, setApiOn] = useState(false);
  const [verifyOn, setVerifyOn] = useState(false);
  const [hexUsed, setHexUsed] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [mmiTokenContract, setMmiTokenContract] = useState('');
  const [filePath, setFilePath] = useState('');

  const handleApiToggle = () => {
    setApiOn(!apiOn);
    setVerifyOn(false);
  }

  const handleVerifyToggle = () => {
    setVerifyOn(!verifyOn);
    setApiOn(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTraitsChange = (event) => {
    setTraits(event.target.value);
  };

  const handleRangesChange = async (event) => {
    setRanges(event.target.value);
  };
  
  const handleMint = async () => {
    await uploadToIPFS();
    mmiTokenContract.connect(signer).mint(filePath, item)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
  
    fileReader.onloadend = () => {
      const fileContent = fileReader.result; 
      setFileContent(fileContent);
    };
  
    fileReader.readAsDataURL(file);
  };

  const uploadToIPFS = async () => {
    const file = fileContent
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result.path)
        setFilePath(result.path)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const rangesArray = ranges.split("\n");

    const processedRanges = rangesArray.map((range) => {
      const [start, end] = range.split("-");
      const startNum = parseInt(start.trim(), 10);
      const endNum = parseInt(end.trim(), 10);
      return [startNum, endNum];
    });
  
    console.log(processedRanges);

    try {
      const result = await mantlemancerContract.generateItem(
        processedRanges
      );
      setItem(result[0]);
      setHexUsed(result[1]._hex);
      console.log('Rewards:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    async function setNft() {
      const userAddress = window.ethereum.selectedAddress;
      const mmiTokenAddress = mmiContractData.contract.address;
      const mmiTokenAbi = mmiContractData.contract.abi;

      const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
      const mmiTokenContract = new ethers.Contract(mmiTokenAddress, mmiTokenAbi, provider);
      setMmiTokenContract(mmiTokenContract)
    }

    setNft();
  }, []);

  console.log(item);

  return (
    <div> 
      <div className="switch-container">
        <div className={`switch ${apiOn ? 'on' : 'off'}`} onClick={handleApiToggle}>
          <div className="toggle" />
        </div>
        <label className="mantle-title switch-label">API Mode</label>
      </div>
      <div className="switch-container">
        <div className={`switch ${verifyOn ? 'on' : 'off'}`} onClick={handleVerifyToggle}>
          <div className="toggle" />
        </div>
        <label className="mantle-title switch-label">Verify</label>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div class="form-row input-container-name">
            <label for="name" className="mantle-title smaller-title">Name:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} className="input-design"/>
          </div>

          <div class="form-row input-container-name">
            <label for="traits" className="mantle-title smaller-title">Traits:</label>
            <textarea id="traits" value={traits} onChange={handleTraitsChange} className="input-design"></textarea>

            <label for="ranges" className="mantle-title smaller-title">Ranges:</label>
            <textarea id="ranges" value={ranges} onChange={handleRangesChange} className="input-design"></textarea>
          </div>

          <div class="form-row input-container-name">
            <button type="submit" className="submit-button red-button">Mystic Forging</button>
          </div>
        </form>

        {item.length !== 0 && (
          <div>
            <div className="result-hex">
              <h3 className="result-title">Your verify hash is: {hexUsed}</h3>
            </div>
            <div className="result-div item-result">
              <h3 className="result-title">{name}</h3>
              <div className="result-values">
                <div className="result-style result-title smaller-text">
                  {traits.split("\n").map((trait, index) => (
                    <p key={index}>{trait}</p>
                  ))}
                </div>
                <div className="result-style result-title smaller-text">
                  {item.map((range, index) => (
                    <p key={index}>{range.toString()}</p>
                  ))}
                </div>
              </div>
            </div>
            <div class="form-row input-container-name margin-top">
              <input
                type="file"
                accept=".jpg, .png, .gif"
                onChange={handleFileUpload}
              />
              <button className="submit-button verify-button" onClick={handleMint}>Mint</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
