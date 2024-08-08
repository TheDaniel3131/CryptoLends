"use client"

import React, { useState } from 'react';

export default function Lending() {
    const [amount, setAmount] = useState<number>(0);
    const [interestRate, setInterestRate] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [summaryVisible, setSummaryVisible] = useState<boolean>(false);

    const handleLend = () => {
        setSummaryVisible(true);
        // Here you would add the functionality to interact with the smart contract
        console.log("Lending initiated:", { amount, interestRate, duration });
    };

    return (
        <div className="lending-container">
            <h1>Lend</h1>
            <p>
                Earn interest on your crypto by lending it to other users on the platform. Choose the amount you want to lend, the interest rate, and the duration of the loan. Your funds will be locked in a smart contract until the loan is repaid.
            </p>
            <div className="lending-form">
                <div className="form-group">
                    <label htmlFor="amount">Amount to Lend:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="interestRate">Interest Rate (%):</label>
                    <input
                        type="number"
                        id="interestRate"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="duration">Duration (months):</label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                    />
                </div>
                <button onClick={handleLend}>Lend Now</button>
            </div>

            {summaryVisible && (
                <div className="lending-summary">
                    <h2>Lending Summary</h2>
                    <p><strong>Amount:</strong> {amount} tokens</p>
                    <p><strong>Interest Rate:</strong> {interestRate}%</p>
                    <p><strong>Duration:</strong> {duration} months</p>
                    <button onClick={() => setSummaryVisible(false)}>Edit Details</button>
                    <button onClick={() => alert('Lending initiated!')}>Confirm</button>
                </div>
            )}
            <style jsx>{`
                .lending-container {
                    max-width: 600px;
                    margin: auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .lending-form {
                    margin-top: 20px;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                .form-group input {
                    width: 100%;
                    padding: 8px;
                    box-sizing: border-box;
                }
                button {
                    padding: 10px 15px;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-right: 10px;
                }
                button:hover {
                    background-color: #005bb5;
                }
                .lending-summary {
                    margin-top: 30px;
                    padding: 15px;
                    background-color: #e9e9e9;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
}
