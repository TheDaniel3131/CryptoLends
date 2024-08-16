"use client";

import { useEffect, useState } from 'react';

const BalanceChecker: React.FC = () => {
    const [balance, setBalance] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch('../../utils/getContractBalance.ts');
                const data = await response.json();
                setBalance(data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div>
            <h1>Contract Balance</h1>
            {balance !== null ? <p>{balance} ETH</p> : <p>Loading...</p>}
        </div>
    );
};

export default BalanceChecker;
