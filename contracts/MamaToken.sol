// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MamaToken is ERC20 {
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public lastStakeTime;
    mapping(address => uint256) public rewards;

    constructor() ERC20("Mantlemancer Token", "MAMA") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
        uint256 ownerSupply = 10000 * 10 ** decimals();
        _mint(msg.sender, ownerSupply);
    }

    function stakeTokens(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _transfer(msg.sender, address(this), amount);
        stakedBalance[msg.sender] += amount;
        lastStakeTime[msg.sender] = block.timestamp;
    }

    function unstakeTokens() public {
        require(stakedBalance[msg.sender] > 0, "No tokens staked");

        uint256 amount = stakedBalance[msg.sender];

        _transfer(address(this), msg.sender, amount);
        stakedBalance[msg.sender] = 0;
    }

    function getStakedBalance(address account) public view returns (uint256) {
        return stakedBalance[account];
    }
}
