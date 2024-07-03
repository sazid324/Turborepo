import { envConfig } from "@repo/ui/src/lib/config/env";
import CryptoJS from "crypto-js";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Sets a cookie with the provided name, value, and optional options
export function setCookie(name: string, value?: string, options?: any) {
  if (!value || value === "") {
    cookies.set(name, value);
    return;
  }
  const encryptedValue = encryptString(value);
  const others = options
    ? { ...options }
    : { expires: new Date(Date.now() + 25892000000) };

  cookies.set(name, encryptedValue, others);
}

// Get cookie by its name
export function getCookie(name: string) {
  const encryptedCookieValue = cookies.get(name);
  if (encryptedCookieValue) {
    return decryptString(encryptedCookieValue);
  }
  return "";
}

// Clears cookie by its name
export const removeCookie = (name: string) => {
  cookies.remove(name);
};

// Decodes a JWT token, returns null if an error occurs
export const parseJWTToken = (token: string) => {
  if (token && token !== "") {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }
  return null;
};

// Parses a JSON string into the specified type, returns undefined if parsing fails
export const jsonParse = <T>(str: string) => {
  try {
    const jsonValue: T = JSON.parse(str);
    return jsonValue;
  } catch {
    return undefined;
  }
};

// Encrypts a string using AES encryption
export const encryptString = (str: string) => {
  return CryptoJS.AES.encrypt(str, envConfig.PUBLIC_USERID_SECRET!).toString();
};

// Decrypts a string using AES encryption
export const decryptString = (str: string) => {
  return CryptoJS.AES.decrypt(str, envConfig.PUBLIC_USERID_SECRET!).toString(
    CryptoJS.enc.Utf8,
  );
};

// Modifies query parameters of a given URL based on provided changes
interface Params {
  [key: string]: string | number;
}

export const changeQParamsInURL = (url: string, changes: Params) => {
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  for (const [key, value] of Object.entries(changes)) {
    params.set(key, String(value));
  }
  urlObj.search = params.toString();
  return urlObj.toString();
};

// Serializes, encrypts data using AES encryption, and encodes it for URL
export const encryptDataForUrl = <T>(data: T) => {
  const serializedData = JSON.stringify(data);
  const encryptedData = encryptString(serializedData);
  const encodedData = encodeURIComponent(encryptedData);

  return encodedData;
};

// Decrypts and parses data from a URL using AES encryption
export const decryptDataOfUrl = (data: string) => {
  const decodedData = decodeURIComponent(data);
  const decryptedData = decryptString(decodedData);
  const parsedData = JSON.parse(decryptedData);

  return parsedData;
};

// Determines if a given string starts with any of the elements in the provided array
export const stringStartsWith = (
  string: string,
  array: string[] | number[],
) => {
  return array.some((item: string | number) =>
    string.startsWith(item.toString()),
  );
};

// Formats a date string to the specified format
export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error formatting date:", error);
    return dateString;
  }
};

// Changes the format of a given date string to a new format
export const changeDateFormat = (
  dateString: string,
  newFormat: string,
): string => {
  try {
    const date = new Date(dateString);
    return format(date, newFormat);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error changing date format:", error);
    return dateString;
  }
};
