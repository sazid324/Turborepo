import Form from "@repo/ui/src/pages/(auth)/Otp/components/Form";
import { Suspense } from "react";

export default function Otp() {
  return (
    <div className="font-inter flex h-screen w-full items-center justify-center bg-gray-50 px-7">
      <Suspense fallback={<div>Loading...</div>}>
        <Form />
      </Suspense>
    </div>
  );
}
