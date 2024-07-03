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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/components/ui/select";
import { sharedAppUrls } from "@repo/ui/src/lib/config/appUrls";
import {
  changeDateFormat,
  encryptDataForUrl,
} from "@repo/ui/src/lib/utils/functions";
import { CheckboxWithText } from "@repo/ui/src/pages/(auth)/SignUp/components/CheckboxWithText";
import { DatePicker } from "@repo/ui/src/pages/(auth)/SignUp/components/DatePicker";
import {
  addressTypeChoices,
  genderChoices,
} from "@repo/ui/src/pages/(auth)/SignUp/config/constants";
import {
  fetchCityData,
  fetchRegionData,
  registerNewUser,
} from "@repo/ui/src/pages/(auth)/SignUp/manager/signupManager";
import { webAppUrls } from "@repo/web/lib/config/appUrls";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    dateOfBirth: z
      .string()
      .regex(
        /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/,
        "Invalid date format. Required format: MMMM d, yyyy",
      )
      .optional(),
    gender: z.enum(["male", "female", "others"]).optional(),
    email: z.string().email(),
    phone: z
      .string()
      .length(11, {
        message: "Phone number must be exactly 11 characters long",
      })
      .refine((val) => val.startsWith("01"), {
        message: "Phone number must start with '01'",
      }),
    country: z.string().max(100).optional(),
    region: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    area: z.string().max(15).optional(),
    zipCode: z.string().min(3).max(10).optional(),
    streetAddress: z.string().max(255).optional(),
    addressType: z.enum(["home", "office"]).default("home"),
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
    confirmPassword: z
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
    agreeTerms: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  })
  .refine((data) => data.agreeTerms === true, {
    message: "Please accept our Terms & Conditions and Privacy Policy",
  });

export default function Form() {
  const [regionData, setRegionData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchRegionData();
      setRegionData(data?.data);
    };
    getData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      gender: undefined,
      email: "",
      phone: undefined,
      country: "Bangladesh",
      region: undefined,
      city: undefined,
      area: undefined,
      zipCode: undefined,
      streetAddress: undefined,
      addressType: "home",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newDateFormat = values.dateOfBirth
      ? changeDateFormat(values.dateOfBirth, "yyyy-MM-dd")
      : undefined;

    const userSignUpData = await registerNewUser({
      firstName: values.firstName,
      lastName: values.lastName,
      dateOfBirth: newDateFormat,
      gender: values.gender,
      email: values.email,
      phone: values.phone,
      country: values.country,
      region: values.region,
      city: values.city,
      area: values.area,
      zipCode: values.zipCode ? parseInt(values.zipCode) : undefined,
      streetAddress: values.streetAddress,
      addressType: values.addressType,
      password: values.password,
      confirmPassword: values.confirmPassword,
      agreeTerms: values.agreeTerms,
    });

    if (userSignUpData?.status === 201) {
      const userData = {
        user_id: userSignUpData?.data?.user_id.toString(),
        prevPath: pathName,
      };

      const encryptedData = encryptDataForUrl<typeof userData>(userData);

      toast.success("Your OTP has been sent.", {
        position: "top-center",
      });

      router.push(`${sharedAppUrls.AUTH.OTP}?data=${encryptedData}`);
    }

    if (userSignUpData?.hasOwnProperty("email")) {
      form.setError("email", {
        type: "manual",
        message: userSignUpData.email[0],
      });
    }
  };

  const {
    formState: { errors },
  } = form;

  const handleChange = async (id: number | string) => {
    const data = await fetchCityData({ id });
    setCityData(data?.data);
  };

  return (
    <ShadcnForm {...form}>
      <form
        className="mt-[2.5rem] w-full text-left md:w-[50%]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[16px] font-medium">
                  Personal Info
                </FormLabel>
                <FormControl>
                  <Input
                    className="font-inter mt-2 w-full rounded-none rounded-t-[10px] border border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:text-gray-700 focus-visible:ring-0"
                    type="text"
                    placeholder="First Name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="font-inter w-full rounded-none border border-t-0 border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:text-gray-700 focus-visible:ring-0"
                    type="text"
                    placeholder="Last Name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* <Input
                    className="font-inter block w-full rounded-none border border-t-0 border-black px-3 py-[1.5rem] text-[16px] font-medium text-gray-700 focus-visible:ring-0"
                    type="date"
										placeholder="Date of Birth"
                    {...field}
                  /> */}
                  <DatePicker field={field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  {...field}
                >
                  <SelectTrigger className="font-inter w-full rounded-none border border-t-0 border-black bg-transparent py-6 text-[16px] font-medium focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[placeholder]:text-gray-700">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {genderChoices.map((item, index: number) => {
                        return (
                          <SelectItem key={index} value={item?.value}>
                            {item?.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="font-inter w-full rounded-none border border-t-0 border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:text-gray-700 focus-visible:ring-0"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="font-inter w-full rounded-none rounded-b-[10px] border border-t-0 border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:text-gray-700 focus-visible:ring-0"
                    type="tel"
                    placeholder="Phone Number"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-8">
          <FormField
            control={form.control}
            name="country"
            defaultValue="Bangladesh"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[16px] font-medium">
                  Address
                </FormLabel>
                <FormControl>
                  <Input
                    className="font-inter mt-2 w-full rounded-none rounded-t-[10px] border border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:text-gray-700 focus-visible:ring-0"
                    type="text"
                    placeholder="Country"
                    readOnly
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleChange(value);
                  }}
                >
                  <SelectTrigger className="font-inter w-full rounded-none border border-t-0 border-black bg-transparent py-6 text-[16px] font-medium focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[placeholder]:text-gray-700">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {regionData?.map((data: any) => (
                        <SelectItem key={data.id} value={data?.id}>
                          {data?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="font-inter w-full rounded-none border border-t-0 border-black bg-transparent py-6 text-[16px] font-medium focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[placeholder]:text-gray-700">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {cityData?.map((data: any) => (
                        <SelectItem key={data.id} value={data?.id}>
                          {data?.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="font-inter mt-[-1px] w-full rounded-none border border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:text-gray-700 focus-visible:ring-0"
                    type="text"
                    placeholder="Area"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="font-inter mt-[-1px] w-full rounded-none border border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:text-gray-700 focus-visible:ring-0"
                    type="number"
                    placeholder="Zip Code"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="font-inter w-full rounded-none border border-t-0 border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:text-gray-700 focus-visible:ring-0"
                    type="text"
                    placeholder="Street Address"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressType"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  {...field}
                >
                  <SelectTrigger className="font-inter w-full rounded-b-[10px] rounded-t-none border border-t-0 border-black bg-transparent py-6 text-[16px] font-medium focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 data-[placeholder]:text-gray-700">
                    <SelectValue placeholder="Address Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {addressTypeChoices.map((item, index: number) => {
                        return (
                          <SelectItem key={index} value={item.value}>
                            {item.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-inter text-[16px] font-medium">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className="font-inter mt-2 w-full rounded-none rounded-t-[10px] border border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:text-gray-700 focus-visible:ring-0"
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
                    className="font-inter w-full rounded-b-[10px] rounded-t-none border border-t-0 border-black px-3 py-[1.5rem] text-[16px] font-medium placeholder:text-gray-700 focus-visible:ring-0"
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="mb-1 mt-4 flex items-center space-x-2">
          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CheckboxWithText
                    field={field}
                    termsAndConditionsLink={
                      webAppUrls.PUBLIC.TERMS_AND_CONDITIONS
                    }
                    privacyPolicyLink={webAppUrls.PUBLIC.PRIVACY_POLICY}
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
          Sign up
        </Button>

        <p className="mt-4">
          Already have an account?{" "}
          <Link
            href={sharedAppUrls.AUTH.SIGNIN}
            className="text-primary hover:underline"
          >
            Login
          </Link>{" "}
          now.
        </p>
      </form>
    </ShadcnForm>
  );
}
