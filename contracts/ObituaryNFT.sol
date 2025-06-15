// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemoryWeaveObituary is 
    ERC721URIStorage, 
    Ownable 
{
    uint256 public nextTokenId;
    address public graveyardWallet;

    struct Obituary {
        string name;
        string funeralHomeCode;
        uint256 timestamp;
    }

    mapping(uint256 => Obituary) public obituaries;

    event ObituaryMinted(uint256 indexed tokenID, string name, string funeralHomeCode, address to);
    event ObituaryURIUpdated(uint256 indexed tokenID, string newURI);

    constructor(address initialOwner, address graveyardWallet_) Ownable(initialOwner) ERC721("MemoryWeaveObituary", "MWOBT"){
        require(graveyardWallet_ != address(0), "Invalid graveyard wallet");
        graveyardWallet = graveyardWallet_;
    }

    /// @notice Mint a new Obituary NFT to the graveyard Wallet
    /// @param name_ Name of the deceased
    /// @param funeralHomeCode_ Funeral home identifier
    /// @return tokenId the newly minted NFT's token ID
    function mintObituary(string memory name_, string memory funeralHomeCode_) external onlyOwner returns (uint256 tokenId){
        tokenId = nextTokenId++;
        _safeMint(graveyardWallet, tokenId);
        obituaries[tokenId] = Obituary({
            name: name_,
            funeralHomeCode: funeralHomeCode_,
            timestamp: block.timestamp
        });
        emit ObituaryMinted(tokenId, name_, funeralHomeCode_, graveyardWallet);
    }

    /// @notice Update the token URI for a given token ID
    /// @param tokenId Token ID to update
    /// @param newURI The new metadata URI (Arweave)
    function updateObituaryURI(uint256 tokenId, string memory newURI) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "NFT of provided token ID does not exist");
        _setTokenURI(tokenId, newURI);
        emit ObituaryURIUpdated(tokenId, newURI);
    }

    /// @notice Getter for Obituary info
    function getObituary(uint256 tokenId) external view returns (Obituary memory) {
        require(_ownerOf(tokenId) != address(0), "NFT of provided token ID does not exist");
        return obituaries[tokenId];
    }
}