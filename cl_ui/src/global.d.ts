// src/types/global.d.ts or src/global.d.ts
interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
  