"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { dashboardAppUrls } from "@repo/dashboard/lib/config/appUrls";
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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, {
      message: "Password must be no more than 100 characters long.",
    })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export default function Form() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const userSignInData = await signIn("credentials", {
      email: values?.email,
      password: values?.password,
      redirect: false,
    });

    if (userSignInData?.error !== null) {
      toast.error("Failed to sign in. Please try again.", {
        position: "top-center",
      });
    }

    if (userSignInData?.error === null) {
      router.push(dashboardAppUrls.PROTECTED.DASHBOARD);

      toast.success("You have successfully signed in.", {
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
        className="mt-[2.5rem] w-full text-left md:w-[50%]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">
                Authentication Credential
              </FormLabel>
              <FormControl>
                <Input
                  className="mt-2 w-full rounded-none rounded-t-[10px] border border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:font-medium placeholder:text-gray-700 focus-visible:ring-0 focus-visible:drop-shadow-md"
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
                  className="w-full rounded-b-[10px] rounded-t-none border border-t-0 border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:font-medium placeholder:text-gray-700 focus-visible:ring-0 focus-visible:drop-shadow-md"
                  type="password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <Link
                className="text-primary flex w-full justify-end hover:underline"
                href={sharedAppUrls.AUTH.RESET_PASSWORD}
              >
                Forgot password?
              </Link>
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
          className="border-primary bg-primary hover:text-primary mt-6 w-full rounded-lg border p-2.5 text-center font-[500] text-white hover:bg-white hover:duration-300"
          type="submit"
        >
          Sign In
        </Button>

        <p className="mt-4">
          Don&apos;t have an account?{" "}
          <Link
            href={sharedAppUrls.AUTH.SIGNUP}
            className="text-primary cursor-pointer hover:underline"
          >
            Sign up
          </Link>{" "}
          now.
        </p>
      </form>
    </ShadcnForm>
  );
}
