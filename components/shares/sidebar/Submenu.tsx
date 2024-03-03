import Link from 'next/link';
import React, { useState } from 'react';


const SubMenu = (props:any) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => {
        setSubnav(!subnav);
    };
    return (
      <>
        <div className='flex flex-row justify-between items-center hover:bg-gray-100 text-black w-full px-[12px] py-[8px] ease-in-out rounded-lg' onClick={props.item.subNav && showSubnav}>
          <div className='flex gap-2'>
            
            <div className='text-xl'>
                {props.item.icon}
            </div>
            {!props.item.subNav? <Link href={props.item.path} className='font-semibold text-sm'>{props.item.title}</Link> : <p className='font-semibold text-sm'>{props.item.title}</p>}
          </div>
          <div className='font-light'>
            {props.item.subNav && subnav
              ? props.item.iconOpened
              : props.item.subNav
              ? props.item.iconClosed
              : null}
          </div>
        </div>
        {subnav &&
          props.item.subNav.map((item: {  id: any; title: any; }, index: any) => {
            return (
              <div className={props.active == item.title ?'flex items-center font-normal text-sm text-blue-500 ml-7 text-blue-500 px-[12px] py-[8px] rounded-lg cursor-pointer':'flex items-center font-normal text-sm text-gray-500 ml-7 hover:text-blue-700 px-[12px] py-[8px] rounded-lg cursor-pointer'} key={index} onClick={()=>{props.setActiveComponent(item.title)}}>
                {item.title}
              </div>
            );
          })}
      </>
    );
  };
  
  export default SubMenu;