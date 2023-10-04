'use client'
import "../globals.scss";
import { Container, Button, TextField } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material/";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react'

function Login({ children }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Container>
            <div className="login-container">
                <div className="login-left-panel">
                    <div className="login-left-panel-header">
                        <span className="login-title">
                            Sign in to Shop
                        </span>
                        <Link href='/'>
                            <GoogleIcon></GoogleIcon>
                        </Link>
                        <span className="login-solution">or use email account</span>
                    </div>
                    <div className="login-left-panel-body">
                        <FormControl sx={{
                            margin: "1.4rem 0",
                            backgroundColor: "#EAEAEA"
                        }} variant="outlined"
                        >
                            <OutlinedInput
                                placeholder="Example@gamil.com"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <EmailOutlinedIcon sx={{
                                            fontSize: "3rem"
                                        }} />
                                    </InputAdornment>
                                }
                                id="Email"
                                type="text"
                            />
                        </FormControl>

                        <FormControl sx={{
                            margin: "1.4rem 0",
                            backgroundColor: "#EAEAEA"
                        }} variant="outlined">
                            <OutlinedInput
                                placeholder="Password"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon sx={{
                                            fontSize: "3rem"
                                        }} />
                                    </InputAdornment>
                                }
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }

                            />
                        </FormControl>
                        <a style={{
                            borderBottom: "0.1rem solid #000",
                            margin: "3rem 0",
                            display: "inline-block",
                            padding: "0 0.4rem",
                            width: "45%",
                            position: "relative",
                            transform: "translateX(-50%)",
                            left: "50%"
                        }}>Forgot your password?</a>
                        <Button sx={{
                            position: "relative",
                            transform: "translateX(-50%)",
                            left: "50%",
                            width: "55%",
                            padding: " 1.4rem 4rem",
                            borderRadius: "2.5rem"
                        }} className="login-button">Login</Button>



                    </div>
                </div>
                <div className="login-right-panel">
                    <span>Hello, Friend!</span>
                    <p>Enter your personal details and start journey with us</p>
                    <Button
                        sx={{
                            width: "55%",
                            padding: " 2rem 12rem",
                            borderRadius: "2.5rem",
                            backgroundColor: "transparent",
                            fontWeight: "300",
                            border: "0.1rem #fff solid",
                            '&:hover': {
                                backgroundColor: "transparent",
                                
                            },
                        }}

                        className="Register-nav-button">Register</Button>
                </div>
            </div>
        </Container>

    )
};
export default Login;