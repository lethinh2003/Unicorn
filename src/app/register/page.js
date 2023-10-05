"use client";
import { Container, TextField, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Controller, useForm } from "react-hook-form";
import LoadingBox from "@/components/generals/LoadingBox";
import USER_MESSAGES from "@/configs/config.users.messages";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const minLength = 8;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(USER_MESSAGES.EMAIL_MISSING)
      .email(USER_MESSAGES.EMAIL_INVALID)
      .matches(/^\S*$/, USER_MESSAGES.EMAIL_INVALID)
      .trim(USER_MESSAGES.EMAIL_INVALID)
      .strict(true),
    password: Yup.string()
      .required(USER_MESSAGES.PASSWORD_MISSING)
      .min(minLength, USER_MESSAGES.PASSWORD_MIN_LENGTH)
      .matches(/^\S*$/, USER_MESSAGES.PASSWORD_INVALID)
      .trim()
      .strict(true),
    name: Yup.string().required(USER_MESSAGES.NAME_MISSING).trim().strict(true),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], USER_MESSAGES.PASSWORD_CONFIRM)
      .required(USER_MESSAGES.CONFIRM_PASSWORD_MISSING)
      .trim()
      .strict(true),
  });
    const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/users`,
        {
          email: data.email,
          password: data.password,
          name: data.name,
        }
      );
      
      toast.success(result.data.message);
      reset();
    } catch (err) {
      if (err && err.response) {
        toast.error(
          `Có lỗi xảy ra khi đổi mật khẩu. Message: ${err.response.data.message}`
        );
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Container>
        <LoadingBox isLoading={isLoading} />
        <div className="register-left-panel"></div>
        <div className="register-right-panel">
          <div className="register-right-panel-header">
            <span className="register-title">Create Account</span>
            <GoogleIcon />
            <span className="register-solution">
              or use your email for registration:
            </span>
          </div>
          <div className="register-right-panel-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                
                render={({ field }) => (
                  <TextField
                    label="Họ tên"
                    {...field}
                    error={!!errors.name} // Hiển thị lỗi nếu có
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Email"
                    {...field}
                    error={!!errors.email} // Hiển thị lỗi nếu có
                    helperText={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Mật khẩu"
                    type="password"
                    {...field}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    label="Xác nhận lại mật khẩu"
                    type="password"
                    {...field}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
              <Button type="submit">Register</Button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RegisterPage;
