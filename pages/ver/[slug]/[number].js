import React, { PureComponent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Iframe from 'react-iframe';
import { motion } from 'framer-motion';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { api } from '../../../lib/api';
import { slugAnime, slugEpisode, getImage } from '../../../lib/urls';
import Layout from '../../../components/Layout';

import styles from '../../../styles/Episode.module.css';


class number extends PureComponent {

    constructor(props) {
        super(props);
        resetIdCounter();
    }

    render() {
        const { data } = this.props;
        return (
            <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
                <Layout>
                    <Head>
                        <title>{`Ver ${data?.anime?.name} Episodio ${data?.number} en Español Latino en HD Online • ${process.env.SITENAME}`}</title>
                        <meta name="description" content={`Anime ${data?.anime?.name} capitulo ${data?.number} Sub Español Latino, ver y descargar ${data?.anime?.name} capítulo ${data?.number} por mega y mediafire gratis en hd sin ninguna limitación`} />
                        <link rel="canonical" href={slugEpisode(data?.anime?.slug,data?.number)} />
                        <meta name="og:title" content={`Ver ${data?.anime?.name} Episodio ${data?.number} en Español Latino en HD Online • ${process.env.SITENAME}`} />
                        <meta name="og:description" content={`Anime ${data?.anime?.name} capitulo ${data?.number} Sub Español Latino, ver y descargar ${data?.anime?.name} capítulo ${data?.number} por mega y mediafire gratis en hd sin ninguna limitación`} />
                        <meta name="og:url" content={slugEpisode(data?.anime?.slug,data?.number)} />
                        <meta name="og:locale" content="es_LA" />
                        <meta name="og:type" content="video.episode" />
                        <meta name="og:image" content={getImage('w780',data?.image ? data?.image : data?.anime?.banner)} />
                        <meta property="og:image:width" content="552" />
                        <meta property="og:image:height" content="310" />
                        <meta itemProp="image" content={getImage('w780',data?.image ? data?.image : data?.anime?.banner)} />
                    </Head>
                    <div className={styles.title}>
                        <h2>{`${data?.anime?.name} Episodio ${data?.number}`}</h2>
                        <p>{data?.name}</p>
                    </div>
                    {Object.values(data?.players)?.length > 0 && (
                    <div className={styles.videoContainer}>
                        <Tabs>
                            <TabList>
                                {Object.values(data?.players)?.map((player,idx) => 
                                    Object.values(player)?.map((play,idx) => 
                                    <Tab>{`${play?.languaje == 0 ? 'Sub' : 'Lat'} - ${play?.server?.title}`}</Tab>
                                ))}
                            </TabList>
                            {Object.values(data?.players)?.map((player,idx) => 
                                Object.values(player)?.map((play,idx) => 
                                <TabPanel>
                                    <div className={styles.player}>
                                        <Iframe className={styles.iframe} url={`/stream/${play?.server?.title?.toLowerCase()}/${Buffer.from(play?.code).toString('base64')}`} width="auto" height="auto" display="initial" position="relative" frameBorder="0"/>
                                    </div>
                                </TabPanel>
                            ))}
                        </Tabs>
                    </div>
                    )}
                    <div className={styles.navCaps}>
                        <div className={styles.nav}>
                        {data?.anterior && (
                            <Link href={slugEpisode(data?.anime?.slug,data?.anterior?.number)}>
                                <a>
                                    <p className={styles.titleE}><b>{data?.anime?.name}</b> {`Episodio ${data?.anterior?.number}`}</p>
                                    <p className={styles.subTitleE}>{data?.anterior?.name}</p>
                                </a>
                            </Link>
                        )}
                        </div>
                        <div className={styles.navList}>
                            <Link href={slugAnime(data?.anime?.slug)}>
                                <p className={styles.list}>≡</p>
                            </Link>
                        </div>
                        <div className={styles.nav}>
                        {data?.siguiente && (
                            <Link href={slugEpisode(data?.anime?.slug,data?.siguiente?.number)}>
                                <a>
                                    <p className={styles.titleE}><b>{data?.anime?.name}</b> {`Episodio ${data?.siguiente?.number}`}</p>
                                    <p className={styles.subTitleE}>{data?.siguiente?.name}</p>
                                </a>
                            </Link>
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
        const { slug, number } = context.params;
        const res = await api.get(`episodes/${slug}/${number}`);
        Object.values(res.data.players).forEach((element) => {
            element.forEach((el) => {
                switch (el.server.title.toLowerCase()) {
                    case 'alpha':
                        el.position = 0;
                        break;
                    case 'beta':
                        el.position = 1;
                    break;
                    case 'degoo':
                        el.position = 3;
                        break;
                    default:
                        el.position = 99;
                        break;
                }
            })
            element.sort((a,b)=> (a.position > b.position ? 1 : -1))
        })
        return {
            props: { 
                data: res.data,
                params: context.params
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

export default number