import { apiUrls } from "@repo/ui/src/lib/config/apiUrls";
import { apiPost } from "@repo/ui/src/services/api/api";

interface IResendOtp {
  user_id: string;
}

interface IResendPassResendOtp {
  user_id: string;
}

export async function resendOtp({ ...props }: IResendOtp) {
  try {
    return await apiPost(apiUrls.AUTH.OTP_CREATE, {
      user_id: props.user_id.trim(),
    });
  } catch (e: any) {
    return e?.response?.data;
  }
}

export async function resendPassResendOtp({ ...props }: IResendPassResendOtp) {
  try {
    return await apiPost(apiUrls.AUTH.RESET_PASSWORD_OTP_RESEND, {
      user_id: props.user_id.trim(),
    });
  } catch (e: any) {
    return e?.response?.data;
  }
}
