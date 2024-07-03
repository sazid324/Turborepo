import { cn } from "@/lib/utils/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ICustomImage {
  className?: string;
  imgSrc: string | StaticImageData;
  imgAlt: string;
  imgLink?: string;
  imgClass?: string;
  imgText?: string;
  textClass?: string;
}

export default function CustomImage({ ...props }: ICustomImage) {
  return (
    <>
      {props.imgLink ? (
        <Link href={`${props.imgLink}`}>
          <CustomImg {...props} />
        </Link>
      ) : (
        <CustomImg {...props} />
      )}
    </>
  );
}

function CustomImg({ ...props }: ICustomImage) {
  return (
    <>
      <div
        className={cn(
          "flex h-fit w-fit cursor-pointer flex-col items-center justify-center gap-y-3",
          props.className,
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-center",
            props.imgClass,
          )}
        >
          <Image
            src={props.imgSrc}
            alt={props.imgAlt}
            priority={true}
            style={{ width: "100%" }}
          />
        </div>
        {props.imgText && (
          <p
            className={cn(
              "-bottom-[35px] left-0 right-0 mx-auto flex h-fit w-fit items-center justify-center text-white",
              props.imgText,
            )}
          >
            {props.imgText}
          </p>
        )}
      </div>
    </>
  );
}
