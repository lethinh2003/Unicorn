"use client";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorMessage from "@/components/generals/ErrorMessage";
import USER_MESSAGES from "@/configs/config.users.messages";
import USER_ATTRIBUTES from '@/configs/config.users.attributes';
import LoadingBox from "@/components/generals/LoadingBox";
import Visibility from "@mui/icons-material/Visibility";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import axios from "axios";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  Button,
  Container,
} from "@mui/material/";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(USER_MESSAGES.EMAIL_MISSING)
      .email(USER_MESSAGES.EMAIL_INVALID)
      .matches(/^\S*$/, USER_MESSAGES.EMAIL_INVALID)
      .trim(USER_MESSAGES.EMAIL_INVALID)
      .strict(true),
    password: Yup.string()
      .required(USER_MESSAGES.PASSWORD_MISSING)
      .min(USER_ATTRIBUTES.PASSWORD_MIN_LENGTH, USER_MESSAGES.PASSWORD_MIN_LENGTH)
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
        toast.error(`Message: ${err.response.data.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginNav = () => {
    router.push('/login');
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <Container>
      <LoadingBox isLoading={isLoading} />
      <div className="register-container">
        <div className="register-left-panel">
          <span>Hello, Friend!</span>
          <p>Enter your personal details and start journey with us</p>
          <Button
            onClick={handleLoginNav}
            sx={{
              width: "55%",
              padding: " 2rem 12rem",
              borderRadius: "2.5rem",
              backgroundColor: "transparent",
              fontWeight: "300",
              border: "0.1rem #fff solid",
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            className="Login-nav-button"
          >
            Login
          </Button>
        </div>
        <div className="register-right-panel">
          <div className="register-right-panel-header">
            <span className="register-title">Create Account</span>
            <Link href="/">
              <GoogleIcon />
            </Link>
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
                  <FormControl
                    sx={{
                      width: "100%",
                      margin: "1.4rem 0",
                      backgroundColor: "#EAEAEA",
                    }}>
                    <InputLabel htmlFor="Name" >Name</InputLabel>
                    <OutlinedInput
                      label="Name"
                      {...field}
                      error={!!errors.name}
                      id="Name"
                      endAdornment={
                        <InputAdornment position="end">
                          <PersonOutlineOutlinedIcon
                            sx={{
                              fontSize: "3rem",
                            }}
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.name ? errors.name.message : ""}
              </ErrorMessage>

              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    sx={{
                      width: "100%",
                      margin: "1.4rem 0",
                      backgroundColor: "#EAEAEA",
                    }}>
                    <InputLabel htmlFor="Email" >Email</InputLabel>
                    <OutlinedInput
                      label="Email"
                      id="Email"
                      {...field}
                      error={!!errors.email} // Hiển thị lỗi nếu có
                      endAdornment={
                        <InputAdornment position="end">
                          <EmailOutlinedIcon
                            sx={{
                              fontSize: "3rem",
                            }}
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.email ? errors.email.message : ""}
              </ErrorMessage>

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    sx={{
                      width: "100%",
                      margin: "1.4rem 0",
                      backgroundColor: "#EAEAEA",
                    }}
                  >
                    <InputLabel htmlFor="Password" >Password</InputLabel>
                    <OutlinedInput
                      label="Password"
                      id="Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      error={!!errors.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.password ? errors.password.message : ""}
              </ErrorMessage>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FormControl
                    sx={{
                      width: "100%",
                      margin: "1.4rem 0",
                      backgroundColor: "#EAEAEA",
                    }}>
                    <InputLabel htmlFor="ConfirmPassword" >Confirm Password</InputLabel>
                    <OutlinedInput
                      label="ConfirmPassword"
                      id="ConfirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      error={!!errors.confirmPassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                )}
              />
              <ErrorMessage>
                {errors.confirmPassword ? errors.confirmPassword.message : ""}
              </ErrorMessage>
              <Button type="submit"
                onClick={handleSubmit(onSubmit)}
                sx={{
                  position: "relative",
                  transform: "translateX(50)",
                  width: "55%",
                  padding: "1.4rem 4rem",
                  borderRadius: "2.5rem",
                  boxShadow: "0.1rem 0.1rem 0.1rem 0 #333",
                  marginTop: "1rem"
                }}
              >Register</Button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default RegisterPage;
