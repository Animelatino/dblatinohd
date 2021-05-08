import { ColorModeScript } from "@chakra-ui/react";
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme from "../lib/theme";

import { GA_TRACKING_ID } from '../lib/ga';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    <link rel="icon" href="/favicon.ico"/>
                    <meta name="theme-color" content="#000000"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="robots" content="index, follow"/>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
                    <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TRACKING_ID}', {page_path: window.location.pathname,});`,}}/>
                    <script async src="https://arc.io/widget.min.js#5NgTk75z"></script>
                </Head>
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument