import React, { PureComponent } from 'react';
import Link from 'next/link';
import { menuItems } from '../helpers/Functions';

import styles from '../styles/NavNavigation.module.css';

class NavNavigation extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.menu}>
                    <Link href={'/'}>
                        <a className={`${styles.item} ${styles.logo}`}>{process?.env?.SITENAME}</a>
                    </Link>
                    {menuItems()?.map((item, i) => {
                        return (
                            <Link key={i} href={item?.link}>
                                <a alt={item?.name} className={styles.item}>
                                    <svg viewBox="0 0 24 24" className={styles.n} dangerouslySetInnerHTML={{ __html: item?.icon }}></svg>
                                    {item?.name}
                                </a>
                            </Link>
                        )})
                    }
                </div> 
            </div>
        )
    }
}

export default NavNavigation