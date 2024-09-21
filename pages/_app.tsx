import type { AppProps } from 'next/app';
import NavLayout from "../app/components/navlayout";
import '../app/globals.css';
import Footer from "../app/components/footer";

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <>
        <NavLayout>
          <Component {...pageProps} />
        </NavLayout>
        <Footer/>
        </>
    );
  }

  export default MyApp;