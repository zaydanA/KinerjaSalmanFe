import BasicInfo from "./Basic Info/BasicInfo";
import IdentityAddress from "./Basic Info/IdentityAddress";
import PersonalData from "./Basic Info/PersonalData";
import Family from "./Family/Family";

const Personal = (props:any)=>{
    
    return(
        <>
            <div id="horizontal2" className="flex flex-row border-b-1 gap-2 overflow-x-scroll">
                {props.NavbarComponentData.map((page: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined },index: React.Key | null | undefined)=>(
                    <div key={index} className='flex flex-col h-full hover:bg-gray-100 rounded-t-[25px] gap-2 pt-2 cursor-pointer' onClick={()=>{props.setActiveComponentNavbar(page.title)}}>
                        <div className={props.activeComponentNavbar == page.title? 'flex w-full h-full justify-center items-center pt-1 px-5 font-mono text-sm' : 'flex h-full items-center justify-center pt-1 px-5 font-mono text-sm font-light text-gray-400'}>{page.title}</div>
                        {<div className={props.activeComponentNavbar === page.title? "h-[5px] md:bg-[--kinerja-gold] rounded-t-lg":"h-[5px] bg-transparent rounded-t-lg"}></div>}
                    </div>
                    ))}
            </div>
            <div className="h-full w-full">
                {props.activeComponentNavbar == "Basic Info"? <BasicInfo employee={props.employee}/> : (props.activeComponentNavbar == "Family"? <Family/>:null)}
            </div>
        </>
    )
}

export default Personal;