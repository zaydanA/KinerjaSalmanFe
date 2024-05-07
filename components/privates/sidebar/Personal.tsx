import BasicInfo from "./Basic Info/BasicInfo";
import Dependent from "./Dependent/Dependent";

const Personal = (props: any) => {
  return (
    <>
      <div
        id="horizontal2"
        className="max-w-5/6 mb-1 flex flex-row gap-2 overflow-x-auto border-b-1"
      >
        {props.activeComponentNavbar &&
          props.NavbarComponentData.map(
            (
              page: {
                title:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | React.PromiseLikeOfReactNode
                  | null
                  | undefined;
              },
              index: React.Key | null | undefined,
            ) => (
              <div
                key={index}
                className="flex h-full cursor-pointer flex-col gap-2 rounded-t-[25px] pt-2 hover:bg-gray-100"
                onClick={() => {
                  props.setActiveComponentNavbar(page.title);
                }}
              >
                <div
                  className={
                    props.activeComponentNavbar == page.title
                      ? "flex h-full w-full items-center justify-center px-5 pt-1 font-mono text-sm"
                      : "flex h-full w-full items-center justify-center px-5 pt-1 font-mono text-sm font-light text-gray-400"
                  }
                >
                  {page.title}
                </div>
                {
                  <div
                    className={`h-[5px] ${props.activeComponentNavbar === page.title ? "bg-[--kinerja-gold]" : ""} rounded-t-lg`}
                  ></div>
                }
              </div>
            ),
          )}
      </div>
      <div className="h-full w-full">
        {props.activeComponentNavbar == "Basic Info" ? (
          <BasicInfo employee={props.employee} />
        ) : props.activeComponentNavbar == "Dependent" ? (
          <Dependent user={props.employee} />
        ) : null}
      </div>
    </>
  );
};

export default Personal;
