"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/src/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ShadcnForm,
} from "@repo/ui/src/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/src/components/ui/input-otp";
import { sharedAppUrls } from "@repo/ui/src/lib/config/appUrls";
import {
  decryptDataOfUrl,
  encryptDataForUrl,
} from "@repo/ui/src/lib/utils/functions";
import { cn } from "@repo/ui/src/lib/utils/utils";
import {
  resendOtp,
  resendPassResendOtp,
} from "@repo/ui/src/pages/(auth)/Otp/manager/otpResend";
import {
  verifyOtp,
  verifyResetPassOtp,
} from "@repo/ui/src/pages/(auth)/Otp/manager/otpVerify";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Form({ maxLength = 6 }) {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const router = useRouter();

  const query = useSearchParams();
  const passedData = query.get("data");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleVerifyOtp = async (
    decryptedData: any,
    data: z.infer<typeof FormSchema>,
  ) => {
    const otpVerifyData = await verifyOtp({
      user_id: decryptedData.user_id,
      otp: data.pin.toString(),
    });

    if (otpVerifyData?.status === 200) {
      toast.success("OTP verified successfully.", {
        position: "top-center",
      });

      router.push(sharedAppUrls.AUTH.SIGNIN);
    } else {
      form.setError("pin", {
        type: "manual",
        message: "Please enter a valid OTP",
      });
    }
  };

  const handleResetPassOtpVerify = async (
    decryptedData: any,
    data: z.infer<typeof FormSchema>,
  ) => {
    const resetPassOtpVerifyData = await verifyResetPassOtp({
      email: decryptedData.email,
      otp: data.pin.toString(),
    });

    const dataToResetPass = {
      email: decryptedData.email,
      secret: resetPassOtpVerifyData?.data?.secret,
    };
    const encryptedData =
      encryptDataForUrl<typeof dataToResetPass>(dataToResetPass);

    if (resetPassOtpVerifyData?.status === 200) {
      toast.success("OTP verified successfully.", {
        position: "top-center",
      });

      router.push(
        `${sharedAppUrls.AUTH.UPDATE_PASSWORD}?data=${encryptedData}`,
      );
    } else {
      form.setError("pin", {
        type: "manual",
        message: "Please enter a valid OTP",
      });
    }
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (!passedData) {
      router.back();
      return;
    }

    const decryptedData = decryptDataOfUrl(passedData);

    if (decryptedData.prevPath === sharedAppUrls.AUTH.SIGNUP) {
      handleVerifyOtp(decryptedData, data);
    }
    if (decryptedData.prevPath === sharedAppUrls.AUTH.RESET_PASSWORD) {
      handleResetPassOtpVerify(decryptedData, data);
    }
  };

  const handleResendUserOtp = async (decryptedData: any) => {
    const otpResendData = await resendOtp({
      user_id: decryptedData.user_id,
    });

    if (otpResendData?.status === 201) {
      toast.success("Your OTP has been sent.", {
        position: "top-center",
      });
    } else {
      toast(otpResendData?.detail, {
        position: "top-center",
      });
    }
  };

  const handleResetPassResendOtp = async (decryptedData: any) => {
    const otpResendData = await resendPassResendOtp({
      user_id: decryptedData.user_id,
    });

    if (otpResendData?.status === 201) {
      toast.success("Your OTP has been sent.", {
        position: "top-center",
      });
    } else {
      toast(otpResendData?.detail, {
        position: "top-center",
      });
    }
  };

  const handleResendOtp = () => {
    if (!passedData) {
      router.back();
      return;
    }

    const decryptedData = decryptDataOfUrl(passedData);

    if (decryptedData.prevPath === sharedAppUrls.AUTH.SIGNUP) {
      handleResendUserOtp(decryptedData);
    }
    if (decryptedData.prevPath === sharedAppUrls.AUTH.RESET_PASSWORD) {
      handleResetPassResendOtp(decryptedData);
    }

    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 60000);
  };

  const showButton = () => {
    setButtonVisible(true);
  };

  useEffect(() => {
    const timeout = setTimeout(showButton, 60000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ShadcnForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={maxLength} {...field}>
                  <InputOTPGroup className="font-barlow text-3xl font-[500]">
                    {[...Array(maxLength)].map((_, index: number) => {
                      return (
                        <InputOTPSlot
                          key={index}
                          className="h-[4rem] w-[4rem] border-black text-3xl"
                          index={index}
                        />
                      );
                    })}
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription className="font-inter mt-3 text-sm font-medium">
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="font-inter border-primary bg-primary hover:text-primary mt-8 w-full rounded-lg border p-2.5 text-center font-[500] text-white hover:bg-white hover:duration-300"
          type="submit"
        >
          Submit
        </Button>

        <span
          className={cn(
            "active::underline text-primary mt-3 hidden cursor-pointer text-right font-semibold hover:underline",
            {
              block: buttonVisible === true && buttonDisabled !== true,
            },
          )}
          onClick={() => handleResendOtp()}
        >
          Resend OTP
        </span>
      </form>
    </ShadcnForm>
  );
}
