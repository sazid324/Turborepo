import { cn } from "@/lib/utils/utils";

interface IStyle {
  className?: string;
}

interface ICustomHeading {
  title: string;
  style?: IStyle;
}

export default function CustomHeading({ ...props }: ICustomHeading) {
  return (
    <h3
      className={cn(
        "text-primary pb-2 text-sm font-semibold md:pb-3 md:text-xl xl:pb-4 xl:text-2xl",
        props.style?.className,
      )}
    >
      {props.title}
    </h3>
  );
}
