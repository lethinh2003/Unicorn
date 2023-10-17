import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Link} from '@mui/material'
// import { Image } from 'next/image';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const settings = ['Thông báo', 'Thông tin tài khoản', 'Mã giảm giá', 'Lịch sử mua hàng', 'Lịch sử đơn hàng'];

export default function BasicPopover() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <PersonOutlineOutlinedIcon/>
        </IconButton>

        <Menu
              sx={{ 
                mt: '45px', 
                fontStyle:'normal',
                lineHeight:'normal',
                fontFamily:'Iner,sans-serif',
                width:'35.6rem',
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}
                sx={{
                  borderBottom: "0.1rem solid var(--Border-Taupe-Color)"
                }}
              >
                  <Typography textAlign="center"
                    sx={{
                      fontSize:'3rem',
                      fontWeight:'600',
                    }}
                  >
                    Chào TeaMee
                    </Typography>
                </MenuItem>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}
                    sx={{}}
                  >
                    <Typography textAlign="center"
                      sx={{
                        fontSize:'2rem',
                        fontWeight:'400',
                      }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"
                    sx={{
                      fontSize:'2.5rem',
                      fontWeight:'600',
                      display:'flex',
                      flexDirection:'row',
                      paddingTop:'1.8rem',
                      borderTop: "0.1rem solid var(--Border-Taupe-Color)",
                      gap:'0.9rem',
                    }}
                  >
                    <LogoutRoundedIcon
                     sx={{
                      width:'3rem',
                      height:'3rem',
                     }}
                    />
                    <span>Đăng xuất</span>
                    
                  </Typography>
                </MenuItem>
            </Menu>      

</Box>
     
    );
}
