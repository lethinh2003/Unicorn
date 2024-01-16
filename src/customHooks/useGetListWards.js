"use client";
import { getListWards } from "@/utils/getVietNamProvince";
import { useEffect } from "react";
import { useQuery } from "react-query";
const useGetListWards = ({ districtCode }) => {
  const { data, error, isLoading, isError } = useQuery(
    ["get-list-wards", districtCode],
    () => getListWards({ districtCode })
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
export default useGetListWards;
