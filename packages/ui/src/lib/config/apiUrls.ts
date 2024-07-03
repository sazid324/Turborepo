import { envConfig } from "@repo/ui/src/lib/config/env";

export function getFullUrl(path: string) {
  return envConfig.NEXT_PUBLIC_BASE_BACKEND_URL.concat("/", path);
}

export const apiUrls = Object.freeze({
  AUTH: {
    USER_PROFILE: "/auth/api/profile/",
    SIGN_IN: "/auth/api/signin/",
    SIGN_UP: "/auth/api/signup/",
    OTP_CREATE: "/auth/api/otp-create/",
    OTP_VERIFICATION: "/auth/api/otp-verification/",
    REFRESH_TOKEN: "/auth/api/token/refresh/",
    TOKEN_BLACK_LIST: "/auth/api/token/blacklist/",
    RESET_PASSWORD: "/auth/api/reset-password/",
    RESET_PASSWORD_OTP_VERIFY: "/auth/api/password-reset/otp-verify/",
    RESET_PASSWORD_OTP_RESEND: "/auth/api/password-reset/otp-resend/",
    UPDATE_PASSWORD: (email: string) => `/auth/api/reset-password/${email}/`,
  },
  PROTECTED: {},
  PRIVATE: {},
  PUBLIC: {},
  FILES: {
    IMAGES: `files/images/`,
  },
});
