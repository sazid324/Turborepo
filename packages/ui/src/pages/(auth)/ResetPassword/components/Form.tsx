"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/src/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form as ShadcnForm,
} from "@repo/ui/src/components/ui/form";
import { Input } from "@repo/ui/src/components/ui/input";
import { sharedAppUrls } from "@repo/ui/src/lib/config/appUrls";
import { encryptDataForUrl } from "@repo/ui/src/lib/utils/functions";
import { newPassword } from "@repo/ui/src/pages/(auth)/ResetPassword/manager/resetPassword";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
});

export default function Form() {
  const pathName = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const resetPassData = await newPassword({
      email: values.email,
    });

    if (resetPassData?.status === 201) {
      const userData = {
        user_id: resetPassData?.data.user_id.toString(),
        prevPath: pathName,
        email: values.email,
      };

      const encryptedData = encryptDataForUrl<typeof userData>(userData);

      toast.success("Your OTP has been sent.", {
        position: "top-center",
      });

      router.push(`${sharedAppUrls.AUTH.OTP}?data=${encryptedData}`);
    }
  };

  const {
    formState: { errors },
  } = form;

  return (
    <ShadcnForm {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-[2rem] w-full text-left md:w-[50%]"
      >
        <div className="mt-[2rem]">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-lg font-medium">
                  Authentication Credential
                </FormLabel>
                <FormControl>
                  <Input
                    className="font-inter mt-2 w-full rounded-[10px] border border-black px-[1rem] py-[1.8rem] text-lg font-semibold placeholder:font-medium placeholder:text-gray-700"
                    type="email"
                    placeholder="Email Address"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {errors && (
          <div className="text-destructive mt-4 text-[0.8rem] font-medium">
            {Object.entries(errors).map(([key, { message }]) => (
              <p key={key}>{message}</p>
            ))}
          </div>
        )}

        <Button
          className="font-inter border-primary bg-primary hover:text-primary mt-8 w-full rounded-lg border p-2.5 text-center font-[500] text-white hover:bg-white hover:duration-300"
          type="submit"
        >
          Send OTP
        </Button>
      </form>
    </ShadcnForm>
  );
}
