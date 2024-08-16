import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545"); // Use your local network or specific RPC URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const balance = await provider.getBalance(contractAddress);
    res.status(200).json({ balance: ethers.utils.formatEther(balance) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get contract balance" });
  }
}
