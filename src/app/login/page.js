import "../globals.scss";
import { Container, TextField, Button } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import Link from "next/link";
 function Login({children}) {

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
                        <TextField sx={{
                            margin: "1.4rem 0",
                            backgroundColor: "#EAEAEA"
                        }} label ='Email'>
                        </TextField>
                        <TextField sx={{
                            margin: "1.4rem 0",
                            backgroundColor: "#EAEAEA"
                        }} label='Password'></TextField>
                            <a style={{
                                borderBottom: "0.1rem solid #000",
                                margin: "3rem 0",
                                display:"inline-block",
                                padding:"0 0.4rem",
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
                    <Button className="Register-nav-button">Register</Button>
                </div>
            </div>
        </Container>
        
    )
};
export default Login;