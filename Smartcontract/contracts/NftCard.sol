//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.17;

contract NftCard {
    // Les informations de la carte
    string public title;
    string public description;
    string public rarity;

    // L'identifiant unique de la carte
    uint256 public tokenId;

    // L'adresse du propriétaire actuel de la carte
    address public owner;

    // Constructeur qui initialise les informations de la carte
    constructor()  {
        owner = msg.sender;
    }

    // Transfère la propriété de la carte à un autre utilisateur
    function transfer(address _to) public {
        require(msg.sender == owner, "Seul le proprietaire peut transferer la carte");
        owner = _to;
    }
}