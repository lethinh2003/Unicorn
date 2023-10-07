import { Breadcrumbs,Link ,Typography} from '@mui/material';
import React from 'react';
export default function ProfileHeader(){
    return (
      <>
        <div className="redirect">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Trang chủ
            </Link>
            <Typography color="text.primary">Hồ sơ</Typography>
          </Breadcrumbs>
        </div>
        <div className="profile-page-header">
          <h1>Thông tin tài khoản</h1>
        </div>
      </>
    );
}