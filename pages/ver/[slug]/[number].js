import React, { PureComponent } from 'react';
import Head from 'next/head';
import { api } from '../../../lib/api';
import { slugAnime, slugEpisode, getImage } from '../../../lib/urls';
import LayoutApp from '../../../components/LayoutApp';

import { Container, Box, Text } from '@chakra-ui/layout';
import { Tabs, TabList, TabPanels, Tab, TabPanel, AspectRatio, Link  } from "@chakra-ui/react";


class number extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <LayoutApp>
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
                <Container paddingTop="2rem" paddingBottom="2rem" maxW="container.xl">
                    <Box textAlign="center">
                        <Text fontSize="2xl" marginBottom="0.5rem" color="white" textTransform="uppercase" fontWeight="bold">{`${data?.anime?.name} Episodio ${data?.number}`}</Text>
                        <Text fontSize="md" color="gray.400">{data?.name}</Text>
                    </Box>
                    {Object.values(data?.players)?.length > 0 && (
                    <Box marginTop="1rem">
                        <Tabs isFitted variant="enclosed">
                            <TabList>
                                {Object.values(data?.players)?.map((player,idx) => 
                                    Object.values(player)?.map((play,idx) => 
                                    <Tab rounded="none" _focus="none" color="gray.400" _selected={{ color: "white", bg: "gray.900" }}>{`${play?.languaje == 0 ? 'Sub' : 'Lat'} - ${play?.server?.title}`}</Tab>
                                ))}
                            </TabList>
                            <TabPanels>
                            {Object.values(data?.players)?.map((player,idx) => 
                                Object.values(player)?.map((play,idx) => 
                                <TabPanel padding="0" bg="gray.900">
                                    <AspectRatio ratio={16/9}>
                                        <iframe src={`/stream/${play?.server?.title?.toLowerCase()}/${Buffer.from(play?.code).toString('base64')}`} allowFullScreen />
                                    </AspectRatio>
                                </TabPanel>
                            ))}
                            </TabPanels>
                        </Tabs>
                    </Box>
                    )}
                    <Box bg="gray.900" padding="1rem" rounded="md" marginTop="1rem" display="flex" alignItems="center" justifyContent="space-between">
                        <Box maxW="30%">
                        {data?.anterior && (
                            <Link _focus="none" href={slugEpisode(data?.anime?.slug,data?.anterior?.number)}>
                                <Text color="white">{'< Anterior'}</Text>
                            </Link>
                        )}
                        </Box>
                        <Box maxW="30%">
                        <Link _focus="none" href={slugAnime(data?.anime?.slug)}>
                            <Text color="white" fontWeight="bold">{'Lista'}</Text>
                        </Link>
                        </Box>
                        <Box maxW="30%">
                        {data?.siguiente && (
                            <Link _focus="none" href={slugEpisode(data?.anime?.slug,data?.siguiente?.number)}>
                                <Text color="white">{'Siguiente >'}</Text>
                            </Link>
                        )}
                        </Box>
                    </Box>
                </Container>
            </LayoutApp>
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
                data: res.data
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}

export default number