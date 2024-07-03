"use client";

import { apiGet } from "@repo/ui/src/services/api/api";
import { useEffect, useState } from "react";

function useDataFetch<T>(url: string, config = {}) {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiGet(url, config);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, [url]);

  const refetch = () => {
    fetchData().then();
  };

  return { data, error, isLoading, refetch };
}

export default useDataFetch;
