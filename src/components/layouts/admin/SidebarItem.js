"use client";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, Stack } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ item, openItems, toggleItem, index }) {
  const pathName = usePathname();

  return (
    <>
      <div>
        <ToggleButton
          aria-label="list"
          className={`admin-layout-nav-button !justify-between ${
            item.path === pathName ?? "active"
          }`}
          onClick={() => toggleItem(index)}
          sx={{
            width: "100%",
            border: "none",

            justifyContent: "flex-start",
            padding: "1rem",
            paddingLeft: "5rem",
            backgroundColor: item.path === pathName ? "#38AC8F" : "",
            color: item.path === pathName ? "#fff" : "",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{
              textAlign: "start",
              fontSize: "1.5rem",
              alignItems: "center",
            }}
          >
            {item.icon}
            <span className="capitalize">{item.titile}</span>
          </Stack>
          {item.listItem ? (
            openItems[index] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </ToggleButton>
        {item.listItem ? (
          <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
            <ToggleButtonGroup
              sx={{ width: "100%", textAlign: "start" }}
              orientation="vertical"
              exclusive
            >
              {item.listItem.map((childItem, childIndex) => (
                <Link
                  key={childIndex}
                  href={childItem.path}
                  sx={{ width: "100%" }}
                >
                  <ToggleButton
                    aria-label="list"
                    className="admin-layout-nav-button-child"
                    sx={{
                      width: "100%",
                      border: "none",
                      justifyContent: "flex-start",
                      paddingLeft: "6rem",
                      color: childItem.path === pathName ? "#38AC8F" : "",
                    }}
                  >
                    <span style={{ textTransform: "none" }}>
                      {childItem.titile}
                    </span>
                  </ToggleButton>
                </Link>
              ))}
            </ToggleButtonGroup>
          </Collapse>
        ) : null}
      </div>
    </>
  );
}
