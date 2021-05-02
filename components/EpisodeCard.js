import React, { PureComponent } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { slugEpisode, getImage } from '../lib/urls';

import styles from '../styles/EpisodeCard.module.css';

class EpisodeCard extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const { data, title, banner, slug } = this.props;
        return (
            <Link href={slugEpisode(slug ? slug : data?.anime?.slug, data?.number)}>
                <a className={styles.container}>
                    <Image className={styles.image} src={getImage('w300',data?.banner ? data?.banner : (banner ? banner : data?.anime?.banner))} alt={`${data?.anime?.name} Episodio ${data?.number} Español Latino HD`} width={"auto"} height={"auto"} quality={95} loading={"lazy"}/>
                    <div className={styles.info}>
                        <p className={styles.title}>{`${title ? title : data?.anime?.name} Episodio ${data?.number}`}</p>
                        <p className={styles.desc}>{data?.name}</p>
                    </div>
                </a>
            </Link>
        )
    }
}

export default EpisodeCard