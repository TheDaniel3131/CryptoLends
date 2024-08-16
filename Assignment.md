# Project Setup Guidelines for All Users

This is a User Guide for users who want to know how the program runs or functions, who are interested in code development particularly Blockchain Technology.

To run CryptoLends project locally, feel free to follow the steps below to set up both the frontend and backend components of the project. You must have Visual Studio Code, Git or Hardhat installed beforehand. There are tons of resources available online that guide on how to install these tools.

- VSCode: https://code.visualstudio.com/download

- Git: https://git-scm.com/downloads

## Frontend Commands

### Clone CryptoLends Repository

**Step 1: Initialize Git Repository**

```bash
git init
```

Purpose: Initializes a new Git repository in your project directory. This is the first step in setting up version control.

**Step 2: Add Remote Repository**

```bash
git remote add origin https://github.com/TheDaniel3131/CryptoLends.git
```

Purpose: Links your local Git repository to the remote repository on GitHub. Replace the URL with the correct remote repository URL if different.

**Step 3: Pull Latest Changes**

```bash
git pull origin main
```

Purpose: Fetches and merges the latest changes from the main branch of the remote repository into your local repository.

**Step 4: Install Dependencies**

```bash
npm install
```

or

```bash
npm i
```

Purpose: Installs all the necessary dependencies for the project as defined in the package.json file.

**Step 5: Start the Frontend Development Server**

```bash
cd cl_ui
npm run dev
```

Purpose: Navigates to the frontend directory and starts the development server. This allows you to preview the application locally as you make changes.

**Step 6: Add Frontend-Specific Tools or Packages**

Make sure you are in "cl_ci" folder!

```bash
npx v0 add Sf3MALSwyYX
```

Purpose: Executes an npx command to add a specific package or tool (v0). Ensure that you have the correct permissions and context for this command.

## Backend Commands

**Step 1: Get Help with Hardhat**

```bash
npx hardhat help
```

Purpose: Displays a list of available Hardhat commands and options. Use this command if you need guidance on how to use Hardhat features.

**Step 2: Start a Local Blockchain Node**

```bash
npx hardhat node
```

Purpose: Starts a local Ethereum blockchain node using Hardhat. This is crucial for local testing and deploying smart contracts before interacting with a live network.

**Step 3: Run the Test Suite**

```bash
npm run test
```

Purpose: Executes the project's test suite to validate the functionality of smart contracts. Ensure your test scripts are properly configured to cover all essential use cases.

**Step 4: Compile Smart Contracts**

```bash
npm run compile
```

Purpose: Compiles the Solidity smart contracts into bytecode and ABI using Hardhat. This step must be completed before testing or deploying your contracts.

**Step 5: Deploy Smart Contracts**

```bash
npm run deploy
```

Purpose: Runs the deployment script to deploy your smart contracts to a blockchain network. Make sure the deployment settings are correctly configured in the script.

For hardhat, you do not really have to run these commands if you clone the repository, but if you need these then here you go:

### Misc:

#### Hardhat Commands:

#### Step 1: Initialize the Backend Project

```bash
npm init -y
```

- **Purpose**: Initializes a new Node.js project with default settings by creating a `package.json` file.

#### Step 2: Install Hardhat as a Dev Dependency

```bash
npm install --save-dev hardhat
```

- **Purpose**: Installs Hardhat as a development dependency, a tool for smart contract development.

#### Step 3: Initialize Hardhat

```bash
npx hardhat init
```

- **Purpose**: Initializes the Hardhat environment, creating the basic directory structure and configuration files for smart contract development.

#### Step 4: Check Hardhat Version

```bash
npx hardhat --version
```

- **Purpose**: Verifies the installed version of Hardhat, ensuring that the setup is correct.

# Code Implementation Explanations with Screenshots

# Database - Supabase

### insert_address

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984306791977023/2024-08-16-17-04-23-image.png?ex=66c099d8&is=66bf4858&hm=84414fc46f400becfa8dc69977d6b6721d060d6cfd5c2521c95f3b97dd98626f&)

The `insert_address` function is designed to add a new address to the `user_address` table if it doesn't already exist. It takes a single parameter, `p_address`, which is the address to be inserted. This query function will be used when user login and detected that the user address haven't existing in the user_address table.

### insert_lending_list

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984307240636458/2024-08-16-17-07-12-image.png?ex=66c099d8&is=66bf4858&hm=b2c393d5ad65bf98b8cf49dc14f0f943ef7c0ae038e188f44ff95d931371b583&=)

The `insert_lending_list` function manages the insertion of new lending records into the `lending_list` table. It accepts parameters for `address`, `amount`, `currency`, `duration_month`, and `rate`. After performing the update, it uses `GET DIAGNOSTICS` to determine how many rows were affected by the operation. If the update was successful and affected rows, the function returns `TRUE`. Otherwise, it returns `FALSE`.This function will be used when the lender have submit the lending form on the lending page.

### withdraw_token

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984307597283382/2024-08-16-17-13-09-image.png?ex=66c099d8&is=66bf4858&hm=1a6b63cede0b452f6420af44f3e204dd71e13fac1669621426376987ba7a51aa&=)

The `withdraw_token` function is used to handle token withdrawals from user accounts. It takes two parameters: `p_address`, which represents the user’s address, and `amount`, the amount of tokens to be withdrawn.

The function first checks if the user’s account is frozen by querying the `user_address` table. If the account is frozen, it raises a notice stating that the withdrawal cannot be processed and returns `FALSE`. If the account is not frozen, it then checks whether the user has sufficient tokens available for withdrawal. If the user has enough tokens, the function updates the `token_amount` and `withdraw_amount` fields accordingly. After performing the update, it uses `GET DIAGNOSTICS` to determine how many rows were affected by the operation. If the update was successful and affected rows, the function returns `TRUE`. Otherwise, it returns `FALSE`. If the user does not have enough tokens, it raises a notice indicating insufficient funds and returns `FALSE`. This function will be used when the borrower withdraw the token to Ethereum on withdraw page.

### loan_update_process

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984307920113786/2024-08-16-17-15-59-image.png?ex=66c099d8&is=66bf4858&hm=e6c32565f01a8681778ddcf4c427a32ac0586cad8a398de4e50031c05f30ed88&=)

The `loan_update_process` function manages the process of updating loan-related information in the system. It accepts parameters such as `lender`, `borrower`, `amount`, `currency`, `duration`, `start_date`, `end_date`, and `rate`.

The function begins by calling `update_loan`, which updates the loan details in the system with the provided parameters. Following that, it calls `loan_address_borrower_status_and_amount` to adjust the status and amount related to the borrower’s address. It then calls `loan_address_lender_status_and_amount` to update the lender’s address status and amount.

If all operations complete successfully, the function returns `TRUE`. If any error occurs during these operations, the function catches the exception and returns `FALSE`, ensuring that any issues are handled gracefully. This function will be used when the borrower have process the repay action on repay page.

### update_loan

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984308712837262/2024-08-16-17-21-58-image.png?ex=66c099d8&is=66bf4858&hm=3659a3429886a3e8ac018017a533d58c04983548f0c7a37fb738765013170191&=)

The `update_loan` function is responsible for updating the status of a loan in the `transaction_record` table. It takes parameters such as `lender`, `borrower`, `amount`, `currency`, `duration`, `start_date`, `end_date`, and `rate`.

The function starts by attempting to update the status of rows in the `transaction_record` table where the specified parameters match an existing record with a status of 'Pending'. The `UPDATE` statement sets the status to 'Complete' for these records.

After performing the update, the function uses `GET DIAGNOSTICS` to check the number of rows affected by the operation. If at least one row was updated, it returns `TRUE`, indicating success. If no rows were updated, it returns `FALSE`, signaling that the update did not affect any records. This function helps manage the transition of loan records from 'Pending' to 'Complete' status efficiently.

### loan_address_borrower_status_and_amount

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984309182730240/2024-08-16-17-24-11-image.png?ex=66c099d8&is=66bf4858&hm=be3c78a6bc8efc4095e1ce580a9dc576eb5a052ade70e88480f29794311af275&=)

The `loan_address_borrower_status_and_amount` function updates the status and amount for a borrower's account in the `user_address` table. It accepts three parameters: `p_address` (the borrower's address), `amount` (the loan amount), and `interest_rate` (the rate of interest).

The function begins by checking if the account associated with `p_address` has sufficient tokens to cover the loan amount adjusted by the interest rate. If the account has enough tokens, it proceeds to update the account by reducing the `token_amount` by the product of `amount` and `interest_rate`. It also decreases the `borrowing_amount` by the original `amount` and sets both `borrow_status` and `lend_status` to `NULL`, indicating the completion or cancellation of the borrowing process.

After performing the update, the function uses `GET DIAGNOSTICS` to check how many rows were affected. If at least one row was successfully updated, it returns `TRUE`. Otherwise, it returns `FALSE`. If the account does not have enough funds, the function raises a notice about an error and returns `FALSE`. This function helps manage the post-loan status and adjustments for a borrower's account.

### loan_address_borrower_status_and_amount

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984309614612490/2024-08-16-17-26-10-image.png?ex=66c099d8&is=66bf4858&hm=9e633d07d0b3438a0e87f834c9b738f44a821e70b4a1b26414ce8cedd3d37d3b&=)

The `loan_address_lender_status_and_amount` function is used to update the status and amounts for a lender's account in the `user_address` table. It takes three parameters: `p_address` (the lender's address), `amount` (the loan amount), and `interest_rate` (the interest rate applied).

The function begins by checking if the lender’s account exists in the `user_address` table. If the account is found, it updates the `token_amount` by adding the product of `amount` and `interest_rate`, which reflects the interest earned. It also decreases the `lending_amount` by the original `amount`, and sets both `borrow_status` and `lend_status` to `NULL`, indicating the completion or cancellation of the lending process.

After performing the update, the function uses `GET DIAGNOSTICS` to determine how many rows were affected. If at least one row was updated successfully, it returns `TRUE`. If no rows were affected, it returns `FALSE`. If the account is not found, the function raises a notice about an error and returns `FALSE`. This function ensures accurate adjustments to the lender’s account following a loan transaction.

### transaction_process

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984310147420320/2024-08-16-17-28-10-image.png?ex=66c099d9&is=66bf4859&hm=be4bcde7fe1b4e5e640af1718b4bd3c29b446852632d893008b015da0a885142&=)

The `transaction_process` function coordinates the various steps involved in processing a financial transaction between a lender and a borrower. It accepts parameters such as `lender`, `borrower`, `amount`, `currency`, `duration_month`, and `rate`.

The function begins by calling `convert_token_process`, which is responsible for handling the conversion or allocation of tokens related to the transaction. Next, it invokes `update_address_borrower_status_and_amount` to adjust the borrower’s account status and amount based on the transaction details. Similarly, it calls `update_address_lender_status_and_amount` to update the lender’s account status and amount.

After executing these steps, the function returns `TRUE` if everything completes successfully. If any errors occur during these operations, it catches the exception and returns `FALSE`, ensuring that the transaction process handles failures gracefully. This function will be used when the borrower borrow the lending amount on borrowing page.

### convert_token_process

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984310453731400/2024-08-16-17-29-56-image.png?ex=66c099d9&is=66bf4859&hm=8509d44ae0229f63fd613847faa80792a71baa0ea700c2c64eaeffe1a668cfe8&=)

The `convert_token_process` function is designed to handle the creation of a new transaction record in the `transaction_record` table. It takes parameters including `lender`, `borrower`, `amount`, `currency`, `duration_month`, and `rate`.

The function begins by inserting a new row into the `transaction_record` table with the provided details. It records the lender’s and borrower’s addresses, the token amount involved in the transaction, the cryptocurrency type, the duration of the loan in months, and the interest rate. The `lending_or_borrowing_start_date` is set to the current timestamp, while the `lending_or_borrowing_end_date` is calculated by adding the duration in months to the current timestamp. The status of the transaction is initially set to 'Pending'.

### update_address_borrower_status_and_amount

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984565794308096/2024-08-16-17-38-23-image.png?ex=66c09a15&is=66bf4895&hm=829ace485b59141e5ef490fb4ca9643c54745b5f4ef9b5e8196300b956c935e5&=)

The `update_address_borrower_status_and_amount` function updates the status and amounts for a borrower's account in the `user_address` table. It accepts two parameters: `p_address`, which represents the borrower's address, and `amount`, the amount involved in the transaction.

The function updates the `user_address` table by setting the `lend_status` to `false` and the `borrow_status` to `true`, indicating that the account is now in a borrowing state. It also increases the `token_amount` by the specified `amount`, reflecting the addition of tokens to the account. Additionally, it updates the `borrowing_amount` by adding the same `amount`, representing the total borrowed amount.

### update_address_lender_status_and_amount

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984566092370003/2024-08-16-17-39-51-image.png?ex=66c09a16&is=66bf4896&hm=7fbfa1b5c3c9184d9a52f96623294abdf22bb6c2cb3ccff185ed62e1c099ff20&=)

The `update_address_lender_status_and_amount` function updates the status and amounts for a lender's account in the `user_address` table. It takes two parameters: `p_address`, representing the lender's address, and `amount`, the amount involved in the transaction.

The function performs an update operation on the `user_address` table, setting the `lend_status` to `true` and the `borrow_status` to `false`. This change reflects that the account is now in a lending state. It also decreases the `token_amount` by the specified `amount`, indicating the reduction of tokens available. Simultaneously, it increases the `lending_amount` by the same `amount`, representing the total amount lent out.

# Backend

### createUserAddress.tsx

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984566746677332/2024-08-16-17-50-14-image.png?ex=66c09a16&is=66bf4896&hm=d8abfcbeb1dd263679507e5f2af68ed59a90ed7392cdb3fa28add001151f5a3f&=)

The `createUserAddress` function is an asynchronous TypeScript function that interacts with a Supabase database to insert a new address into the `user_address` table. It takes one parameter, `address`, which represents the address to be added.

The function initializes a Supabase client using a URL and API key. For security reasons, it is advisable to use environment variables to store sensitive keys instead of hardcoding them.

The function calls the Supabase remote procedure function `insert_address`, passing the address as a parameter. If the RPC call returns an error, it logs the error message and returns `false`. If the insertion is successful and no errors are encountered, the function returns `true`, indicating that the address was successfully added to the database.

### lendingListInsert.tsx

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984567048536094/2024-08-16-17-52-09-image.png?ex=66c09a16&is=66bf4896&hm=6f965dfb98499d87af3b864881d085029264f4a139cff040b41d034b6332d6fb&=)

The `lendingListInsert` function is an asynchronous TypeScript function designed to interact with a Supabase database to insert a new lending record into the `lending_list` table. It takes parameters including `address` (the lender's address), `amount` (the lending amount), `currency` (the type of currency), `duration` (the duration of the loan in months), and `interest_rate` (the interest rate).

The function creates a Supabase client using a URL and API key. For security reasons, it is best to store sensitive information like API keys in environment variables rather than hardcoding them.

The function then calls the Supabase remote procedure function `insert_lending_list`, passing the provided details as parameters. If the RPC call encounters an error, it logs the error message and returns `false`. If the operation completes successfully and data is returned, the function returns `true`. If no data is returned and an unexpected response is encountered, it logs a message and returns `false`. This ensures that the lending record is accurately inserted and any issues are handled properly.

### transactionProcess

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984567321034802/2024-08-16-17-53-40-image.png?ex=66c09a16&is=66bf4896&hm=945e91163bcdd01b1b87e141c21da5e73e98eea33ffbc9be4604c874387ef3c2&=)

The `transactionProcess` function is an asynchronous TypeScript function that manages the transaction process between a lender and a borrower. It interacts with a Supabase database by invoking a remote procedure function named `transaction_process`.

The function takes parameters such as `lender` (the lender's address), `borrower` (the borrower's address), `amount` (the amount involved in the transaction), `currency` (the type of currency), `durationMonth` (the duration of the loan in months), and `rate` (the interest rate).

The Supabase client is initialized using a URL and API key, which should ideally be stored securely in environment variables rather than hardcoded.

The function calls the `transaction_process` RPC function with the provided parameters. If the RPC call results in an error, it logs the error message and returns `false`. If the call is successful and there are no errors, the function returns `true`, indicating that the transaction process was completed successfully.

### withdrawToken.tsx

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984567644131460/2024-08-16-17-54-42-image.png?ex=66c09a16&is=66bf4896&hm=09db9678f8b0075417d87f96e8f1d70bc313ccbf61b048a5229a0c6bfc876c39&=)

The `withdrawToken` function is an asynchronous TypeScript function that facilitates the withdrawal of tokens from a user's account by interacting with a Supabase database. It utilizes a remote procedure function named `withdraw_token`.

The function accepts two parameters: `address`, which is the user's address from which tokens will be withdrawn, and `amount`, which specifies the quantity of tokens to be withdrawn.

A Supabase client is created using a URL and API key, which are recommended to be stored securely in environment variables rather than being hardcoded.

The function calls the `withdraw_token` RPC function with the provided address and amount. If an error occurs during the RPC call, the function logs the error message and returns `false`. If the call is successful and data is returned, the function returns `true`. If the function returns no data and an unexpected response is encountered, it logs the issue and returns `false`. This ensures that the token withdrawal process is handled appropriately and errors are managed effectively.

# Frontend

### Connect.tsx

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984567857909962/2024-08-16-18-00-01-image.png?ex=66c09a16&is=66bf4896&hm=14e6529db01a679c935b287daca29e96cebcb086609b4a31bf20c9a2749343fb&=)

The `Connect` component is a React functional component that integrates with a web3 wallet and interacts with a Supabase database to update a user's address. This component uses hooks from the `wagmi` library for wallet connectivity and the `createUserAddress` function for database operations.

The component first imports necessary modules and functions, including `useAccount` from `wagmi` and `createUserAddress` from a Supabase query module.

Inside the `Connect` component, the `useAccount` hook is used to retrieve the connection status (`isConnected`) and the user's wallet address (`address`). The `useEffect` hook monitors these values, triggering a function to handle address updates when the wallet is connected and an address is available.

The `handleAddressUpdate` function asynchronously calls `createUserAddress` with the user's wallet address. If the address is successfully updated in the database, it logs a success message; otherwise, it logs an error.

The component renders a button (`w3m-button`) that displays "Connected" if the wallet is connected, or "Connect Wallet" if it is not. The button also has different states for loading and balance visibility.

This setup ensures that user addresses are updated in the database whenever a wallet connection is established, improving user experience by keeping the address information up-to-date.

### Cashout.tsx

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984568109826130/2024-08-16-18-05-04-image.png?ex=66c09a16&is=66bf4896&hm=3d574b6ded4b8b6368bf584267c197ed0272230c0ed3396ad568282b316b61b0&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984568403300462/2024-08-16-18-05-28-image.png?ex=66c09a16&is=66bf4896&hm=14d1da1ebfe8ace02facc920834572d3e914145a9eecd9d680d1e9fcdae8b40f&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984693934620782/2024-08-16-18-05-49-image.png?ex=66c09a34&is=66bf48b4&hm=4c0cb6c2e5d5f6c8797295f540eaadbdef3c147f7a4619cd1556fd124b335989&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984694211575888/2024-08-16-18-06-08-image.png?ex=66c09a34&is=66bf48b4&hm=0041ced539a34b69101570894ddfeddf3e1b03cc459f487f3877c67ab18976be&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984694643331124/2024-08-16-18-06-36-image.png?ex=66c09a34&is=66bf48b4&hm=61b012c2e0ac5ea203b4995cdd010e4e05b9be8dca5835474233534ac3da6f13&=)

The `CashOutPage` component is a user-friendly interface designed to manage financial details, focusing on lending loans and withdrawals. It features two main sectionsl, dashboard and lending loans. Dashboard has displays total funds available for withdrawal and active lending loans using `Card` components. Each card provides a snapshot of the user’s financial status. Lending loans presents a detailed table of lending loans with attributes like asset type, amount, term, interest rate, and status. This section includes badges to indicate loan status and buttons for withdrawal actions.

The component uses Tailwind CSS for styling, ensuring responsiveness and a clean design. It also incorporates a custom `CoinsIcon` for thematic enhancement. While currently static, the page is designed to handle dynamic data and user interactions effectively.

### Lending.tsx

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984695058825287/2024-08-16-18-09-44-image.png?ex=66c09a34&is=66bf48b4&hm=e1761e2111f5044d3b788feb099923a9b7735f102e3f29bac9f235f78903cee7&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984695465410650/2024-08-16-18-10-09-image.png?ex=66c09a34&is=66bf48b4&hm=93ecd6a640bb6bc0d9ba4fd39b006910e7abadb3d9c745a3ecf66f0bdf92e5f2&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984695960600597/2024-08-16-18-10-53-image.png?ex=66c09a35&is=66bf48b5&hm=4729b18bc298f0983058bb7ce1206b42eeab4995dd2871fdbae5541f9a1247f7&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984696715313213/2024-08-16-18-11-19-image.png?ex=66c09a35&is=66bf48b5&hm=498851e3e15996d1967a82fac7f341dc689edd893bbda155d94c172c087f022b&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984697088872468/2024-08-16-18-11-47-image.png?ex=66c09a35&is=66bf48b5&hm=cd00d75863ef752f5b9b81022c0d5d05af5b696ee36f9d966a05da74f5a72cd4&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984697462030387/2024-08-16-18-12-08-image.png?ex=66c09a35&is=66bf48b5&hm=057bf8400b2857a705617b452059da2038bde7dce4d3e1d4f0ead6bd5486be1f&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984697877401660/2024-08-16-18-12-28-image.png?ex=66c09a35&is=66bf48b5&hm=519a2a33b322621c56307a20f216865d05dfbb6e26e5df9642ed3c4e4355c29f&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984777732751370/2024-08-16-18-12-46-image.png?ex=66c09a48&is=66bf48c8&hm=11cedab077f7aa95a6c918de30adaf6c3fe26b9ac8a44f70191f478d61f4f8c7&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984778063970364/2024-08-16-18-13-08-image.png?ex=66c09a48&is=66bf48c8&hm=502301fae07bba3fa5bcad2836da00590701d5833a3fd354fabfd98b8fd2081a&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984778521022527/2024-08-16-18-13-34-image.png?ex=66c09a48&is=66bf48c8&hm=593c8b7584b411c8e41273aeedede827e8b001543126a492c06ca555c98f526e&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984778864951419/2024-08-16-18-13-53-image.png?ex=66c09a48&is=66bf48c8&hm=101833a4f352054d1740bea915eb3f1d7bb2ae0a9caa1ffb38bfeb7524513d01&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984779725049951/2024-08-16-18-14-12-image.png?ex=66c09a48&is=66bf48c8&hm=6be9f1deec31ce318d4ee3f5d36534a622d3f1c2d71c2fca682762d44fdf29e9&=)

The `LendingPage` component in React allows users to lend cryptocurrency assets by integrating with Ethereum through `wagmi`. The component uses hooks like `useAccount`, `useSimulateContract`, `useWriteContract`, and `useWaitForTransactionReceipt` for managing user transactions and blockchain interactions.

State variables include `amount`, `contract`, `term`, `rate`, and `message`, which handle user input and transaction status. The `handleSubmit` function validates inputs, simulates the transaction, and then executes it. The form includes fields for wallet address, cryptocurrency type, amount, term, and interest rate.

The UI features a form for submitting lending details, sections explaining the benefits and process, and an FAQ. This setup ensures a smooth lending process by managing user inputs and blockchain confirmations efficiently.

### ContactUs.tsx

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984780098338898/2024-08-16-18-15-48-image.png?ex=66c09a49&is=66bf48c9&hm=c9003af548ddbc86d4159bbccbd0e53dc81e9b0df93f1093b0353abf4806a796&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984780622364693/2024-08-16-18-16-37-image.png?ex=66c09a49&is=66bf48c9&hm=8cb47987307c159af42fbad5fe02f6f34776b6fedd77bcf89b1f7318d114f5c0&=)

The `ContactForm` component, built with React and Formspree, facilitates user inquiries and support requests. It integrates Formspree for handling form submissions, and React Toastify for user notifications.

Upon form submission, the `handleFormSubmit` function prevents the default form behavior and processes the submission using Formspree's `handleSubmit` method. It also handles errors by logging them and providing user feedback via Toastify notifications.

The form includes fields for `name`, `email`, and `subject`, all of which are required. Each field has corresponding validation error messages displayed using `ValidationError` from Formspree. The submit button is disabled during the submission process to prevent multiple submissions.

The component is styled using Tailwind CSS, ensuring a responsive and clean design with a focus on user experience.

### BDashBoard.tsx

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984781033668709/2024-08-16-18-20-49-image.png?ex=66c09a49&is=66bf48c9&hm=a0d314b247e84cef2315b6c933b39f7fbea3ffe924c8721c980c640593013ab6&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984781368954880/2024-08-16-18-21-11-image.png?ex=66c09a49&is=66bf48c9&hm=1ec1844091db8b85bd0a3b293141223d7ef6e08a09081016878d3709b0f05d72&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984781717213307/2024-08-16-18-21-38-image.png?ex=66c09a49&is=66bf48c9&hm=2fc11186f542819e2e27c7ae9389ba681ae1e06a96cf83ce97bf52907ba20c70&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984867650113566/2024-08-16-18-21-58-image.png?ex=66c09a5d&is=66bf48dd&hm=64499d47efa34e942ca55d7b268ac429bc591dcec85b0727490ad2054ce4331a&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984868073734174/2024-08-16-18-22-18-image.png?ex=66c09a5e&is=66bf48de&hm=34588823ea86306899452698a7d8df883693d9c0b40a8f4d829f7cec4626ebf4&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984868447158313/2024-08-16-18-22-37-image.png?ex=66c09a5e&is=66bf48de&hm=85fbb3c439c6d46caade1fecda6be3b1d6bdb0d1d436591c7490b7cb024aa39a&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984868740628540/2024-08-16-18-22-54-image.png?ex=66c09a5e&is=66bf48de&hm=345baaa88fe96f4d5ffa1f14732c3a47713914ea3cbf0c14feb35f250dc510e8&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984869051138210/2024-08-16-18-23-13-image.png?ex=66c09a5e&is=66bf48de&hm=b17459b90a6c6d963db72cb4b7b4d51ef3cede3659f91e064b753f19e3d204d8&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984869365715005/2024-08-16-18-23-37-image.png?ex=66c09a5e&is=66bf48de&hm=b46519d9b62da6f3d57187d6fa8bc0516bceed11f1887d5add5090533d47abea&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984869684346921/2024-08-16-18-23-57-image.png?ex=66c09a5e&is=66bf48de&hm=fbe17e189ca32c68d23b96adc3aee2eb32ab1747c64db455b87450a7e72c1f0e&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984869969690717/2024-08-16-18-24-19-image.png?ex=66c09a5e&is=66bf48de&hm=df209dedc669c80146457f26a10f64632ac2b95cdf8952504c9cd251a1f03f18&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984870938312756/2024-08-16-18-24-39-image.png?ex=66c09a5e&is=66bf48de&hm=9ac72f48b74ec355d5de8528d6484ca9db3d1901f96c0fc4845d2966d598f634&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984871211077745/2024-08-16-18-24-55-image.png?ex=66c09a5e&is=66bf48de&hm=4f0eb08dad84b10d43346d257a64b08bab25b25093899a2383268c89b420a3cb&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984935094390835/2024-08-16-18-25-19-image.png?ex=66c09a6e&is=66bf48ee&hm=67b351dc96f0c7fdd536a3f6a7a3b8222b10499cf70abd9f800db161e1a8243e&=)

The `BDashboard.tsx` file is an integral part of the loan management interface, designed to streamline the process of viewing and interacting with loan data. This React component effectively combines functionality and user experience enhancements to create a comprehensive dashboard.

At its core, the component employs React's `useState` and `useEffect` hooks to handle dynamic data. Upon initial render, it fetches loan data from the Supabase database's `lending_list` table. This asynchronous operation ensures that users are presented with up-to-date information. In the event of a data fetch error, the component logs the issue for debugging purposes.

The dashboard features robust data handling capabilities. Users can search for specific loans, filter results based on loan status and duration, and sort data by criteria such as ID, amount, and interest rate. This flexibility is facilitated through a combination of search inputs, filter checkboxes, and sorting dropdown menus.

The user interface of the `BDashboard` is thoughtfully designed to enhance usability. It includes a search bar for quick loan lookups, sortable tables for clear data presentation, and filter options for refined searches. Each loan entry is displayed with key details—such as ID, status, amount, and interest rate—alongside action buttons that direct users to more detailed loan views.

Overall, the `BDashboard.tsx` component is a well-crafted tool that integrates React's state management and UI components to deliver a functional and user-friendly loan management dashboard. Its design emphasizes ease of use and efficient data handling, making it a valuable asset in any loan management system.

### BDetails.tsx

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984935505563668/2024-08-16-18-26-39-image.png?ex=66c09a6e&is=66bf48ee&hm=4a4d68607319e838a1bae63ece754524201d5794ee7d6f353e87d83f82f4b359&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984935803224064/2024-08-16-18-26-59-image.png?ex=66c09a6e&is=66bf48ee&hm=8ead055bc028bdfc7d349d2505ef961ef2edbe0182e6a9a3c522b9c3fb8f7ff9&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984936805662811/2024-08-16-18-27-26-image.png?ex=66c09a6e&is=66bf48ee&hm=9f592616c47d41358f7a1337c4e2d470f28cd09774a9f470f6b128f86abb392e&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984937120497716/2024-08-16-18-27-45-image.png?ex=66c09a6e&is=66bf48ee&hm=50c5d7ce3cf74ba36736f916c81a049cd1f8e93109d338e9014bf6a78a80ea88&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984937766424719/2024-08-16-18-28-28-image.png?ex=66c09a6e&is=66bf48ee&hm=f0cdc1cb6ca7f696965958340da2572edf61e0746308b6b460ee6c1e5ab8a786&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984938093314069/2024-08-16-18-28-50-image.png?ex=66c09a6e&is=66bf48ee&hm=3ab3360d61ff147efc54f682c6436505d13a4efd7a07adebf3d7a4ac5052807b&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984938458484798/2024-08-16-18-29-11-image.png?ex=66c09a6e&is=66bf48ee&hm=bbd55bd8d335ad892565b69a1ba51a6e794d1eefd0c79adbf2aacd4670a01d63&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984938840035380/2024-08-16-18-29-28-image.png?ex=66c09a6e&is=66bf48ee&hm=f60a68924ee5be581e54facbf4aa217c6616829db06f4ae1db28beae9dc24369&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984992044781568/2024-08-16-18-29-44-image.png?ex=66c09a7b&is=66bf48fb&hm=18fb18a66773615a77a60559f04eda1fce9d84639f3dd4cfaf9d3958a6999568&=)

The `BDetails.tsx` component provides a detailed and interactive loan management interface within a React application. It is designed to fetch, display, and interact with loan details using various hooks and UI components.

The component starts by importing necessary modules and defining several SVG icons for visual elements. These icons include `LockIcon`, `PercentIcon`, `ReceiptIcon`, `WalletIcon`, `ClockIcon`, and `ChevronDownIcon`, which enhance the UI by providing intuitive visual cues.

The `BDetails` component itself is a functional React component that manages loan details, user interactions, and contract transactions. It uses `useState` and `useEffect` hooks to handle state and side effects. Upon loading, it fetches loan details from the Supabase database based on a loan ID obtained from the URL search parameters. If an error occurs during data fetching, it is logged and displayed to the user.

The component integrates with the Ethereum blockchain using the `wagmi` library for smart contract interactions. It simulates and writes transactions to borrow tokens, updating the state based on transaction confirmation and success. If the transaction is confirmed, it inserts the borrowing entry into the database and notifies the user through a toast message.

In the user interface, the component presents loan details in a structured format, including lender wallet address, loan amount, duration, cryptocurrency type, interest rate, and status. It also includes a borrow button that triggers the borrowing process, ensuring that the user’s wallet is connected and the necessary details are available.

Additionally, the component features a "How it Works" section that explains the borrowing process in three steps: connecting a wallet, choosing loan terms, and accessing crypto liquidity. There is also a "Frequently Asked Questions" section with collapsible triggers for common queries, enhancing user experience and providing valuable information.

Overall, the `BDetails.tsx` component is a comprehensive solution for managing loan details and interactions, combining React’s state management with blockchain functionality and user-friendly design.

### AboutUs.tsx

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984992526995597/2024-08-16-18-33-38-image.png?ex=66c09a7b&is=66bf48fb&hm=c9c3511abdfdde49930ce595a0c9a8ebbe735fb4d3a1246a19b5835416381a53&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984992879312948/2024-08-16-18-33-58-image.png?ex=66c09a7b&is=66bf48fb&hm=60d9fdaf7d7745b50129445d2eaef919d14de974f34e1374a7c2199d42e80b47&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984993227444304/2024-08-16-18-34-22-image.png?ex=66c09a7b&is=66bf48fb&hm=9940059e6c74afc3f5762eb5926df727eca4a48ed6cbda6a8b0e460ab4ee8716&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984993584087071/2024-08-16-18-34-43-image.png?ex=66c09a7b&is=66bf48fb&hm=e65042c4e45574341fb56f7c3a606d27c9482e137a950ab64a9ad5269bdd5566&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984993861046322/2024-08-16-18-35-04-image.png?ex=66c09a7c&is=66bf48fc&hm=e95cd3312c216aecc875aabd1b69c004796f16d997a621ccc1173dadecbde553&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984994154643478/2024-08-16-18-35-21-image.png?ex=66c09a7c&is=66bf48fc&hm=37f6ae5bdcc3b3ab1feff1a4464e5aa65624e368ee335636eec7f174720b4745&=)

![](https://cdn.discordapp.com/attachments/1245673510710542399/1273984994372620328/2024-08-16-18-35-39-image.png?ex=66c09a7c&is=66bf48fc&hm=bc9e86ac4925e17da41842df7b6574c64c0319713f0f0b25765a3338736a141e&=)

The `AboutUsPage` component presents a well-structured and engaging overview of the CryptoLends platform. It effectively introduces the platform's mission, highlights its core features, and provides an overview of the team behind it.

In terms of icons, the page uses a set of distinct and relevant icons to illustrate key features such as low interest rates, fast approvals, and secure transactions. However, it’s important to ensure that the icons used, such as `CurrencyIcon` and `CoinsIcon`, are chosen based on their specific context and intended meaning to avoid any confusion.

The team section includes placeholders for team member avatars, which is a good practice for maintaining layout consistency. It’s crucial to confirm that the `placeholder-user.png` file is correctly placed in the public folder so that the images load properly. Additionally, the use of `AvatarFallback` ensures that there is always a fallback display if the image fails to load.

For accessibility, consider adding `aria-label` attributes to interactive elements like buttons to improve the page’s usability for screen readers and assistive technologies.

The page layout appears responsive, utilizing both grid and flexbox techniques to adapt to different screen sizes. Testing on various devices will help ensure that all elements are displayed as intended across different screen resolutions.

Overall, the `AboutUsPage` is both informative and user-friendly, featuring clear sections and a layout that effectively communicates the values and team behind CryptoLends.

#### References

##### Repository: [CryptoLends](https://github.com/TheDaniel3131/CryptoLends)

# System Architecture Overview

![](https://cdn.discordapp.com/attachments/1245646552257658934/1273878057333297223/Blockchain_Assignment_Structure.jpg?ex=66c036e4&is=66bee564&hm=160de16a97ffdc1ef0319b5196c181eed3905a6f2a5a487199ee9b4513e27b45&=)

The project is a peer-to-peer lending platform where lenders and borrowers can transact in Ethereum. The system architecture includes several key pages:

The **contact page** features a form that allows users to send messages to other users based on the provided email address. This functionality is implemented using Formspree APIs.

The **withdraw page** includes a table for borrowers to convert loaned tokens into Ethereum. The withdrawal function calls a query function from Supabase, and the corresponding amount in the `user_address` table is deducted accordingly.

The **lending page** provides a table where lenders can submit lending requests, specifying the lending duration and interest rate. Submitted forms are sent to the backend and subsequently to a smart contract to insert the data into the lending list table. The lending status is updated to "active" to indicate that the amount is available for borrowing. Additionally, the user status is updated to reflect whether they are a lender or borrower. Borrowers cannot use the lending page functions until they have repaid their previous loans.

The **borrowing page** displays a list of available lending opportunities. Borrowers can view detailed information about each lending option and choose to borrow the amount if desired. When a borrower proceeds, the data is sent to the smart contract to update both the lender's and borrower's amounts, and the transaction is recorded in the Supabase table. The lending status changes from "active" to "pending" to notify the lender that their amount has been borrowed.

The **about us page** provides information about the platform and does not interact with any backend functionality.

The **repay page** features a table for borrowers to repay their loans, including interest. If the borrower has any outstanding loans, the details are displayed in the table. Upon repayment, the borrower's amount is deducted by the total repayment amount (principal plus interest), and the lender's amount is increased accordingly. The lending status updates from "pending" to "complete" to indicate that the repayment has been made. The statuses of the borrower and lender are also reset, allowing the borrower to use the lending page functions again.

The **user profile page** is displayed after the user logs into their MetaMask account. MetaMask integration is managed through APIs. Upon login, the system checks if the user's address exists in the Supabase table. If not, the address is inserted into the table. Users can view their profile details on this page.
