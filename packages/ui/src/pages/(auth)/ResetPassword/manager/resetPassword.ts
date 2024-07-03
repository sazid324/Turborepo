import { apiUrls } from "@repo/ui/src/lib/config/apiUrls";
import { axiosErrorHandler } from "@repo/ui/src/lib/helpers/handler";
import { apiPost } from "@repo/ui/src/services/api/api";

interface INewPassword {
  email: string;
}

export async function newPassword({ ...props }: INewPassword) {
  try {
    return await apiPost<any>(apiUrls.AUTH.RESET_PASSWORD, {
      email: props.email,
    });
  } catch (e: any) {
    axiosErrorHandler(e);
    return e;
  }
}
