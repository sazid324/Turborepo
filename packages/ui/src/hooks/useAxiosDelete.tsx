"use client";

import axios, { AxiosResponse } from "axios";
import { useState } from "react";

interface ErrorResponse {
  error: string;
}

const useAxiosDelete = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async (url: string): Promise<ErrorResponse> => {
    try {
      setLoading(true);
      const response: AxiosResponse = await axios.delete(url);
      setLoading(false);
      return response.data;
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.error || "Something went wrong");
      return error.response.data;
    }
  };

  return {
    loading,
    error,
    deleteData,
  };
};

export default useAxiosDelete;
