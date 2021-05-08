import React, { PureComponent } from 'react';
import Head from 'next/head';
import { Container, Grid, Box } from '@chakra-ui/layout';

import { api } from '../lib/api';
import EpisodeCard from '../components/EpisodeCard';
import LayoutApp from '../components/LayoutApp';

class Index extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const { data } = this.props;
        return (
            <LayoutApp>
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
                <Container overflow="hidden" paddingTop="2rem" paddingBottom="2rem" maxW="container.xl">
                    <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }} gap={6}>
                        {data?.map((item,idx) => 
                            <Box key={idx}>
                                <EpisodeCard data={item} />
                            </Box> 
                        )}
                    </Grid>
                </Container>
            </LayoutApp>
        )
    }
}

export async function getStaticProps() {
    const releases_json = await api.get(`releases`);
    const more_view_json = await api.get(`anime/more-view`);
    return {
        props: {
            data: releases_json.data,
            more_view: more_view_json.data.being_watched
        },
        revalidate: 1
    }
}

export default Index