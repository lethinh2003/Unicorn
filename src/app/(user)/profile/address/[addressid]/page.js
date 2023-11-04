'use client'
import axios from "axios";
import Address from '../addressComponent'
import { useQuery } from "react-query";
import LoadingBox from "@/components/generals/LoadingBox";

const fetchAddressById = async (addressid) => {
    try {
        const results = await axios.get(`${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/addresses/${addressid}`)
        return results.data.data
    }
    catch (err) {
        throw err
    }
}

export default function UpdateAddress({ params }) {
    const { data, isLoading } = useQuery({
        queryKey: ['addressid', params.addressid],
        queryFn: () => fetchAddressById(params.addressid),
        cacheTime: 0,
    })

const address =
{
    fullName: data?.full_name,
    phoneNumber: data?.phone_number,
    detailAddrress: data?.detail_address,
    provine: data?.provine,
    district: data?.district,
    ward: data?.ward,
    default: data?.default,
    addressid: data?._id,
}

return (
    <>
        {isLoading &&
            <>
                <LoadingBox isLoading={isLoading} />
                <Address />
            </>
        }
        {!isLoading && <Address props={address} endPoint={`/api/v1/users/addresses/update`} />}
    </>
);
}
