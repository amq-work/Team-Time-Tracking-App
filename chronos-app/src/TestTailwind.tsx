import React from 'react'

export function TestTailwind() {
  return (
    <div className="bg-background min-h-screen p-8">
      <div className="bg-accent text-white p-4 rounded-lg">
        <h1 className="font-pixel text-2xl">Tailwind is Working!</h1>
        <p className="font-sans mt-2">If you see pink background and pixel font, it's working.</p>
      </div>
    </div>
  )
}