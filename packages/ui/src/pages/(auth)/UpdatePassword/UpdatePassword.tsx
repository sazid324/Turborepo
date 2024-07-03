import Form from "@repo/ui/src/pages/(auth)/UpdatePassword/components/Form";
import { Suspense } from "react";

export default function UpdatePassword() {
  return (
    <div className="font-inter bg-gray-50 font-[500]">
      <div className="flex w-full flex-col items-center justify-center px-7 py-[10rem] text-center">
        <h2 className="font-inter mb-3 text-6xl font-bold italic">
          Update Password
        </h2>
        <p className="font-inter font-[500] text-gray-500">
          Enter your new password.
        </p>
        <Suspense fallback={<div>Loading...</div>}>
          <Form />
        </Suspense>
      </div>
    </div>
  );
}
