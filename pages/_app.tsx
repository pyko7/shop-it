import { useState } from "react";
// import type { AppProps } from "next/app";
import type { AppProps as NextAppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "../styles/theme";
import Layout from "../components/Layout";

// modified version - allows for custom pageProps type, falling back to 'any'
// created to solve dehydratedState type problem - solution here: https://stackoverflow.com/a/67464299
type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <Layout>
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
