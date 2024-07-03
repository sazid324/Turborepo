"use client";

import { getFullUrl } from "@repo/ui/src/lib/config/apiUrls";
import { changeQParamsInURL } from "@repo/ui/src/lib/utils/functions";
import { apiGet } from "@repo/ui/src/services/api/api";
import { AxiosResponse } from "axios";
import { useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

interface APIResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

interface APIResponseApiGet<T> {
  data: APIResponse<T>;
}

export function useAxiosSWR<T = any>(deps: string | null) {
  const { data: responseData, ...res } = useSWR<APIResponseApiGet<T>>(
    deps,
    apiGet,
  );
  const {
    data: { results = [], count = 0, next, previous },
  } = responseData || {
    data: {
      results: [],
      count: 0,
      next: null,
      previous: null,
    },
  };
  return {
    data: results,
    count,
    next: Boolean(next),
    previous: Boolean(previous),
    ...res,
  };
}

export function useAxiosSWRInfinite<T = any>(apiPath: string, offset: number) {
  const [size, setSize] = useState(offset);
  const { data: responseData, ...res } = useSWR<APIResponseApiGet<T>>(
    changeQParamsInURL(getFullUrl(apiPath), { offset: String(size) }),
    apiGet,
  );
  const {
    data: { results = [], count = 0, next, previous },
  } = responseData || {
    data: {
      results: [],
      count: 0,
      next: null,
      previous: null,
    },
  };
  return {
    data: results,
    count,
    next: Boolean(next),
    previous: Boolean(previous),
    size,
    setSize,
    ...res,
  };
}

type UseAxiosSWRInfiniteLoadingReturnType = {
  data: AxiosResponse<any, any>[] | undefined;
  mutate: any;
  size: number;
  setSize: (
    // eslint-disable-next-line no-unused-vars
    size: number | ((_size: number) => number),
  ) => Promise<AxiosResponse<any, any>[] | undefined>;
  isValidating: boolean;
};

export function useAxiosSWRInfiniteLoading(
  apiUrl: string,
  filter?: any,
): UseAxiosSWRInfiniteLoadingReturnType {
  const PAGE_SIZE = 6;

  const { data, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `${apiUrl}?limit=${PAGE_SIZE}&page=${index + 1}&filters=${filter}`,
    {
      fetcher: apiGet,
      revalidateFirstPage: false,
    },
  );
  return { data, mutate, size, setSize, isValidating };
}
