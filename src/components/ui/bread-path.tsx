import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./shadcn-component/breadcrumb";

type BreadPathProps = {
  path: string[];
  hrefPath: string[];
};

export const Breadpath = (props: BreadPathProps) => {
  return (
    <Breadcrumb className="m-3">
      <BreadcrumbList>
        {props.path.map((item, index) => {
          return (
            <div key={index} className="flex flex-row items-center gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink href={props.hrefPath[index]}>
                  {item}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
