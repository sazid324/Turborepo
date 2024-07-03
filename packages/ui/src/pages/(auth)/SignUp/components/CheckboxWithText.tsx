"use client";

import { Checkbox } from "@repo/ui/src/components/ui/checkbox";
import Link from "next/link";
import { ChangeEvent } from "react";

interface ICheckboxWithText {
  field: any;
  termsAndConditionsLink: string;
  privacyPolicyLink: string;
}

export function CheckboxWithText({ ...props }: ICheckboxWithText) {
  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "false" ? true : false;
    event.target.value = value.toString();
    props.field.onChange({
      ...event,
      target: {
        ...event.target,
        value: value,
      },
    });
  };

  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        className="data-[state=checked]:border-primary border border-black"
        id="terms"
        onClick={handleClick}
        {...props.field}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-muted-foreground text-sm">
          You agree to our{" "}
          <Link
            className="text-primary hover:underline"
            href={props.termsAndConditionsLink}
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            className="text-primary hover:underline"
            href={props.privacyPolicyLink}
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
