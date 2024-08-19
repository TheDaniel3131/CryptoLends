// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0

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
        _mint(initialOwner, 1000000 * 10 ** decimals());  // Mint initial tokens to owner
    }

    // Mint new tokens (Only owner can mint)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Pause all token transfers (Only owner can pause)
    function pause() public onlyOwner {
        _pause();
    }

    // Unpause all token transfers (Only owner can unpause)
    function unpause() public onlyOwner {
        _unpause();
    }

    // Request a loan
    function requestLoan(uint _amount, uint _interest, uint _duration) external {
        require(balanceOf(msg.sender) >= _amount, "Insufficient token balance for loan");
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

    // Fund a loan
    function fundLoan(uint _loanId) external payable whenNotPaused {
        Loan storage loan = loans[_loanId];
        require(msg.value == loan.amount, "Incorrect loan amount");
        require(loan.lender == address(0), "Loan already funded");
        loan.lender = payable(msg.sender);
        loan.borrower.transfer(msg.value);
    }

    // Repay a loan
    event LoanRepaid(address borrower, address lender, uint256 amount);

    function repayLoan(uint _loanId) external payable whenNotPaused {
        Loan storage loan = loans[_loanId];
        
        require(msg.sender == loan.borrower, "Only borrower can repay");
        require(!loan.repaid, "Loan already repaid");
        require(msg.value == loan.amount + loan.interest, "Incorrect repayment amount");
        
        loan.lender.transfer(msg.value);  // Transfer funds to lender
        loan.repaid = true;  // Mark the loan as repaid
        
        emit LoanRepaid(msg.sender, loan.lender, msg.value);  // Emit event for logging
    }


    // Buy tokens
    function buyTokens() external payable whenNotPaused {
        require(msg.value > 0, "Need to send ETH to buy tokens");
        uint256 tokens = msg.value * 100; // Example conversion rate: 1 ETH = 100 CLT
        _mint(msg.sender, tokens);
    }

    // Sell tokens
    function sellToken(uint256 amount) external whenNotPaused {
        require(balanceOf(msg.sender) >= amount, "Insufficient token balance to sell");
        uint256 ethAmount = amount / 100; // Example conversion rate: 100 CLT = 1 ETH
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(ethAmount);
    }

    event WithdrawalRequested(address indexed user, uint256 amount);

    // Withdraw contract balance (Only owner can withdraw)
    function withdrawal(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than zero");
        require(address(this).balance >= amount, "Insufficient contract balance");

        emit WithdrawalRequested(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }
}