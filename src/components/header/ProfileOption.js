import ROUTERS_PATH from "@/configs/config.routers.path";
import useAuth from "@/customHooks/useAuth";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Box, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

const settings = [
  {
    title: "Thông báo",
    link: ROUTERS_PATH.PROFILE_NOTIFICATION,
  },
  {
    title: "Thông tin tài khoản",
    link: ROUTERS_PATH.PROFILE,
  },
  {
    title: "Mã giảm giá",
    link: ROUTERS_PATH.PROFILE_VOUCHER,
  },
  {
    title: "Lịch sử đơn hàng",
    link: ROUTERS_PATH.PROFILE_ORDER,
  },
];

export default function BasicPopover() {
  const { isAuthenticated, session } = useAuth();

  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickProfileButton = () => {
    if (isAuthenticated) {
      // Redirect to profile page
      router.push(ROUTERS_PATH.PROFILE);
    } else {
      // Redirect to sign in page
      router.push(ROUTERS_PATH.SIGN_IN);
    }
  };
  return (
    <Box>
      {isAuthenticated ? (
        <Image
          onClick={handleOpenUserMenu}
          src="/icons8-user-48.png"
          alt="me"
          width="25"
          height="25"
          style={{
            border: "1px solid #ccc",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />
      ) : (
        <PersonOutlineOutlinedIcon
          onClick={handleClickProfileButton}
          sx={{
            fontSize: "2.5rem",
            cursor: "pointer",
          }}
        />
      )}

      {isAuthenticated && (
        <Menu
          sx={{
            mt: "45px",
            fontStyle: "normal",
            lineHeight: "normal",
            fontFamily: "Iner,sans-serif",
            minWidth: "20rem",
          }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            onClick={handleCloseUserMenu}
            sx={{
              borderBottom: "0.1rem solid var(--Border-Taupe-Color)",
            }}
          >
            <Typography
              className="three-dots"
              sx={{
                fontSize: "2rem",
                fontWeight: "600",

                width: "20rem",
              }}
            >
              Chào {session?.user.email}
            </Typography>
          </MenuItem>
          {settings.map((setting) => (
            <MenuItem
              key={setting.title}
              onClick={() => {
                router.push(setting.link);
                handleCloseUserMenu();
              }}
              sx={{}}
            >
              <Typography
                textAlign="center"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                }}
              >
                {setting.title}
              </Typography>
            </MenuItem>
          ))}
          <MenuItem
            sx={{
              borderTop: "0.1rem solid var(--Border-Taupe-Color)",
            }}
            onClick={() => {
              signOut();
              handleCloseUserMenu;
            }}
          >
            <Box
              textAlign="center"
              sx={{
                fontSize: "2rem",
                fontWeight: "600",
                display: "flex",
                flexDirection: "row",

                gap: "0.9rem",
              }}
            >
              <LogoutRoundedIcon
                sx={{
                  width: "3rem",
                  height: "3rem",
                }}
              />
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "600",
                }}
              >
                Đăng xuất
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
}
