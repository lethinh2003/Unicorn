"use client";
import { BellIcon } from "@heroicons/react/24/outline";
import { Stack } from "@mui/material";
import Image from "next/image";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <>
      <div className="admin-layout-header  drop-shadow-md">
        <SearchBar />
        <Stack
          direction="row"
          spacing={3}
          className="admin-layout-account-notifi"
        >
          <BellIcon className="h-[2rem] w-[2rem]" />
          <Image alt="" src="/avatar.png" width={30} height={30} />
        </Stack>
      </div>
    </>
  );
};
export default Header;
