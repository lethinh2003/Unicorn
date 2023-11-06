"use client";
import ErrorMessage from "@/components/generals/ErrorMessage";
import LoadingBox from "@/components/generals/LoadingBox";
import ROUTERS_PATH from "@/configs/config.routers.path";
import USER_ATTRIBUTES from "@/configs/config.users.attributes";
import USER_MESSAGES from "@/configs/config.users.messages";
import useAuth from "@/customHooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material/";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
function Login() {
  const { data: session, status } = useSession();

  const { isAuthenticated } = useAuth();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If user is authenticated then redirect to home page
    if (isAuthenticated) {
      router.push(ROUTERS_PATH.HOME_PAGE);
    }
  }, [isAuthenticated]);

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(USER_MESSAGES.EMAIL_MISSING)
      .trim(USER_MESSAGES.EMAIL_INVALID)
      .email(USER_MESSAGES.EMAIL_INVALID)
      .matches(/^\S*$/, USER_MESSAGES.EMAIL_INVALID)
      .strict(true),
    password: Yup.string()
      .required(USER_MESSAGES.PASSWORD_MISSING)
      .trim(USER_MESSAGES.PASSWORD_INVALID)
      .min(
        USER_ATTRIBUTES.PASSWORD_MIN_LENGTH,
        USER_MESSAGES.PASSWORD_MIN_LENGTH
      )
      .matches(/^\S*$/, USER_MESSAGES.PASSWORD_INVALID)
      .strict(true),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm(formOptions);

  const onSubmitLogin = async (data) => {
    try {
      if (status === "authenticated") {
        throw new Error(USER_MESSAGES.USER_AUTHENTICATED);
      }
      setIsLoading(true);
      const { email, password } = data;
      const loginAccount = await signIn("login", {
        email,
        password,
        redirect: false,
      });
      setIsLoading(false);
      if (loginAccount?.status !== 200) {
        throw new Error(loginAccount?.error);
      }
      router.push(ROUTERS_PATH.HOME_PAGE);
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.message);
    }
  };
  const handleRegisterNav = () => {
    router.push(ROUTERS_PATH.SIGN_UP);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <LoadingBox isLoading={isLoading} />
      <div className="login-container">
        <div className="login-left-panel">
          <div className="login-left-panel-header">
            <span className="login-title">Sign in to Shop</span>
            <Link href="/">
              <GoogleIcon></GoogleIcon>
            </Link>
            <span className="login-solution">or use email account</span>
          </div>
          <form
            className="login-left-panel-body"
            onSubmit={handleSubmit(onSubmitLogin)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormControl
                  sx={{
                    margin: "1.4rem 0",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  <InputLabel htmlFor="Email">Email</InputLabel>
                  <OutlinedInput
                    error={errors.email ? true : false}
                    label="Email"
                    endAdornment={
                      <InputAdornment position="end">
                        <EmailOutlinedIcon
                          sx={{
                            fontSize: "3rem",
                          }}
                        />
                      </InputAdornment>
                    }
                    id="Email"
                    type="text"
                    inputRef={ref}
                    {...field}
                  />
                </FormControl>
              )}
              defaultValue=""
            />
            <ErrorMessage>
              {errors.email ? errors.email.message : ""}
            </ErrorMessage>

            <Controller
              name="password"
              control={control}
              render={({ field: { ref, ...field } }) => (
                <FormControl
                  sx={{
                    margin: "1.4rem 0",
                    backgroundColor: "#EAEAEA",
                  }}
                  variant="outlined"
                >
                  <OutlinedInput
                    error={errors.password ? true : false}
                    placeholder="Password"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlinedIcon
                          sx={{
                            fontSize: "3rem",
                          }}
                        />
                      </InputAdornment>
                    }
                    id="password"
                    type={showPassword ? "text" : "password"}
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
                    inputRef={ref}
                    {...field}
                  />
                </FormControl>
              )}
              defaultValue=""
            />
            <ErrorMessage>
              {errors.password ? errors.password.message : ""}
            </ErrorMessage>

            <Link
              href={ROUTERS_PATH.FORGOT_PASSWORD}
              style={{
                borderBottom: "0.1rem solid #000",
                margin: "3rem 0",
                display: "inline-block",
                padding: "0 0.4rem",
                width: "50%",
                position: "relative",
                transform: "translateX(-50%)",
                left: "50%",
              }}
            >
              Forgot your password?
            </Link>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmitLogin)}
              sx={{
                position: "relative",
                transform: "translateX(-50%)",
                left: "50%",
                width: "55%",
                padding: " 1.4rem 4rem",
                borderRadius: "2.5rem",
              }}
              className="login-button"
            >
              Login
            </Button>
          </form>
        </div>
        <div className="login-right-panel">
          <span>Hello, Friend!</span>
          <p>Enter your personal details and start journey with us</p>
          <Button
            onClick={handleRegisterNav}
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
            className="Register-nav-button"
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
}
export default Login;
