"use client";
import USER_GENDERS from "@/configs/config.users.genders";
import USER_ROLES from "@/configs/config.users.roles";
import USER_STATUSES from "@/configs/config.users.statuses";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";

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
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [changeDate, setChangeDate] = useState("");
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <>
      <div className="admin-header-title">
        <h1 className="admin-header-title-text">Thêm tài khoản</h1>
      </div>
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
                  fontWeight: "400",
                  width: "100%",
                  marginBottom: "2rem",
                }}
              >
                <div className="admin-users-add-title text-[1.5rem]">
                  {addusers.title}
                </div>
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
                  <TextField fullWidth id="fullWidth" />
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
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      onChange={handleChange}
                    >
                      {Object.entries(USER_STATUSES).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                          {key}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      onChange={handleChange}
                    >
                      {Object.entries(USER_GENDERS).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                          {key}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      onChange={handleChange}
                    >
                      {Object.entries(USER_ROLES).map(([key, value]) => (
                        <MenuItem key={key} value={value}>
                          {key}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                  <FormControl sx={{ width: "100%" }}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      key={"birthday"}
                    >
                      <DatePicker value={dayjs(changeDate)} />
                    </LocalizationProvider>
                  </FormControl>
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
