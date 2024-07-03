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
import { decryptDataOfUrl } from "@repo/ui/src/lib/utils/functions";
import { updatePassword } from "@repo/ui/src/pages/(auth)/UpdatePassword/manager/updatePassword";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, {
        message: "Password must contain at least 6 character(s)",
      })
      .max(100, {
        message: "Password must contain at most 100 character(s)",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "Confirm Password must contain at least 6 character(s)",
      })
      .max(100, {
        message: "Confirm Password must contain at most 100 character(s)",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Form() {
  const router = useRouter();

  const query = useSearchParams();
  const passedData = query.get("data");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!passedData) {
      router.back();
      return;
    }

    const decryptedData = decryptDataOfUrl(passedData);

    if (values.email === decryptedData.email) {
      const resetPasswordData = await updatePassword({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        secret: decryptedData.secret,
      });

      if (resetPasswordData?.status === 200) {
        toast.success("Your password has been reset successfully.", {
          position: "top-center",
        });

        router.push(sharedAppUrls.AUTH.SIGNIN);
      }
    } else {
      toast.error("Please enter the correct email address.", {
        position: "top-center",
      });
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-[16px] font-medium">
                Authentication Credential
              </FormLabel>
              <FormControl>
                <Input
                  className="font-inter mt-2 block w-full rounded-none rounded-t-[10px] border border-black px-6 py-[1.8rem] text-[16px] font-medium placeholder:font-medium placeholder:text-gray-700"
                  type="email"
                  placeholder="Email Address"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="font-inter block w-full rounded-none border border-t-0 border-black px-6 py-[1.8rem] text-[16px] font-medium placeholder:font-medium placeholder:text-gray-700"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="font-inter block w-full rounded-none rounded-b-[10px] border border-t-0 border-black px-6 py-[1.8rem] text-[16px] font-medium placeholder:font-medium placeholder:text-gray-700"
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

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
          Update
        </Button>
      </form>
    </ShadcnForm>
  );
}
