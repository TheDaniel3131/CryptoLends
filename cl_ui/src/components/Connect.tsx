"use client"

import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { createUserAddress } from '../supabase/query/createUserAddress';

export function Connect() {
    const { isConnected, address } = useAccount();

    useEffect(() => {
        const handleAddressUpdate = async (userAddress: string) => {
            const success = await createUserAddress(userAddress);
            if (success) {
                console.log('Address updated successfully');
            } else {
                console.error('Error updating address');
            }
        };

        if (isConnected && address) {
            handleAddressUpdate(address);
        }
    }, [isConnected, address]);

    return (
        <div>
            <w3m-button
                label={isConnected ? 'Connected' : 'Connect Wallet'}
                balance='hide'
                size='md'
                loadingLabel='Connecting'
            />
        </div>
    );
}
