// import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
// import { Address, parseEther } from 'viem'
// import { useState, useEffect } from 'react'
// import { useAccount } from 'wagmi'
// import { print } from "@/utils/toast"
// import ico from '@/abi/ico.json'
// import { ICOContractAddress } from '@/utils/smartContractAddress'


// export function SellToken() {
//     const [amount, setAmount] = useState('')
//     const { address } = useAccount()
//     const [contractAddress, setContractAddress] = useState<Address>(ICOContractAddress as Address)

//     const { data: simulateData, error: simulateError } = useSimulateContract({
//         address: contractAddress ?? undefined,
//         abi: ico.abi,
//         functionName: 'sellToken',
//         args: [parseEther(amount)],
//         account: address,
//     })

//     const { writeContract, data: writeData } = useWriteContract()

//     const {
//         isSuccess: txSuccess,
//         error: txError,
//     } = useWaitForTransactionReceipt({
//         hash: writeData,
//     })

//     const handleSellTransaction = () => {
//         if (simulateError) {
//             print(`Transaction simulation failed: ${simulateError.message}`, 'error')
//             return
//         }

//         writeContract({
//             address: contractAddress,
//             abi: ico.abi,
//             functionName: 'sellToken',
//             args: [parseEther(amount)],
//         })
//     }

//     const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setAmount(e.target.value)
//     }

//     useEffect(() => {
//         if (txSuccess) {
//             print(`Transaction successful`, 'success')
//         } else if (txError) {
//             print(`Transaction failed: ${txError.message}`, 'error')
//         }
//     }, [txSuccess, txError])

//     useEffect(() => {
//         setContractAddress(ICOContractAddress as Address)
//     }, [address])

//     return (
//         <section className='flex-grow flex justify-center items-center'>
//             <div className="card rounded-lg overflow-hidden max-w-sm">
//                 <div className="p-4">
//                     <h6 className="text-xl font-bold text-white-800">Sell Token</h6>
//                     <div className="flex mt-4">
//                         <input
//                             type="number"
//                             className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
//                             placeholder="Enter quantity"
//                             value={amount}
//                             onChange={handleQuantityInput}
//                         />
//                         <button
//                             onClick={handleSellTransaction}
//                             className="ml-2 py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                         >
//                             Sell
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }