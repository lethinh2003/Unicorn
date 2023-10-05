"use client";
import { Container, TextField, Button} from "@mui/material";
import Link from "next/link";
import {InputAdornment} from "@mui/material/";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function ForgotPass() {
  return (
    <Container>
      <div className="login-container">
        <div className="login-left-panel">
          <div className="login-left-panel-header">
            <span className="login-title">Forgot Password </span>
            <span className="login-solution">Enter email to retrieve your password</span>
          </div>
          <form
            className="login-left-panel-body"
          >
            <TextField
            title="Email"
            label="Email"
            style={{
              marginBottom:"2.7rem",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="outlined" color="primary" margin="0">
                    SEND OTP
                  </Button>
                </InputAdornment>
              ),
            }}
            
            >   
                
            </TextField>

            <TextField 
            title="OPT"
            label="OPT"
            style={{
              marginBottom:"6.6rem",
            }}/>

            <Button
              type="submit"
              sx={{
                position: "relative",
                transform: "translateX(-50%)",
                left: "50%",
                padding: " 1.4rem 4rem",
              }}
              className="login-button"
              >
              CONTINUE 
            </Button>

            <a
              style={{
                margin: "4rem 0",
                display: "inline-block",
                padding: "0 0.4rem",
                width: "34.9rem",
                position: "relative",
                transform: "translateX(-50%)",
                left: "50%",
              }}
            >
              <Link href='/'>
                
              Do not have account? Sign up 
                
              </Link>
            </a>
          </form>
        </div>
      </div>
    </Container>
  );
}
export default ForgotPass;
