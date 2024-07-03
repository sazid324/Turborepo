import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";

interface IStyle {
  className: string;
}

interface ICustomButton {
  children: any;
  btnLink?: string;
  style?: IStyle;
  onClick?: () => void;
}

const css = {
  btnStyle:
    "mt-4 w-fit rounded-sm border border-primary bg-primary px-4 py-2 font-bodyFont text-xs font-bold text-white duration-300 hover:bg-white hover:text-primary md:text-sm lg:text-md",
};

export default function CustomButton({ ...props }: ICustomButton) {
  return (
    <>
      {props?.btnLink ? (
        <Button
          asChild
          className={cn(css.btnStyle, props?.style?.className)}
          onClick={props?.onClick}
        >
          <Link href={props?.btnLink}>{props?.children}</Link>
        </Button>
      ) : (
        <Button
          className={cn(css.btnStyle, props?.style?.className)}
          onClick={props?.onClick}
        >
          {props?.children}
        </Button>
      )}
    </>
  );
}
