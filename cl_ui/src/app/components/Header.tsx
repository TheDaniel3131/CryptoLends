import React from 'react'
import { Connect } from './Connect'

export function Header() {
    return (
        <header className='navbar flex justify-between p-4 pt-0'>
            <h1 className='text-xl font-bold'>CryptoLends</h1>
            <div className='flex gap-2'>
                <Connect />
            </div>
        </header>
    )
}