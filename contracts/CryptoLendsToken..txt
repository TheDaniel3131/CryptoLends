// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoLendsToken is ERC20, Ownable {
    constructor() ERC20("CryptoLendsToken", "CLT") Ownable(msg.sender) {
        _mint(msg.sender, 100000 * 10 ** 18);
    }
}
