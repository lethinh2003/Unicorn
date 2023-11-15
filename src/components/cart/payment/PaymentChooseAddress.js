"use client";
import LoadMoreButton from "@/components/button/LoadMoreButton";
import { LoadingContent } from "@/components/generals/LoadingBox";
import AddressItem from "@/components/profile/address/AddressItem";
import useGetListUserAddresses from "@/customHooks/useGetListUserAddresses";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import PaymentChooseAddressButtons from "./PaymentChooseAddressButtons";

function PaymentChooseAddress() {
  const {
    data: dataAddresses,
    isLoading: isLoadingQuery,
    isFetching,
    isError: isErrorQuery,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetListUserAddresses();
  const [addressChoose, setAddressChoose] = useState(null);

  useEffect(() => {
    if (dataAddresses) {
      const findAddressDefault = dataAddresses.find(
        (item) => item.default === true
      );
      setAddressChoose(findAddressDefault);
    }
  }, [dataAddresses]);

  return (
    <Stack>
      {isLoadingQuery && !isFetchingNextPage && <LoadingContent />}
      {dataAddresses?.map((address) => (
        <AddressItem
          address={address}
          key={address._id}
          buttons={
            <PaymentChooseAddressButtons
              address={address}
              addressChoose={addressChoose}
              setAddressChoose={setAddressChoose}
            />
          }
        />
      ))}
      {hasNextPage && (
        <LoadMoreButton
          isLoading={isFetchingNextPage}
          onClick={fetchNextPage}
        />
      )}
    </Stack>
  );
}

export default PaymentChooseAddress;
