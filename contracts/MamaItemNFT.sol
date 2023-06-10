// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MamaItemNFT is ERC721 {
    uint256 private tokenIdCounter;
    struct NFTData {
        string ipfsAddress;
        uint[] additionalData;
    }

    mapping(uint256 => NFTData) private _nftData;

    constructor() ERC721("MamaItemToken", "MMI") {}

    function mint(
        string memory ipfsAddress,
        uint256[] memory additionalData
    ) public {
        uint256 tokenId = tokenIdCounter;
        _safeMint(msg.sender, tokenId);
        _nftData[tokenId] = NFTData(ipfsAddress, additionalData);
        tokenIdCounter++;
    }

    function getNFTData(
        uint256 tokenId
    )
        public
        view
        returns (string memory ipfsAddress, uint256[] memory additionalData)
    {
        NFTData memory data = _nftData[tokenId];
        ipfsAddress = data.ipfsAddress;
        additionalData = data.additionalData;
    }
}
