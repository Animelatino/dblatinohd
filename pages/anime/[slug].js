import React, { PureComponent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { api } from '../../lib/api';
import { slugAnime, getImage } from '../../lib/urls';
import Layout from '../../components/Layout';
import EpisodeCard from '../../components/EpisodeCard';


import styles from '../../styles/Anime.module.css';

class slug extends PureComponent {
    
    constructor(props) {
        super(props)

    }

    render() {
        const { data } = this.props;
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
                <Layout>
                    <Head>
                        <title>{`Ver ${data?.name} Español Latino en HD Online • ${process.env.SITENAME}`}</title>
                        <meta name="description" content={`Ver y descargar todos los capitulos de ${data?.name} en español latino, por mega y mediafire sin restricciones en HD. Ver ${data?.name} sub español latino online.`} />
                        <link rel="canonical" href={slugAnime(data?.slug)} />
                        <meta name="og:title" content={`Ver ${data?.name} Español Latino en HD Online • ${process.env.SITENAME}`} />
                        <meta name="og:description" content={`Ver y descargar todos los capitulos de ${data?.name} en español latino, por mega y mediafire sin restricciones en HD. Ver ${data?.name} sub español latino online.`} />
                        <meta name="og:url" content={slugAnime(data?.slug)} />
                        <meta name="og:locale" content="es_LA" />
                        <meta name="og:type" content="website" />
                        <meta name="og:image" content={getImage('w780',data?.banner)} />
                        <meta property="og:image:width" content="640" />
                        <meta property="og:image:height" content="360" />
                        <meta itemProp="image" content={getImage('w780',data?.banner)} />
                    </Head>
                    <div className={styles.infoAnime}>
                        <div className={styles.posterAnime}>
                            <Image className={styles.image} src={getImage('w300',data?.poster)} width={"auto"} height={"auto"} quality={95} loading={"lazy"}/>
                            <div className={`${styles.statusAnime} ${data?.status == 0 ? styles.fin : styles.emi}`}>{data?.status == 0? 'Finalizado' : 'En Emision'}</div>
                        </div>
                        <div className={styles.detailAnime}>
                            <h2 className={styles.title}>{data?.name}</h2>
                            <p>{data?.overview}</p>
                        </div>
                    </div>
                    <div className={styles.contentAnime}>
                        <div className={styles.lepisodes}>
                            {data?.episodes?.map((item,idx) => 
                                <EpisodeCard data={item} title={data?.name} banner={data?.banner} slug={data?.slug} key={idx}/>
                            )}
                        </div>
                    </div>
                </Layout>
            </motion.div>
        )
    }
}

export async function getServerSideProps(context) {
    try {
        const { slug } = context.params;
        const res = await api.get(`anime/${slug}`);
        return {
            props: {
                data: res.data
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

export default slug
