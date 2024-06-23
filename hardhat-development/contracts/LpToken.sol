// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LpToken is ERC20 {
    address public owner;
    constructor(uint256 _initial_supply) ERC20("LpToken", "LPT") {
        _mint(msg.sender,_initial_supply);
    }
}