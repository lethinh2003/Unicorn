"use client";
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useState } from "react";
import { Stack, Input, Button } from '@mui/material';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import HeaderTitle from '../../adminComponent/headerTitle';

const ADD_USERS = [
  {
    title: "Họ và tên",
  },
  {
    title: "Email",
  },
  {
    title: "Số điện thoại",
  },
];


export default function AddUsers() {
  const [addusers, setAddUsers] = useState(ADD_USERS);
  const [gender, setGender] = useState('');
  const [role, setRole] = useState('');



  const handleSetDefault = (index) => {
    const updatedAddUsers = addusers.map((addusers, i) => {
      return {
        ...addusers,
        isDefault: i === index,
      };
    });
    setAddUsers(updatedAddUsers);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };



  return (
    <>
      <HeaderTitle></HeaderTitle>
      <div className="admin-user-add">
        <div className="admin-user-add-form">
          <div className="admin-users-add-basicInformation">
            {addusers.map((addusers, index) => (
              <Stack
                key={index}
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight:"400",
                  width: "100%",
                  marginBottom: "2rem",
                }}
              >
                <div className="admin-users-add-title">{addusers.title}</div>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField fullWidth id="fullWidth" />
                </Box>
              </Stack>
            ))}
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
                  fontWeight:"400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title">Mật khẩu</div>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField fullWidth id="fullWidth" />
                </Box>
              </Stack>

              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight:"400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title">Trạng thái</div>
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <TextField fullWidth id="fullWidth" />
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
                  fontWeight:"400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title">Giới tính</div>
                <Box>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      onChange={handleChange}
                    >
                      <MenuItem value={"nam"}>Nam</MenuItem>
                      <MenuItem value={"nữ"}>Nữ</MenuItem>
                      <MenuItem value={"khác"}>Khác</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>

              <Stack
                className="input-col"
                sx={{
                  textAlign: "start",
                  fontSize: "2.6rem",
                  fontWeight:"400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title">Vai trò</div>
                <Box>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      onChange={handleChange}
                    ></Select>
                  </FormControl>
                </Box>
              </Stack>
            </Stack>

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
                  fontWeight:"400",
                  width: "100%",
                }}
              >
                <div className="admin-users-add-title">Ngày sinh</div>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { marginLeft: 0, width: "100%" },
                    width: "100%",
                    gap: "5rem",
                    display: "flex",
                    flexdirection: "row",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  
                  <TextField
                    id="outlined-basic"
                    label="Ngày"
                    variant="outlined"
                  />
                  <TextField id="filled-basic" label="Tháng" variant="outlined" />
                  <TextField id="filled-basic" label="Năm" variant="outlined" />
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
              >
                Hủy
              </Button>
              <Button variant="contained">Xác nhận</Button>
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
}
