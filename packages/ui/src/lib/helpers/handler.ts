import { messages } from "@repo/ui/src/lib/config/messages";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export function axiosErrorHandler(error: AxiosError | Error | undefined) {
  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_NETWORK") {
      toast.error(messages.CONNECTION_ERROR.title, {
        description: messages.CONNECTION_ERROR.details,
        position: "top-center",
      });

      return;
    }
    if (error.code === "ERR_BAD_REQUEST") {
      toast.error(messages.ERR_BAD_REQUEST.title, {
        description: messages.ERR_BAD_REQUEST.details,
        position: "top-center",
      });

      return;
    }
  }

  return error;
}
