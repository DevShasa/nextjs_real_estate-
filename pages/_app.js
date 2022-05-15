import { ChakraProvider } from "@chakra-ui/react";
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import HeaderFooterWrapper from "../components/HeaderFooterWrapper";

function MyApp({ Component, pageProps }) {

  NProgress.configure({ showSpinner: false})

  Router.events.on('routeChangeStart', ()=>{
    // Indicates when route has changed and loading begun
    NProgress.start();
  })

  Router.events.on("routeChangeComplete", ()=>{
    // Indicates when nextjs has finished loading the route 
    NProgress.done();
  })

  return (
    <>
      <Head>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' integrity='sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==' crossOrigin='anonymous' referrerPolicy='no-referrer' />
      </Head>
      <ChakraProvider>
          <HeaderFooterWrapper>
              <Component {...pageProps} />
          </HeaderFooterWrapper>
      </ChakraProvider>
    </>
  )
}

export default MyApp
