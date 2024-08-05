"use client"

import React from 'react'
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { Homepage } from './components/Homepage'

export default function Home() {
  return <>
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Homepage />
      <Footer />
    </div>
  </>
}