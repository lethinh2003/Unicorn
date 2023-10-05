"use client";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { Controller, useForm } from "react-hook-form";
import LoadingBox from "@/components/generals/LoadingBox";
import USER_MESSAGES from "@/configs/config.users.messages";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  Button,
  Container
} from "@mui/material/";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const minLength = 8;
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
                      helperText={errors.name?.message}
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
                      helperText={errors.email?.message}
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
                      helperText={errors.password?.message}
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
                      helperText={errors.confirmPassword?.message}
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
              <Button type="submit"
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
