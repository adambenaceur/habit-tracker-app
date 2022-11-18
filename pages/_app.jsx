// import type { AppProps } from "next/app";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
/* The following line can be included in a src/App.scss */

// import "~bootstrap/scss/bootstrap";

/* The following line can be included in your src/index.js or App.js file */

import "./../styles/custom.scss";
import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <>
      <Header />
      <Component {...pageProps} /> <Footer />
    </>
  );
}
