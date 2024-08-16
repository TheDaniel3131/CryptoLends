// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract CryptoLendsToken is ERC20, Ownable, Pausable {
    struct Loan {
        uint id;
        address payable borrower;
        address payable lender;
        uint amount;
        uint interest;
        uint duration;
        bool repaid;
    }

    uint public nextLoanId;
    mapping(uint => Loan) public loans;

    constructor(address initialOwner) ERC20("CryptoLendsToken", "CLT") Ownable(initialOwner) {
        _mint(initialOwner, 1000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
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

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function requestLoan(uint _amount, uint _interest, uint _duration) external {
        require(balanceOf(msg.sender) >= _amount, "Insufficient token balance");
        loans[nextLoanId] = Loan({
            id: nextLoanId,
            borrower: payable(msg.sender),
            lender: payable(address(0)),
            amount: _amount,
            interest: _interest,
            duration: _duration,
            repaid: false
        });
        nextLoanId++;
    }

    function fundLoan(uint _loanId) external payable whenNotPaused {
        Loan storage loan = loans[_loanId];
        require(msg.value == loan.amount, "Incorrect loan amount");
        require(loan.lender == address(0), "Loan already funded");
        loan.lender = payable(msg.sender);
        loan.borrower.transfer(msg.value);
    }

    function repayLoan(uint _loanId) external payable whenNotPaused {
        Loan storage loan = loans[_loanId];
        require(msg.sender == loan.borrower, "Only borrower can repay");
        require(!loan.repaid, "Loan already repaid");
        require(msg.value == loan.amount + loan.interest, "Incorrect repayment amount");
        loan.lender.transfer(msg.value);
        loan.repaid = true;
    }

    function buyToken() external payable whenNotPaused {
        require(msg.value > 0, "Need to send ETH to buy tokens");
        uint256 tokens = msg.value * 100;
        _mint(msg.sender, tokens);
    }

    function sellToken(uint256 amount) external whenNotPaused {
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance");
        uint256 ethAmount = amount / 100;
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(ethAmount);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}