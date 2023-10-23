"use client";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { Container, Fab } from "@mui/material";
import { useEffect, useState } from "react";

export default function LayoutProducts({ children }) {
  const [showToTopButton, setShowToTopButton] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setShowToTopButton(true);
    } else {
      setShowToTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Container>
        <div>{children}</div>
      </Container>
      {showToTopButton && (
        <Fab className="to-top-button" onClick={scrollToTop}>
          <KeyboardDoubleArrowUpIcon></KeyboardDoubleArrowUpIcon>
        </Fab>
      )}
    </>
  );
}
