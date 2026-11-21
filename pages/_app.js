import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/wolf-logo.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/wolf-logo.svg" />
        <meta name="theme-color" content="#1a1e24" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
