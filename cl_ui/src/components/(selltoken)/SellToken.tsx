'use client'
import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { Address, parseEther } from 'viem'
import { useState, useEffect } from 'react'
import { print } from "@/utils/toast"
import ico from '@/abi/ICO.json'
import { ICOContractAddress } from '@/utils/smartContractAddress'

export function SellToken() {
    const contractAddress = ICOContractAddress as Address
    const [amount, setAmount] = useState('0.01')

    const { error: estimateError } = useSimulateContract({
        address: contractAddress ?? undefined,
        abi: ico.abi,
        functionName: 'sellToken',
        args: [parseEther(amount)]
    })

    const { data, writeContract } = useWriteContract()

    const {
        error: txError,
        isSuccess: txSuccess,
    } = useWaitForTransactionReceipt({
        hash: data,
    })

    const handleSellTransaction = () => {
        if (estimateError) {
            print(`Transaction failed: ${estimateError.cause}`, 'error')
            return
        }

        writeContract({
            address: contractAddress ?? undefined,
            abi: ico.abi,
            functionName: 'sellToken',
            args: [parseEther(amount)]
        })
    }

    const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value)
    }

    useEffect(() => {
        if (txSuccess) {
            print(`Transaction successful`, 'success')
        } else if (txError) {
            print(`Transaction failed: ${txError.cause}`, 'error')
        }
    }, [txSuccess, txError])

    return (
        <section className='flex-grow flex justify-center items-center'>
            <div className="card shadow-md rounded-lg overflow-hidden max-w-sm">
                <div className="p-4">
                    <h6 className="text-xl font-bold text-white-800">Sell Token</h6>
                    <div className="flex mt-4">
                        <input onChange={(e) => handleQuantityInput(e)} type="number" className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="Enter quantity" />
                        <button onClick={handleSellTransaction} className="ml-2 py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sell</button>
                    </div>
                </div>
            </div>
        </section>
    )
}