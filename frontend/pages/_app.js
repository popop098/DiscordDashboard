import "../styles/globals.css";
import "@tremor/react/dist/esm/tremor.css";
import dynamic from "next/dynamic";
import { parseCookie } from "../tools/utils";
import NextProgress from "next-progress";
import Nav from "../components/Nav";
import App from "next/app";
const MyApp = ({ Component, pageProps, cookie }) => {
  console.log("cookie", cookie);
  return (
    <>
      <NextProgress options={{ showSpinner: false }} />
      <Nav token={cookie.token} />
      <Component {...pageProps} />
    </>
  );
};
MyApp.getInitialProps = async (appCtx) => {
  const appProps = await App.getInitialProps(appCtx);
  const parsed = parseCookie(appCtx.ctx.req);
  console.log("parsed", parsed);
  return {
    ...appProps,
    cookie: parsed,
  };
};
export default MyApp;
