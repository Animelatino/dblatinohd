import React, { PureComponent } from 'react';
import Head from 'next/head';
import { api } from '../lib/api';
import { motion } from 'framer-motion';

import EpisodeCard from '../components/EpisodeCard';
import Layout from '../components/Layout';

import styles from '../styles/Home.module.css';

class Index extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const { data } = this.props;
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Layout>
                    <Head>
                        <title>{`Ver Dragon Ball Super Online en Español Latino HD Gratis • ${process.env.SITENAME}`}</title>
                        <meta name="description" content={`Aquí podrás encontrar todos los capitulos de dragon ball, z, kai, super, gt en Español latino Gratis, mira los últimos capitulos de los dragon ball heroes sin ninguna restriccion subtitulado al español latino en ${process.env.SITENAME}`} />
                        <link rel="canonical" href={`${process.env.URL}`} />
                        <meta name="og:title" content={`Ver Dragon Ball Super Online en Español Latino HD Gratis • ${process.env.SITENAME}`} />
                        <meta name="og:description" content={`Aquí podrás encontrar todos los capitulos de dragon ball, z, kai, super, gt en Español latino Gratis, mira los últimos capitulos de los dragon ball heroes sin ninguna restriccion subtitulado al español latino en ${process.env.SITENAME}`} />
                        <meta name="og:url" content={`${process.env.URL}`} />
                        <meta name="og:locale" content="es_LA" />
                        <meta name="og:type" content="website" />
                        <meta name="og:image" content="https://i.imgur.com/9aJdJH5.jpg" />
                        <meta property="og:image:width" content="640" />
                        <meta property="og:image:height" content="360" />
                        <meta itemProp="image" content="https://i.imgur.com/9aJdJH5.jpg" />
                    </Head>
                    <main className={styles.main}>
                        <h2 className={styles.title}>Episodios recientes</h2>
                        <div className={styles.lepisodes}>
                            {data?.map((item,idx) => 
                                <EpisodeCard data={item} key={idx}/>
                            )}
                        </div>
                    </main>
                </Layout>
            </motion.div>
        )
    }
}

export async function getStaticProps() {
    const res = await api.get(`releases`);
    return {
        props: {
            data: res.data
        },
        revalidate: 1
    }
}

export default Index