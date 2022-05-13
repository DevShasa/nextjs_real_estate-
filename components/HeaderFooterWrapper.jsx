import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Navbar from "./Navbar";

const Layout = ({ children }) =>{
    return(
        <>
            <Head>
                <title>Real Estate</title>
            </Head>
            {/* center content using the double box pattern */}
            <Box maxWidth="1280px" m="auto">
                <header>
                    <Navbar />
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    Footer
                </footer>
            </Box>
        </>
    )
}

export default Layout