import React, { PureComponent } from 'react';

import NavNavigation from './NavNavigation';
import BottomNavigation from './BottomNavigation';
import DetectAdBlock from './DetectAdblock';

import styles from '../styles/Layout.module.css';


class Layout extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <NavNavigation/>
                <DetectAdBlock/>
                <div className={styles.container}>
                    {this.props.children}
                </div>
                <BottomNavigation/>
                <footer>
                    <script id="chatBroEmbedCode" src="/js/chat.js"></script>
                </footer>
            </>
        )
    }
}

export default Layout