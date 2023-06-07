import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import mamaTokenContractData from './data/mantlemancertoken-contract.json';

const Staking = ({ signer }) => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [balance, setBalance] = useState('');
  const [stakedBalance, setStakedBalance] = useState('');
  const [mamaTokenContract, setMamaTokenContract] = useState('');

  useEffect(() => {
    async function fetchData() {
      const userAddress = window.ethereum.selectedAddress;
      const mamaTokenAddress = mamaTokenContractData.contract.address;
      const mamaTokenAbi = mamaTokenContractData.contract.abi;

      const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545")
      const mamaTokenContract = new ethers.Contract(mamaTokenAddress, mamaTokenAbi, provider);
      setMamaTokenContract(mamaTokenContract)

      const balance = await mamaTokenContract.balanceOf(userAddress)
      const stakedBalance = await mamaTokenContract.stakedBalance(userAddress)

      setBalance(balance);
      setStakedBalance(stakedBalance);
    }

    fetchData();
  }, []);

  const handleStake = async () => {
    try {
      if (window.ethereum.selectedAddress && mamaTokenContract) {
        const userAddress = window.ethereum.selectedAddress;
        await mamaTokenContract.connect(signer).stakeTokens(stakeAmount).send({ from: userAddress });

        setStakeAmount('');
        setBalance(balance => balance - stakeAmount);
        setStakedBalance(stakedBalance => Number(stakedBalance) + Number(stakeAmount));
      }
    } catch (error) {
    }
  };

  const handleUnstake = async () => {
    try {
      if (window.ethereum.selectedAddress && mamaTokenContract) {
        const userAddress = window.ethereum.selectedAddress;
        await mamaTokenContract.connect(signer).unstakeTokens(unstakeAmount).send({ from: userAddress });

        setUnstakeAmount('');
        setBalance(balance => Number(balance) + Number(unstakeAmount));
        setStakedBalance(stakedBalance => stakedBalance - unstakeAmount);
      }
    } catch (error) {
    }
  };

  const formatEther = (balanceInWei) => {
    if (balanceInWei != "") {
      return ethers.utils.formatEther(balanceInWei).split(".")[0]
    } else {
      return "";
    }
  };

  return (
    <div className="form-container">
      <div class="form-row input-container-name staking">
        <h2 className="form-row mantle-title staking">Staking</h2>
      </div>
      
      <div class="form-row input-container-name">
        <div className="mantle-title small-title balances">
          <p>Balance: {formatEther(balance)}</p>
        </div>
      </div>

      <div class="form-row input-container-name">
        <div className="mantle-title small-title balances">
          <p>Staked Balance: {stakedBalance.toString()}</p>
        </div>
      </div>

      <div class="form-row input-container-name">
        <input type="number" value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} className="input-design"/> 
      </div>
      <div class="form-row input-container-name">
        <button onClick={handleStake} className="submit-button verify-button stake-button">Stake</button>
      </div>
      <div class="form-row input-container-name">
        <input type="number" value={unstakeAmount} onChange={e => setUnstakeAmount(e.target.value)} className="input-design"/>
      </div>
      <div class="form-row input-container-name">
        <button onClick={handleUnstake} className="submit-button red-button stake-button">Unstake</button>
      </div>
    </div>
  );
}

export default Staking;
