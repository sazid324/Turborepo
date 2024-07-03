import { apiUrls } from "@repo/ui/src/lib/config/apiUrls";
import { apiPost } from "@repo/ui/src/services/api/api";

interface IVerifyOtp {
  user_id: string;
  otp: string;
}

interface IVerifyResetPassOtp {
  email: string;
  otp: string;
}

export async function verifyOtp({ ...props }: IVerifyOtp) {
  try {
    return await apiPost(apiUrls.AUTH.OTP_VERIFICATION, {
      user_id: props.user_id.trim(),
      otp: props.otp,
    });
  } catch (e: any) {
    return e?.response?.data;
  }
}

export async function verifyResetPassOtp({ ...props }: IVerifyResetPassOtp) {
  try {
    return await apiPost(apiUrls.AUTH.RESET_PASSWORD_OTP_VERIFY, {
      email: props.email.trim(),
      otp: props.otp,
    });
  } catch (e: any) {
    return e?.response?.data;
  }
}
