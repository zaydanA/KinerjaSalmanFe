import React from 'react'

type BaseCardType = {
  outline?: boolean
  padding?: boolean
  children: React.ReactNode
};

export default function BaseCard({
  outline = false,
  padding = true,
  children,
}: BaseCardType ) {
  return (
    <>
      <div 
        className={`rounded-md bg-white 
        ${padding ? 'p-6' : 'p-0'}
        ${outline ? 'border shadow' : ''}`}
      >
        {children}
      </div>
    </>
  )
}