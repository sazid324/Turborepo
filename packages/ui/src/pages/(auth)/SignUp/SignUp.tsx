import { ScrollArea } from "@repo/ui/src/components/ui/scroll-area";
import Form from "@repo/ui/src/pages/(auth)/SignUp/components/Form";

export default function SignUp() {
  return (
    <div className="h-screen bg-gray-50 font-[500]">
      <div className="grid h-full w-full grid-cols-1 gap-0 md:grid-cols-2">
        <div className="relative hidden items-center justify-center bg-[url('https://assets.lummi.ai/assets/QmWvesybetfq545qzaxPv9m9VUW7tsZF7nm3XnY6tPGhQi?auto=format&w=1500')] bg-cover bg-center bg-no-repeat md:flex">
          <div className="absolute z-10 flex flex-col items-center justify-center gap-3 md:w-[50%]">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold text-white">
                Join Banizzik
              </h2>
              <div className="mb-2 h-[2px] w-20 -skew-x-[60deg] transform bg-white"></div>
            </div>
            <p className="text-center font-light text-white">
              Sign up to access exclusive deals and innovative products. Start
              your unique shopping journey today!
            </p>
          </div>
          <div className="absolute inset-0 h-full w-full bg-black opacity-80"></div>
        </div>
        <ScrollArea>
          <div className="flex flex-col items-center justify-center px-7 py-14 text-center md:px-0">
            <h2 className="mb-3 text-6xl font-bold italic">Sign Up</h2>
            <p className="font-[500] text-gray-500">
              Create your banizzik account.
            </p>
            <Form />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
