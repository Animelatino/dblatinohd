import React, { PureComponent } from 'react';

import NavNavigation from './NavNavigation';

import styles from '../styles/Layout.module.css';

class Layout extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <NavNavigation/>
                <div className={styles.container}>
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Layout