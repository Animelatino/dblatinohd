import React, { PureComponent } from 'react';
import Head from 'next/head';
import { Container, Grid, Box } from '@chakra-ui/layout';
import { Image, Text } from '@chakra-ui/react';

import { api } from '../../lib/api';
import { slugAnime, getImage } from '../../lib/urls';
import LayoutApp from '../../components/LayoutApp';
import EpisodeCard from '../../components/EpisodeCard';

class slug extends PureComponent {
    
    constructor(props) {
        super(props)

    }

    render() {
        const { data } = this.props;
        return (
            <LayoutApp>
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
                <Container paddingTop="2rem" paddingBottom="2rem" maxW="container.xl">
                    <Box display="flex" flexDirection={{ base: "column", md: "row" }} alignItems="center" justifyContent="space-between">
                        <Box textAlign="center" minW={{ base: '60px', md: '240px' }} rounded="lg" overflow="hidden">
                            <Image w="100%" src={getImage('w300',data?.poster)} fallbackSrc="https://via.placeholder.com/300x450" />
                            <Box textAlign="center" padding="1rem" bg={ data?.status == 0 ? 'red.500' : 'green.500' }>
                                <Text color="white" fontWeight="bold">{data?.status == 0? 'Finalizado' : 'En Emision'}</Text>
                            </Box>
                        </Box>
                        <Box paddingLeft="1rem" paddingRight="1rem">
                            <Text color="white" fontSize="3xl" fontWeight="bold" marginBottom="1rem">{data?.name}</Text>
                            <Text color="gray.400">{data?.overview}</Text>
                        </Box>
                    </Box>
                    <Box marginTop="1rem">
                        <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={6}>
                            {data?.episodes?.map((item,idx) => 
                                <Box key={idx}>
                                    <EpisodeCard data={item} title={data?.name} slug={data?.slug} banner={data?.banner} />
                                </Box> 
                            )}
                        </Grid>
                    </Box>
                </Container>
            </LayoutApp>
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
