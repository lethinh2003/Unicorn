"use client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import BackToTop from "./BackToTop";
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.palette.background.default};
  }

  ::-webkit-scrollbar-thumb {
  background-color:  ${({ theme }) => theme.palette.background.default};
  &:hover {
    background-color:  ${({ theme }) => theme.palette.background.default};
  }
} 
`;

const getDesignTokens = (mode) => ({
  components: {
    MuiButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          minWidth: "100px",
          padding: "6px 12px",
          textTransform: "uppercase",
          borderRadius: "0",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "1.7rem",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            opacity: 0.8,
          },
        }),
      },
    },
    MuiListItemButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
    MuiToggleButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
    },
  },
  typography: {
    fontSize: 21,
    fontFamily: ["Noto Sans", "Inter", "sans-serif"].join(","),
  },
  palette: {
    mode,
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: {
      ...(mode === "light"
        ? {
            main: "#38AC8F",
            contrastText: "#ffffff",
          }
        : {
            main: "#38AC8F",
            contrastText: "#ffffff",
          }),
    },
    text: {
      ...(mode === "light"
        ? {
            primary: "#000",
            secondary: "#9F9595",
          }
        : {
            primary: "#000",
            secondary: "#9F9595",
          }),
    },
    background: {
      ...(mode === "light"
        ? {
            default: "#fff",
          }
        : {
            default: "#fff",
          }),
    },
  },
});
const ThemeLayout = (props) => {
  const { options, children } = props;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = createTheme(getDesignTokens(isDarkMode ? "dark" : "light"));
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });
  return (
    <>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyle theme={theme} />

          {children}
          <BackToTop />
          <Toaster position="top-center" reverseOrder={false} />

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
          />
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};
export default ThemeLayout;
