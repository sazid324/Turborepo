import { apiUrls } from "@repo/ui/src/lib/config/apiUrls";
import { axiosErrorHandler } from "@repo/ui/src/lib/helpers/handler";
import { apiPut } from "@repo/ui/src/services/api/api";

interface IResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
  secret: string;
}

export async function updatePassword<T>({ ...props }: IResetPassword) {
  try {
    return await apiPut<any, T>(
      apiUrls.AUTH.UPDATE_PASSWORD(props.email.trim()),
      {
        password: props.password,
        confirm_password: props.confirmPassword,
        secret: props.secret,
      },
    );
  } catch (e: any) {
    axiosErrorHandler(e);
    return e;
  }
}
