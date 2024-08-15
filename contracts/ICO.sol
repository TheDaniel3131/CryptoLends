// SPDX-License-Identifier: GPL-3.0
// Compatible with OpenZeppelin Contracts ^5.0.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract ICO is Pausable, Ownable {
    IERC20 public token;
    uint public basePrice = 1 ether; // Base price in wei
    uint public totalTokensSold;
    uint public salePhase = 1;

    mapping(uint => uint) public phasePriceMultiplier; // Phase-specific price multipliers
    mapping(uint => uint) public phaseCap; // Token caps for each phase

    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        token = IERC20(_tokenAddress);

        // Setting up sale phases with different multipliers and caps
        phasePriceMultiplier[1] = 100; // 1x base price
        phaseCap[1] = 10000 * 10 ** 18; // 10,000 tokens

        phasePriceMultiplier[2] = 150; // 1.5x base price
        phaseCap[2] = 30000 * 10 ** 18; // 30,000 tokens

        phasePriceMultiplier[3] = 200; // 2x base price
        phaseCap[3] = 60000 * 10 ** 18; // 60,000 tokens
    }

    // buyToken = lendToken (this one is to convert the token to CLT)
    function buyToken() external payable whenNotPaused {
        uint256 weiAmount = msg.value;
        require(weiAmount > 0, "Payment is required");

        uint256 currentPrice = basePrice * phasePriceMultiplier[salePhase] / 100;
        uint256 numberOfTokens = weiAmount * 10 ** 18 / currentPrice;

        require(token.balanceOf(owner()) >= numberOfTokens, "Insufficient tokens available for sale");
        require(totalTokensSold + numberOfTokens <= phaseCap[salePhase], "Phase token cap exceeded");

        token.transferFrom(owner(), msg.sender, numberOfTokens);
        totalTokensSold += numberOfTokens;

        // Move to the next phase if the cap is reached
        if (totalTokensSold >= phaseCap[salePhase] && salePhase < 3) {
            salePhase++;
        }

        emit TokensPurchased(msg.sender, numberOfTokens, weiAmount);
    }

    function borrowToken(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than zero");

        uint256 currentPrice = basePrice * phasePriceMultiplier[salePhase] / 100;
        uint256 weiAmount = amount * currentPrice / 10 ** 18;

        require(address(this).balance >= weiAmount, "Insufficient balance in the contract");

        token.transferFrom(msg.sender, owner(), amount);
        payable(msg.sender).transfer(weiAmount);

        emit TokensPurchased(msg.sender, amount, weiAmount);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function withdrawal() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function setPhase(uint _phase, uint _multiplier, uint _cap) external onlyOwner {
        phasePriceMultiplier[_phase] = _multiplier;
        phaseCap[_phase] = _cap;
    }

    function setBasePrice(uint _newBasePrice) external onlyOwner {
        basePrice = _newBasePrice;
    }
}