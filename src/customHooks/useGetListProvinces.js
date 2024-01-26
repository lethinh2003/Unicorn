"use client";
import { getListProvinces } from "@/utils/getVietNamProvince";
import { useEffect } from "react";
import { useQuery } from "react-query";
const useGetListProvinces = () => {
  const { data, error, isLoading, isError } = useQuery(
    ["get-list-provinces"],
    () => getListProvinces()
  );
  useEffect(() => {
    if (isError) {
      throw new Error(error);
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
export default useGetListProvinces;
