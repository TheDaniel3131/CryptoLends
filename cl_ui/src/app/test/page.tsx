"use client"
import { createClient } from '@supabase/supabase-js'
import React, {useEffect, useState} from "react";
import { topUpToken } from '../../supabase/query/topUpToken';
import { withdrawToken } from '../../supabase/query/withdrawToken';
import { createUserAddress } from '../../supabase/query/createUserAddress';
import { transactionProcess } from '../../supabase/query/transactionProcess';
import { borrowingListInsert } from '../../supabase/query/borrowingListInsert';


// just ignore this one
// export default function Test() {
//     const supabaseUrl = 'https://bqljlkdiicwfstzyesln.supabase.co';
//     const supabase = createClient(supabaseUrl,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbGpsa2RpaWN3ZnN0enllc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODcwNjIsImV4cCI6MjAzODc2MzA2Mn0.HEpIt52lNN8MQAcDTmvhmA1-wD4n6UpR4ImVFbk55Qc");
//
//     useEffect(() => {
//         getData();
//     }, []);
//
//     async function getData() {
//         const {data} = await supabase.from("user_address").select();
//         console.log(data);
//     }
//
//     return (<>
//
//         </>
//     )
//
// }


// have some problem (just ignore)
const DataDisplay=()=>{
    const supabaseUrl = 'https://bqljlkdiicwfstzyesln.supabase.co';
    const supabase = createClient(supabaseUrl,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxbGpsa2RpaWN3ZnN0enllc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMxODcwNjIsImV4cCI6MjAzODc2MzA2Mn0.HEpIt52lNN8MQAcDTmvhmA1-wD4n6UpR4ImVFbk55Qc");

    const [content, setContent] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{


        const fetchData = async()=>{
            try{

                const { data: session, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) {
                    console.error('Session error:', sessionError);
                    return;
                }

                const {data, error} = await supabase
                    .from("user_address")
                    .select("*");



                if(error) throw error;
                setContent(data || []);
                console.log('Fetched data:', data);
            } catch(error){
                setError("Error fetching data");
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>;


    return(
        <div>
            <h1>Data from Supabase</h1>
            {/*<ul>*/}
            {/*    {content.map(item =>(*/}
            {/*        <li key={item.id}>{item.Address}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            <ul>
                {content.length > 0 ? (
                    content.map(item => (
                        <li key={item.id}>{item.address}</li>
                    ))
                ) : (
                    <p>No addresses found</p>
                )}
            </ul>
        </div>
    );


};

// export default DataDisplay;



// use to test the top_up_token function
// const TestTopUp: React.FC = () => {
//     const [address, setAddress] = useState('');
//     const [amount, setAmount] = useState<number | ''>('');
//     const [result, setResult] = useState<string | null>(null);
//
//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//
//         if (typeof amount === 'number' && address) {
//             const success = await topUpToken(address, amount);
//             setResult(success ? 'Token top-up successful' : 'Token top-up failed');
//         } else {
//             setResult('Please enter a valid address and amount');
//         }
//     };
//
//     return (
//         <div>
//             <h1>Token Top-Up</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="address">User Address:</label>
//                     <input
//                         type="text"
//                         id="address"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="amount">Amount:</label>
//                     <input
//                         type="number"
//                         id="amount"
//                         value={amount}
//                         onChange={(e) => setAmount(Number(e.target.value))}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Top Up Token</button>
//             </form>
//             {result && <p>{result}</p>}
//         </div>
//     );
// };

// export default TestTopUp;



// use to test top and withdraw function in one table
// const TestWithdraw: React.FC = () => {
//     const [address, setAddress] = useState('');
//     const [amount, setAmount] = useState<number | ''>('');
//     const [result, setResult] = useState<string | null>(null);
//     const [action, setAction] = useState<'topup' | 'withdraw'>('topup'); // Track the action type
//
//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//
//         if (typeof amount === 'number' && address) {
//             let success = false;
//             if (action === 'topup') {
//                 success = await topUpToken(address, amount);
//             } else if (action === 'withdraw') {
//                 success = await withdrawToken(address, amount);
//             }
//
//             setResult(success ? `${action.charAt(0).toUpperCase() + action.slice(1)} successful` : `${action.charAt(0).toUpperCase() + action.slice(1)} failed`);
//         } else {
//             setResult('Please enter a valid address and amount');
//         }
//     };
//
//     return (
//         <div>
//             <h1>Token Management</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="address">User Address:</label>
//                     <input
//                         type="text"
//                         id="address"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="amount">Amount:</label>
//                     <input
//                         type="number"
//                         id="amount"
//                         value={amount}
//                         onChange={(e) => setAmount(Number(e.target.value))}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>
//                         <input
//                             type="radio"
//                             name="action"
//                             value="topup"
//                             checked={action === 'topup'}
//                             onChange={() => setAction('topup')}
//                         />
//                         Top Up
//                     </label>
//                     <label>
//                         <input
//                             type="radio"
//                             name="action"
//                             value="withdraw"
//                             checked={action === 'withdraw'}
//                             onChange={() => setAction('withdraw')}
//                         />
//                         Withdraw
//                     </label>
//                 </div>
//                 <button type="submit">{action.charAt(0).toUpperCase() + action.slice(1)}</button>
//             </form>
//             {result && <p>{result}</p>}
//         </div>
//     );
// };
//
// export default TestWithdraw;


// set create the user Address
// const AddressForm: React.FC = () => {
//     const [address, setAddress] = useState('');
//     const [message, setMessage] = useState('');
//
//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const success = await createUserAddress(address);
//         if (success) {
//             setMessage('Address inserted successfully or already exists.');
//         } else {
//             setMessage('Failed to insert address.');
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Enter address"
//             />
//             <button type="submit">Insert Address</button>
//             {message && <p>{message}</p>}
//         </form>
//     );
// };
//
// export default AddressForm;


const TestTransactionComponent: React.FC = () => {
    const [lender, setLender] = useState('');
    const [borrower, setBorrower] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [contract, setContract] = useState('');
    const [durationMonth, setDurationMonth] = useState<number>(0);
    const [rate, setRate] = useState<number>(0);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = await transactionProcess(
            lender,
            borrower,
            amount,
            contract,
            durationMonth,
            rate
        );
        setMessage(result ? 'Transaction processed successfully' : 'Failed to process transaction');
    };

    return (
        <div>
            <h1>Test Transaction Process</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Lender Address"
                    value={lender}
                    onChange={(e) => setLender(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Borrower Address"
                    value={borrower}
                    onChange={(e) => setBorrower(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                />
                <input
                    type="text"
                    placeholder="Contract"
                    value={contract}
                    onChange={(e) => setContract(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Duration (Months)"
                    value={durationMonth}
                    onChange={(e) => setDurationMonth(Number(e.target.value))}
                    required
                />
                <input
                    type="number"
                    placeholder="Rate"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TestTransactionComponent;


// use to test the borrowing or lending list function
// const TestInsertBorrowingList: React.FC = () => {
//     const [address, setAddress] = useState('');
//     const [amount, setAmount] = useState<number>(0);
//     const [contract, setContract] = useState('');
//     const [durationMonth, setDurationMonth] = useState<number>(0);
//     const [rate, setRate] = useState<number>(0);
//     const [message, setMessage] = useState('');
//
//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         const result = await borrowingListInsert(
//             address,
//             amount,
//             contract,
//             durationMonth,
//             rate
//         );
//         setMessage(result ? 'Borrowing list entry added successfully' : 'Failed to add borrowing list entry');
//     };
//
//     return (
//         <div>
//             <h1>Test Insert Borrowing List</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Address"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="number"
//                     placeholder="Amount"
//                     value={amount}
//                     onChange={(e) => setAmount(Number(e.target.value))}
//                     required
//                 />
//                 <input
//                     type="text"
//                     placeholder="Contract"
//                     value={contract}
//                     onChange={(e) => setContract(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="number"
//                     placeholder="Duration (Months)"
//                     value={durationMonth}
//                     onChange={(e) => setDurationMonth(Number(e.target.value))}
//                     required
//                 />
//                 <input
//                     type="number"
//                     placeholder="Rate"
//                     step="0.1"
//                     value={rate}
//                     onChange={(e) => setRate(Number(e.target.value))}
//                     required
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };
//
// export default TestInsertBorrowingList;