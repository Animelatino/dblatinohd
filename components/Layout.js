import React, { PureComponent } from 'react';
import { Head } from 'next/document';
import NavNavigation from './NavNavigation';

import styles from '../styles/Layout.module.css';


class Layout extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Head>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="robots" content="index, follow"/>
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
                    <script dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TRACKING_ID}', {page_path: window.location.pathname,});`,}}/>
                    <script id="chatBroEmbedCode" src="/js/chat.js"></script>
                </Head>
                <NavNavigation/>
                <div className={styles.container}>
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Layout