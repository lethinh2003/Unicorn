"use client";
import USER_GENDERS from "@/configs/config.users.genders";
import USER_ROLES from "@/configs/config.users.roles";
import USER_STATUSES from "@/configs/config.users.statuses";
import ADMIN_MESSAGES from "@/configs/config.admin.messages";
import USER_ATTRIBUTES from "@/configs/config.users.attributes";
import { TYPE_ADMIN_USERS_FORM } from "@/configs/config.admin.users";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, useForm, setValue } from "react-hook-form";
import { useQueryClient } from "react-query";
import ErrorMessage from "@/components/generals/ErrorMessage";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import * as Yup from "yup";
import axios from "axios";

export default function UserForm({ type, userFormInformation }) {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    status,
    gender,
    role,
    birthday,
  } = userFormInformation;
  const [genderVal, setGenderVal] = useState(gender);
  const [roleVal, setRoleVal] = useState(role);
  const [statusVal, setStatusVal] = useState(status);
  const [passwordVal, setPasswordVal] = useState(password);
  const [changeDate, setChangeDate] = useState(birthday);
  const [fullNameValue, setFullNameValue] = useState(fullName);
  const [emailValue, setEmailValue] = useState(email);
  const [phoneNumberValue, setPhoneNumberValue] = useState(phoneNumber);
  const [isChangePassWord, setIsChangePassWord] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { userId } = useParams();


  useEffect(() => {
    if (userFormInformation) {
      setGenderVal(userFormInformation.gender);
      setRoleVal(userFormInformation.role);
      setStatusVal(userFormInformation.status);
      setPasswordVal(userFormInformation.password);
      setChangeDate(userFormInformation.birthday);
      setFullNameValue(userFormInformation.fullName);
      setEmailValue(userFormInformation.email);
      setPhoneNumberValue(userFormInformation.phoneNumber);
    }
  }, [userFormInformation]);

  if (newPassword) {
    setIsChangePassWord(true);
  }
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required(ADMIN_MESSAGES.NAME_MISSING)
      .trim(ADMIN_MESSAGES.NAME_INVALID)
      .strict(true),
    phoneNumber: Yup.string()
      .required(ADMIN_MESSAGES.PHONE_NUMBER_MISSING)
      .matches(/^(0|84)[0-9]{9,11}$/, ADMIN_MESSAGES.PHONE_NUMBER_INVALID)
      .trim(ADMIN_MESSAGES.PHONE_NUMBER_INVALID)
      .strict(true),
    email: Yup.string()
      .required(ADMIN_MESSAGES.EMAIL_MISSING)
      .trim(ADMIN_MESSAGES.EMAIL_INVALID)
      .email(ADMIN_MESSAGES.EMAIL_INVALID)
      .matches(/^\S*$/, ADMIN_MESSAGES.EMAIL_INVALID)
      .strict(true),
    password:
      type === TYPE_ADMIN_USERS_FORM.EDIT
        ? newPassword
          ? Yup.string()
              .trim(ADMIN_MESSAGES.PASSWORD_INVALID)
              .min(
                USER_ATTRIBUTES.PASSWORD_MIN_LENGTH,
                ADMIN_MESSAGES.PASSWORD_MIN_LENGTH
              )
              .matches(/^\S*$/, ADMIN_MESSAGES.PASSWORD_INVALID)
              .strict(true)
          : Yup.string()
        : Yup.string()
            .required(ADMIN_MESSAGES.PASSWORD_MISSING)
            .trim(ADMIN_MESSAGES.PASSWORD_INVALID)
            .min(
              USER_ATTRIBUTES.PASSWORD_MIN_LENGTH,
              ADMIN_MESSAGES.PASSWORD_MIN_LENGTH
            )
            .matches(/^\S*$/, ADMIN_MESSAGES.PASSWORD_INVALID)
            .strict(true),
    status: Yup.boolean().required(ADMIN_MESSAGES.STATUS_MISSING).strict(true),
    gender: Yup.string().required(ADMIN_MESSAGES.GENDER_MISSING).strict(true),
    birthday: Yup.string()
      .required(ADMIN_MESSAGES.BIRTHDAY_MISSING)
      .strict(true),
    role: Yup.string().required(ADMIN_MESSAGES.ROLE_MISSING).strict(true),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
    userFormInformation,
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(formOptions);

  const onSubmit = async (data) => {
    
    try {
      const {
        fullName,
        email,
        phoneNumber,
        password,
        status,
        gender,
        role,
        birthday,
      } = data;

      const updatedPassword = password
        ? password
        : userFormInformation.password;
      let result;
      if (type === TYPE_ADMIN_USERS_FORM.ADD) {
        result = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/users`,
          {
            email: email,
            password: password,
            birthday: birthday,
            gender: gender,
            name: fullName,
            status: status,
            role: role,
            phone_number: phoneNumber,
          }
        );
        reset();
      } else if (type === TYPE_ADMIN_USERS_FORM.EDIT) {
        result = await axios.post(
          `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/admins/users/update`,
          {
            userId: userId,
            email: email,
            password: updatedPassword,
            birthday: birthday,
            gender: gender,
            name: fullName,
            status: status,
            role: role,
            phone_number: phoneNumber,
          }
        );
      }
      toast.success(result?.data?.message);

      console.log(data);
    } catch (err) {
      console.log(data);
      toast.error(`${err.response?.data?.message}`);
    } finally {
        
    }
  };


  return (
    <>
      <div className="admin-header-title">
        <h1 className="admin-header-title-text">
          {type === TYPE_ADMIN_USERS_FORM.EDIT
            ? "Chỉnh sửa thông tin tài khoản"
            : "Thêm tài khoản"}
        </h1>
      </div>
      <div className="admin-user-add">
        <form onSubmit={handleSubmit(onSubmit)} className="admin-user-add-form">
          <div className="admin-users-add-basicInformation">
            <Stack
              className="input-col"
              sx={{
                textAlign: "start",
                fontSize: "2.6rem",
                fontWeight: "400",
                width: "100%",
                marginBottom: "2rem",
              }}
            >
              <div className="admin-users-add-title text-[1.5rem]">
                Họ và tên
              </div>
              <Box
                sx={{
                  width: "100%",
                }}
              >
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue={fullNameValue}
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
              </Box>
            </Stack>
            <div className="admin-users-add-title text-[1.5rem]">Email</div>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Controller
                name="email"
                control={control}
                defaultValue={emailValue}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    fullWidth
                    id="fullWidth"
                    {...(type === TYPE_ADMIN_USERS_FORM.EDIT
                      ? { disabled: true }
                      : {})}
                  />
                )}
              />
              <ErrorMessage>
                {errors.email ? errors.email.message : ""}
              </ErrorMessage>
            </Box>
            <div className="admin-users-add-title text-[1.5rem]">
              Số điện thoại
            </div>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue={phoneNumberValue}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    inputRef={ref}
                    fullWidth
                    id="fullWidth"
                  />
                )}
              />
              <ErrorMessage>
                {errors.phoneNumber ? errors.phoneNumber.message : ""}
              </ErrorMessage>
            </Box>
          </div>

          <div className="admin-users-add-other">
            <Stack
              direction="row"
              display="flex"
              gap="10.1rem"
              marginBottom="2rem"
              marginTop="2rem"
            >
              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight: "400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  Mật khẩu
                </div>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Controller
                    name="password"
                    control={control}
                    defaultValue={passwordVal}
                    render={({ field: { ref, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        fullWidth
                        id="fullWidth"
                      />
                    )}
                  />
                  <ErrorMessage>
                    {errors.password ? errors.password.message : ""}
                  </ErrorMessage>
                </Box>
              </Stack>

              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight: "400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  Trạng thái
                </div>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={status}
                    render={({ field: { ref, ...field } }) => (
                      <FormControl fullWidth>
                        <Select
                          {...field}
                          inputRef={ref}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={statusVal}
                          onChange={(e) => {
                            const selectedStatus = e.target.value === "true";
                            setStatusVal(e.target.value);
                            field.onChange(selectedStatus);
                          }}
                        >
                          {Object.entries(USER_STATUSES).map(([key, value]) => (
                            <MenuItem key={value} value={String(value)}>
                              {value ? "ACTIVE" : "INACTIVE"}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <ErrorMessage>
                    {errors.status ? errors.status.message : ""}
                  </ErrorMessage>
                </Box>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              display="flex"
              gap="10.1rem"
              marginBottom="2rem"
            >
              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight: "400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  Giới tính
                </div>
                <Box>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue={gender}
                    render={({ field: { ref, ...field } }) => (
                      <FormControl fullWidth>
                        <Select
                          {...field}
                          inputRef={ref}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={genderVal}
                          onChange={(e) => {
                            setGenderVal(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        >
                          {Object.entries(USER_GENDERS).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                              {key}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <ErrorMessage>
                    {errors.gender ? errors.gender.message : ""}
                  </ErrorMessage>
                </Box>
              </Stack>

              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight: "400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  Vai trò
                </div>
                <Box>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue={role}
                    render={({ field: { ref, ...field } }) => (
                      <FormControl fullWidth>
                        <Select
                          {...field}
                          inputRef={ref}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={roleVal}
                          onChange={(e) => {
                            setRoleVal(e.target.value);
                            field.onChange(e.target.value);
                          }}
                        >
                          {Object.entries(USER_ROLES).map(([key, value]) => (
                            <MenuItem key={key} value={value}>
                              {key}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <ErrorMessage>
                    {errors.role ? errors.role.message : ""}
                  </ErrorMessage>
                </Box>
              </Stack>
              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight: "400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  Ngày sinh
                </div>
                <Box>
                  <Controller
                    name="birthday"
                    control={control}
                    defaultValue={birthday}
                    render={({ field: { ref, ...field } }) => (
                      <FormControl sx={{ width: "100%" }}>
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          key={"birthday"}
                        >
                          <DatePicker
                            {...field}
                            inputRef={ref}
                            value={dayjs(changeDate)}
                            onChange={(date) => {
                              const selectedDate = date.format("YYYY-MM-DD");
                              setChangeDate(selectedDate);
                              field.onChange(selectedDate);
                            }}
                          />
                        </LocalizationProvider>
                      </FormControl>
                    )}
                  />
                  <ErrorMessage>
                    {errors.birthday ? errors.birthday.message : ""}
                  </ErrorMessage>
                </Box>
              </Stack>
            </Stack>

            <Stack
              spacing="4.9rem"
              direction="row"
              marginTop="7rem"
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                sx={{
                  border: "1px solid #ACA3A3",
                  background: " #FFF",
                  color: "#000",
                  fontsize: "2rem",
                  fontstyle: "normal",
                  fontweight: "600",
                  lineheight: "normal",
                }}
                onClick={() => handleCancel()}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                type="submit"
                onClick={() => handleSubmit(onSubmit)}
              >
                Xác nhận
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </>
  );
}
