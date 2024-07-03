import { apiLinks } from "@repo/ui/src/lib/config/api";
import { apiUrls } from "@repo/ui/src/lib/config/apiUrls";
import { axiosErrorHandler } from "@repo/ui/src/lib/helpers/handler";
import { apiPost } from "@repo/ui/src/services/api/api";

interface IRegisterNewUser {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "others";
  email: string;
  phone: string;
  country?: string;
  region?: string;
  city?: string;
  area?: string;
  zipCode?: number;
  streetAddress?: string;
  addressType?: "home" | "office";
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export async function registerNewUser<T>({ ...props }: IRegisterNewUser) {
  try {
    return await apiPost<any, T>(apiUrls.AUTH.SIGN_UP, {
      first_name: props.firstName.trim(),
      last_name: props.lastName.trim(),
      date_of_birth: props.dateOfBirth,
      gender: props.gender,
      email: props.email.trim(),
      phone: props.phone,
      country: props.country,
      region: props.region,
      city: props.city,
      area: props.area,
      zip_code: props.zipCode,
      street_address: props.streetAddress,
      address_type: props.addressType,
      password: props.password.trim(),
      confirm_password: props.confirmPassword.trim(),
      agree_terms: props.agreeTerms,
    });
  } catch (e: any) {
    axiosErrorHandler(e);
    return e;
  }
}

export async function fetchRegionData() {
  try {
    const res = await fetch(apiLinks.REGION_API);
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

interface IFetchCityData {
  id: number | string;
}

export async function fetchCityData({ ...props }: IFetchCityData) {
  try {
    const res = await fetch(apiLinks.CITY_API(props.id));
    return await res.json();
  } catch (error) {
    return null;
  }
}
