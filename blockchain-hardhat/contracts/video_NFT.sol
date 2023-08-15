// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

pragma solidity ^0.8.7;

contract videoNFTMiner is ERC721URIStorage {
    address immutable i_owner;
    uint256 private s_tokenCounter;

    constructor() ERC721("Chingari", "CHG") {
        i_owner = msg.sender;
        s_tokenCounter = 0;
    }

    function mintNft(string calldata URI) public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        _setTokenURI(s_tokenCounter, URI);
        s_tokenCounter = s_tokenCounter + 1;
        return s_tokenCounter;
    }

    function change_owner(address _from, address _to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(owner == _from, "account is not owner");
        safeTransferFrom(_from, _to, tokenId);
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
