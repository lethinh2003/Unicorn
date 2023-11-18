"use client";
import BreadcrumbBar from "@/components/generals/BreadcrumbBar";
import { LoadingContent } from "@/components/generals/LoadingBox";
import AddressForm from "@/components/profile/address/AddressForm";
import ROUTERS_PATH from "@/configs/config.routers.path";
import { TYPE_ADDRESS_FORM } from "@/configs/config.users.address";
import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
const fetchAddressById = async (addressId) => {
  try {
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/addresses/${addressId}`
    );
    return results.data.data;
  } catch (err) {
    throw err;
  }
};

export default function UpdateAddress({ params }) {
  const dispatch = useDispatch();
  const { addressId } = params;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-detail-address", addressId],
    queryFn: () => fetchAddressById(addressId),
  });
  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [isError, error]);

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
  const DATA_BREADCRUMB = [
    {
      title: "Hồ sơ",
      link: ROUTERS_PATH.PROFILE,
    },
    {
      title: "Địa chỉ",
      link: `${ROUTERS_PATH.PROFILE}/address`,
    },
    {
      title: "Chi tiết",
      link: `${ROUTERS_PATH.PROFILE}/address/${addressId}`,
    },
  ];

  return (
    <>
      <div className="redirect-title-container">
        <BreadcrumbBar data={DATA_BREADCRUMB} />
      </div>

      <div className="user-desc-container divide-y divide-gray-200 rounded-lg drop-shadow-xl">
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
