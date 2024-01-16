"use client";
import { getListDistricts } from "@/utils/getVietNamProvince";
import { useEffect } from "react";
import { useQuery } from "react-query";
const useGetListDistricts = ({ provinceCode }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["get-list-districts", provinceCode],
    () => getListDistricts({ provinceCode })
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
export default useGetListDistricts;
