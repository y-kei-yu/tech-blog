import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header className='w-full flex justify-between items-center py-5 px-8 bg-gray-800 text-white'>
            <div>
                <h1 className='text-3xl font-extrabold'>
                    <Link href="/">My Tech Blog</Link>
                </h1>
            </div>
        </header>
    )
}

