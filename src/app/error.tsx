"use client"
import React from 'react'

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className="bg-red-100 border-1-4 border-red-500 text-red-500 mt-4 rounded shadow-md max-w-md mx-auto p-2 justify-center items-center text-center">
            <h3 className="font-bold mb-2">エラーが発生しました!!!</h3>
            <button onClick={reset} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-400 transition duration-200" >もう一度試す</button>
        </div>
    )
}


