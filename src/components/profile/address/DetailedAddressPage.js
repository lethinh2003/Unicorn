"use client";
import { LoadingContent } from "@/components/generals/LoadingBox";
import AddressForm from "@/components/profile/address/AddressForm";
import { TYPE_ADDRESS_FORM } from "@/configs/config.users.address";
import useGetDetailedAddress from "@/customHooks/useGetDetailedAddress";

export default function DetailedAddressPage({ addressId }) {
  const { data, isLoading, isError, error } = useGetDetailedAddress({
    addressId,
  });

  const addressInformation = {
    fullName: data?.full_name,
    phoneNumber: data?.phone_number,
    detailAddrress: data?.detail_address,
    provine: data?.provine,
    district: data?.district,
    ward: data?.ward,
    default: data?.default,
    addressId: data?._id,
  };

  return (
    <>
      <div className="user-desc-container divide-y divide-gray-200 rounded-lg shadow-xl">
        <div className="user-desc-header">
          <h2 className="user-desc-text">Chi tiết địa chỉ</h2>
        </div>
        <div className="user-desc-body ">
          {isLoading && <LoadingContent />}

          {!isLoading && (
            <>
              <AddressForm
                type={TYPE_ADDRESS_FORM.EDIT}
                addressInformation={addressInformation}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
