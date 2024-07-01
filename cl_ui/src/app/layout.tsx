import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { cookieToInitialState } from 'wagmi'

import { config } from '@/utils/web3'
import Web3ModalProvider from '@/context/web3'


import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: 'CryptoLends | Peer to Peer Lending DeFi Platform',
  description: 'CryptoLends is a peer to peer lending platform built on the Ethereum blockchain. Borrow and lend crypto assets with ease.',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
        <ToastContainer />
      </body>
    </html>
  )
}