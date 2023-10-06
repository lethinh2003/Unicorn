"use client";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorMessage from "@/components/generals/ErrorMessage";
import USER_MESSAGES from "@/configs/config.users.messages";
import LoadingBox from "@/components/generals/LoadingBox";
import Visibility from "@mui/icons-material/Visibility";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import * as Yup from "yup";
import {
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    Button,
    Container
} from "@mui/material/";

function ForgotPassword() {
    const { data: session, status } = useSession(); // Next Auth

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        console.log(session); // Check user is authenticated?
    }, [session]);

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
            .min(8, USER_MESSAGES.PASSWORD_MIN_LENGTH)
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
            router.push("/");
        } catch (err) {
            setIsLoading(false);
            console.log(err);
            toast.error(err?.message);
        }
    };
    const handleRegisterNav = () => {
        router.push('/register');
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Container>
            <LoadingBox isLoading={isLoading} />
            <div className="forgot-password-container">
                <div className="forgot-password-panel">
                    <div className="forgot-password-panel-header">
                        <span className="forgot-password-title">Forgot Password</span>
                        <span className="forgot-password-solution">Enter email to retrieve your password</span>
                    </div>
                    <form
                        className="forgot-password-panel-body"
                        onSubmit={handleSubmit(onSubmitLogin)}
                    >

                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { ref, ...field } }) => (
                                <FormControl sx={{
                                    margin: "1.4rem 0",
                                    backgroundColor: "#EAEAEA",
                                }}>
                                    <InputLabel htmlFor="Email" >Email</InputLabel>
                                    <OutlinedInput
                                      sx={{padding: "0"}}
                                        error={errors.email ? true : false}
                                        label="Email"
                                        endAdornment={
                                          <InputAdornment 
                                          position="end">
                                              <Button
                                              sx={{
                                                padding: "1.2rem"
                                              }}
                                                  aria-label="toggle password visibility"
                                                  // onClick={handleClickShowPassword}
                                                  edge="end"
                                              >
                                                  Send OTP
                                              </Button>
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
                            name="forgot-password-otp"
                            control={control}
                            render={({ field: { ref, ...field } }) => (
                                <FormControl sx={{
                                    margin: "1.4rem 0",
                                    backgroundColor: "#EAEAEA",
                                }}>
                                    <InputLabel htmlFor="forgot-password-otp">OTP</InputLabel>
                                    <OutlinedInput
                                        error={errors.password ? true : false}
                                        label="OTP"
                                        id="forgot-password-otp"
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
                        
                        <Button
                            type="submit"
                            onClick={handleSubmit(onSubmitLogin)}
                            sx={{
                              marginTop: "1.2rem",
                                padding: "1.4rem 4rem",
                                boxShadow: "0.1rem 0.1rem 0.1rem 0 #333"
                            }}
                            >
                            Continue
                        </Button>
                        <Link
                            style={{
                                borderBottom: "0.1rem solid #000",
                                margin: "3rem 0",
                                display: "inline-block",
                                padding: "0 0.4rem",
                                width: "55%",
                                position: "relative",
                                transform: "translateX(-50%)",
                                left: "50%",
                                cursor: "pointer"
                            }}
                        >
                            Do not have account? Sign up
                        </Link>
                    </form>
                </div>
               
            </div>
        </Container>
    );
}
export default ForgotPassword;