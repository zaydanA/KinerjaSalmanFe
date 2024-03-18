import React, { ReactNode, useEffect, useState } from 'react'

type BaseModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactNode 
};

export default function BaseModal({
  open,
  setOpen,
  children
}: BaseModalProps){
  useEffect(() => {
    if (open) {
      // Disable scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling on the body when modal is closed
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  
  return (
    <div
      className={`top-0 left-0 fixed w-full h-screen overflow-y-auto z-50 ${open ? 'block' : 'hidden'}`}
    >
      <div
        className="bg-black bg-opacity-50 backdrop-blur-md absolute top-0 left-0 w-full h-full z-0"
        onClick={() => setOpen(false)}
      ></div>
      <div className="flex justify-center items-center h-full">
        <div className="relative bg-white p-6 rounded-lg shadow-sm w-[524px] z-30">
          {children}
        </div>
      </div>
    </div>
  )
}