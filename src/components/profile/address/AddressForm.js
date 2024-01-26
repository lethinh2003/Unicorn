"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import { TYPE_ADDRESS_FORM } from "@/configs/config.users.address";
import USER_MESSAGES from "@/configs/config.users.messages";
import useGetListDistricts from "@/customHooks/useGetListDistricts";
import useGetListProvinces from "@/customHooks/useGetListProvinces";
import useGetListWards from "@/customHooks/useGetListWards";
import { setIsLoading } from "@/redux/actions/loadingBox";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export default function AddressForm({
  addressInformation,
  type,
  setOpenListAvailableAddress,
}) {
  const {
    fullName,
    phoneNumber,
    detailAddrress,
    provine: provineData,
    district: districtData,
    ward: wardData,
    default: isDefault,
    addressId,
  } = addressInformation;

  const [provine, setProvine] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required(USER_MESSAGES.NAME_MISSING)
      .trim(USER_MESSAGES.NAME_INVALID)
      .strict(true),
    detailAddress: Yup.string()
      .required(USER_MESSAGES.ADDRESS_MISSING)
      .strict(true),
    phoneNumber: Yup.string()
      .required(USER_MESSAGES.PHONE_NUMBER_MISSING)
      .matches(/^(0|84)[0-9]{9,11}$/, USER_MESSAGES.PHONE_NUMBER_INVALID)
      .trim(USER_MESSAGES.PHONE_NUMBER_INVALID)
      .strict(true),
    provine: Yup.string().required(USER_MESSAGES.PROVINE_MISSING).strict(true),
    district: Yup.string()
      .required(USER_MESSAGES.DISTRICT_MISSING)
      .strict(true),
    ward: Yup.string().required(USER_MESSAGES.WARD_MISSING).strict(true),
    isDefault: Yup.boolean(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm(formOptions);

  const { data: listProvinces } = useGetListProvinces();

  const { data: listDistricts } = useGetListDistricts({
    provinceCode: provine?.code,
  });

  const { data: listWards } = useGetListWards({
    districtCode: district?.code,
  });

  const watchProvince = watch("provine", provineData);
  const watchDistrict = watch("district", districtData);
  const watchWard = watch("ward", wardData);

  useEffect(() => {
    if (watchProvince !== provineData) {
      setValue("district", "");
      setDistrict(null);
      setValue("ward", "");
      setWard(null);
    }
  }, [watchProvince]);
  useEffect(() => {
    if (watchDistrict !== districtData) {
      setValue("ward", "");
      setWard(null);
    }
  }, [watchDistrict]);

  useEffect(() => {
    if (listProvinces && watchProvince) {
      const findProvince = listProvinces.find(
        (item) => item.name === watchProvince
      );
      setProvine(findProvince);
    }
  }, [listProvinces, watchProvince]);
  useEffect(() => {
    if (listDistricts && watchDistrict) {
      const findDistrict = listDistricts.find(
        (item) => item.name === watchDistrict
      );
      setDistrict(findDistrict);
    }
  }, [listDistricts, watchDistrict]);
  useEffect(() => {
    if (listWards && watchWard) {
      const findWard = listWards.find((item) => item.name === watchWard);
      setWard(findWard);
    }
  }, [listWards, watchWard]);

  const onSubmit = async (data) => {
    try {
      dispatch(setIsLoading(true));
      const {
        fullName,
        detailAddress,
        phoneNumber,
        provine,
        district,
        ward,
        isDefault,
      } = data;
      let result;

      if (type === TYPE_ADDRESS_FORM.EDIT) {
        result = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/addresses/update`,
          {
            fullName,
            detailAddress,
            phoneNumber,
            provine,
            district,
            ward,
            isDefault,
            addressId,
          }
        );

        // revalidate
        queryClient.invalidateQueries({
          queryKey: ["get-detail-address", addressId],
        });
      } else if (type === TYPE_ADDRESS_FORM.ADD) {
        result = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users/addresses`,
          {
            fullName,
            detailAddress,
            phoneNumber,
            provine,
            district,
            ward,
            isDefault,
          }
        );
        reset();
        if (setOpenListAvailableAddress) {
          setOpenListAvailableAddress();
        }
      }
      await queryClient.refetchQueries({
        queryKey: ["get-list-addresses-user"],
      });
      toast.success(result?.data?.message);
    } catch (err) {
      toast.error(`${err.response?.data?.message}`);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <form
          className="formData"
          style={{ width: "100%" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem] "
                style={{ width: "15rem" }}
              >
                Họ và tên:
              </span>
              <Stack sx={{ width: "100%" }}>
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue={fullName}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        inputRef={ref}
                        {...field}
                        error={!!errors.fullName}
                        id="fullName"
                      />
                    </FormControl>
                  )}
                />
                <ErrorMessage>
                  {errors.fullName ? errors.fullName.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem] "
                style={{ width: "15rem" }}
              >
                Số điện thoại:
              </span>
              <Stack sx={{ width: "100%" }}>
                <Controller
                  defaultValue={phoneNumber}
                  name="phoneNumber"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        inputRef={ref}
                        {...field}
                        error={!!errors.phoneNumber}
                        id="PhoneNumber"
                      />
                    </FormControl>
                  )}
                />
                <ErrorMessage>
                  {errors.phoneNumber ? errors.phoneNumber.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem] "
                style={{ width: "15rem" }}
              >
                Địa chỉ:
              </span>
              <Stack sx={{ width: "100%" }}>
                <Controller
                  defaultValue={detailAddrress}
                  name="detailAddress"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <TextField
                        inputRef={ref}
                        {...field}
                        error={!!errors.detailAddress}
                        id="detailAddress"
                      />
                    </FormControl>
                  )}
                />
                <ErrorMessage>
                  {errors.detailAddress ? errors.detailAddress.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem] "
                style={{ width: "15rem" }}
              >
                Tỉnh/thành:
              </span>
              <Stack sx={{ width: "100%" }}>
                <Controller
                  defaultValue={provineData}
                  name="provine"
                  control={control}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        key={"provine"}
                        inputRef={ref}
                        {...field}
                        error={!!errors.provine}
                      >
                        {listProvinces?.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />

                <ErrorMessage>
                  {errors.provine ? errors.provine.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem] "
                style={{ width: "15rem" }}
              >
                Quận/huyện:
              </span>
              <Stack sx={{ width: "100%" }}>
                <Controller
                  name="district"
                  control={control}
                  defaultValue={districtData}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        key={"district"}
                        inputRef={ref}
                        {...field}
                        error={!!errors.district}
                      >
                        {listDistricts?.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />

                <ErrorMessage>
                  {errors.district ? errors.district.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                display: "flex",
                justifyConent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <span
                className="user-title-item min-w-[15rem] max-w-[15rem] "
                style={{ width: "15rem" }}
              >
                Phường/xã:
              </span>
              <Stack sx={{ width: "100%" }}>
                <Controller
                  name="ward"
                  control={control}
                  defaultValue={wardData}
                  render={({ field: { ref, ...field } }) => (
                    <FormControl sx={{ width: "100%" }}>
                      <Select
                        key={"ward"}
                        inputRef={ref}
                        {...field}
                        error={!!errors.ward}
                      >
                        {listWards?.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
                <ErrorMessage>
                  {errors.ward ? errors.ward.message : ""}
                </ErrorMessage>
              </Stack>
            </Stack>
          </Stack>

          <Controller
            defaultValue={isDefault}
            name="isDefault"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <FormControlLabel
                {...field}
                checked={field.value}
                control={<Checkbox color="success" />}
                label="Địa chỉ mặc định"
              />
            )}
          />

          <Button
            type="submit"
            onClick={() => handleSubmit(onSubmit)}
            sx={{ width: "100%", margin: "2rem 0", padding: "1rem 0" }}
          >
            XÁC NHẬN ĐỊA CHỈ
          </Button>
        </form>
      </div>
    </>
  );
}
