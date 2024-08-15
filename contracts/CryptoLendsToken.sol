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

    // borrow Token
    function borrowToken(uint _amount, uint _interest, uint _duration) external {
        require(balanceOf(msg.sender) >= _amount, "Insufficient token balance for borrowing");
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
    // function fundLoan(uint _loanId) external payable whenNotPaused {
    //     Loan storage loan = loans[_loanId];
    //     require(msg.value == loan.amount, "Incorrect loan amount");
    //     require(loan.lender == address(0), "Loan already funded");
    //     loan.lender = payable(msg.sender);
    //     loan.borrower.transfer(msg.value);
    // }

    // Repay a loan
    function repayLoan(uint _loanId) external payable whenNotPaused {
        Loan storage loan = loans[_loanId];
        require(msg.sender == loan.borrower, "Only borrower can repay");
        require(!loan.repaid, "Loan already repaid");
        require(msg.value == loan.amount + loan.interest, "Incorrect repayment amount");
        loan.lender.transfer(msg.value);
        loan.repaid = true;
    }

    // Buy tokens
    function buyToken() external payable whenNotPaused {
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

    // Withdraw contract balance (Only owner can withdraw)
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
