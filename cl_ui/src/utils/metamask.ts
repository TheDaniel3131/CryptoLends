// utils/metaMask.ts
export async function getUserAddress(): Promise<string | null> {
    if (window.ethereum) {
      try {
        // Request accounts from MetaMask
        const accounts = await (window.ethereum as any).request({ method: 'eth_requestAccounts' });
        
        // Check if there are any accounts
        if (accounts.length > 0) {
          return accounts[0]; // Return the first account
        } else {
          console.error('No accounts found');
          return null;
        }
      } catch (error) {
        console.error('Error fetching accounts from MetaMask:', error);
        return null;
      }
    } else {
      console.error('MetaMask is not installed');
      return null;
    }
  }
  