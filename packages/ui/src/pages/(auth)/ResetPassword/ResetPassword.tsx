import From from "@repo/ui/src/pages/(auth)/ResetPassword/components/Form";

export default function ResetPassword() {
  return (
    <div className="font-inter h-screen bg-gray-50 font-[500]">
      <div className="flex w-full flex-col items-center justify-center px-7 py-[10rem] text-center">
        <h2 className="font-inter mb-3 text-6xl font-bold italic">
          Reset Password
        </h2>
        <p className="font-inter font-[500] text-gray-500">
          Enter your email address.
        </p>
        <From />
      </div>
    </div>
  );
}
