import Form from "@repo/ui/src/pages/(auth)/SignIn/components/Form";

export default function SignIn() {
  return (
    <div className="h-screen bg-gray-50 font-[500]">
      <div className="grid h-full w-full grid-cols-1 gap-0 md:grid-cols-2">
        <div className="relative hidden items-center justify-center bg-[url('https://assets.lummi.ai/assets/QmWx3j3qj2uES6ztoHy72R5P2oz11QSi5e4x99TRWVoyh6?auto=format&w=1500')] bg-cover bg-center bg-no-repeat md:flex">
          <div className="absolute z-10 flex flex-col items-center justify-center gap-3 md:w-[50%]">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold text-white">
                Welcome to Banizzik
              </h2>
              <div className="mb-2 h-[2px] w-32 -skew-x-[60deg] transform bg-white"></div>
            </div>
            <p className="text-center font-light text-white">
              Sign in to discover exclusive deals and innovative products. Your
              unique shopping experience starts now!
            </p>
          </div>
          <div className="absolute inset-0 h-full w-full bg-black opacity-80"></div>
        </div>
        <div className="flex flex-col items-center justify-center px-7 py-14 text-center md:px-0">
          <h2 className="mb-3 text-6xl font-bold italic">Sign In</h2>
          <p className="font-[500] text-gray-500">
            Sign In with your banizzik account.
          </p>
          <Form />
        </div>
      </div>
    </div>
  );
}
