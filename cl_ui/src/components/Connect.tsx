"use client"

import React, { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { createUserAddress, updateUserTokenAmount } from '../supabase/query/createUserAddress';
import { BigNumber } from 'ethers'; // Make sure to import BigNumber

export function Connect() {
    const [formattedBalance, setFormattedBalance] = useState<string>("0");
    const { isConnected, address } = useAccount();
    const { data: cltBalance } = useBalance({
        address,
        token: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    });

    useEffect(() => {
        const handleAddressUpdate = async (userAddress: string) => {
            try {
                await createUserAddress(userAddress);
                if (cltBalance) {
                    const balanceInCLT = BigNumber.from(cltBalance.value).div(BigNumber.from('1000000000000000000')).toString();
                    await updateUserTokenAmount(userAddress, BigInt(balanceInCLT));
                    setFormattedBalance(cltBalance.formatted);
                }

                console.log('User data updated successfully');
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        };

        if (isConnected && address) {
            handleAddressUpdate(address);
        }
    }, [isConnected, address, cltBalance]);

    return (
        <div>
            <w3m-button
                label={isConnected ? 'Connected' : 'Connect Wallet'}
                balance='hide'
                size='md'
                loadingLabel='Connecting'
            />
            {/* {isConnected && (
                <div>
                    <p>CLT Balance: {formattedBalance} CLT</p>
                </div>
            )} */}
        </div>
    );
}
