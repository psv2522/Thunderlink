"use client"

import { usePathname } from 'next/navigation'

export default function User() {
  const pathname = usePathname()

  return (
    <div>
      <p>Pathname is { pathname}</p>
    </div>
  )
} 
