"use client"

import React from 'react'
import { useAccount } from 'wagmi'

export function Connect() {
    const { isConnected } = useAccount()

    return (
        <div>
            <w3m-button
                label={isConnected ? 'Connected' : 'Connect'}
                balance='hide'
                size='md'
                loadingLabel='Connecting'
            />
        </div>
    )
}