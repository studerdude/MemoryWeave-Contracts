// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemoryWeaveFlowerGrams is 
    ERC721URIStorage, 
    Ownable 
{
    uint256 public nextTokenId;
    address public flowerGardenWallet;

    struct FlowerGrams {
        string deceasedName;
        uint256 obituaryID;
        uint256 timestamp;
    }

    mapping(uint256 => FlowerGrams) public flowerGrams;

    event FlowerGramsMinted(uint256 indexed tokenID, string deceasedName, address to);
    event FlowerGramsURIUpdated(uint256 indexed tokenID, string newURI);

    constructor(address initialOwner, address flowerGardenWallet_) Ownable(initialOwner) ERC721("MemoryWeaveFlowerGrams", "MWFGS"){
        require(flowerGardenWallet_ != address(0), "Invalid graveyard wallet");
        flowerGardenWallet = flowerGardenWallet_;
    }

    /// @notice Mint a new FlowerGrams NFT to the FlowerGrams Wallet
    /// @param deceasedName_ Name of the deceased
    /// @param obituaryID_ ID of deceased this FlowerGrams NFT belongs to
    /// @return tokenId the newly minted NFT's token ID
    function mintFlowerGrams(string memory deceasedName_, uint256 obituaryID_) external onlyOwner returns (uint256 tokenId){
        tokenId = nextTokenId++;
        _safeMint(flowerGardenWallet, tokenId);
        flowerGrams[tokenId] = FlowerGrams({
            deceasedName: deceasedName_,
            obituaryID: obituaryID_,
            timestamp: block.timestamp
        });
        emit FlowerGramsMinted(tokenId, deceasedName_, flowerGardenWallet);
    }

    /// @notice Update the token URI for a given token ID
    /// @param tokenId Token ID to update
    /// @param newURI The new metadata URI (Arweave)
    function updateFlowerGramsURI(uint256 tokenId, string memory newURI) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "NFT of provided token ID does not exist");
        _setTokenURI(tokenId, newURI);
        emit FlowerGramsURIUpdated(tokenId, newURI);
    }

    /// @notice Getter for FlowerGrams info
    function getFlowerGrams(uint256 tokenId) external view returns (FlowerGrams memory) {
        require(_ownerOf(tokenId) != address(0), "NFT of provided token ID does not exist");
        return flowerGrams[tokenId];
    }
}