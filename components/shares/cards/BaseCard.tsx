import React from 'react'

export default function Primary({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className='p-6 rounded-md bg-white'>
        {children}
      </div>
    </>
  )
}