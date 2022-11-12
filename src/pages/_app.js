import Head from "next/head";
import "../styles/globals.css";
import "../styles/scrollbar.css";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import NextNProgress from "nextjs-progressbar";
import Router from "next/router";
import { RoleProvider } from "src/lib/RoleContext";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <NextNProgress />
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Proplast</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
            integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </Head>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <RoleProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </RoleProvider>
        {/* </LocalizationProvider> */}
      </CacheProvider>
    </>
  );
};

export default App;
