"use client"

import React from 'react'
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { BuyToken } from './components/BuyToken'
import { Connect } from './components/Connect'
import { Homepage } from './components/homepage'

export default function Home() {

  return <>
    <div className='flex flex-col min-h-screen'>
      <Homepage />
      <Footer />
    </div>
  </>
}