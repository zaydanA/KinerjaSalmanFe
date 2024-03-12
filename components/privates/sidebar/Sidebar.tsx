import SubMenu from './Submenu';

const Sidebar =  (props: any) => {
    return (
        <div className="w-full">
            {props.SidebarData.map((data: any,index: any)=>(     
                <SubMenu item={data} key={index} active={props.activeComponent} setActiveComponent={props.setActiveComponent}></SubMenu>
            ))}
        </div>
    )
}
export default Sidebar;