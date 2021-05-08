import React, { PureComponent } from 'react';
import { Box, Image, Text, Link } from "@chakra-ui/react";

import { slugEpisode, getImage } from '../lib/urls';

class EpisodeCard extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const { data, title, banner, slug } = this.props;
        return (
            <Link _focus="none" href={slugEpisode((slug ? slug : data?.anime?.slug), data?.number)}>
                <Box bg="gray.900" rounded="lg" overflow="hidden">
                    <Image w="100%" src={getImage('w227_and_h127_bestv2',data?.banner ? data?.banner : (banner ? banner : data?.anime?.banner))} fallbackSrc="https://via.placeholder.com/227x127" />
                    <Box padding="0.5rem" textAlign="center">
                        <Text color="white">{`${title ? title : data?.anime?.name} Eps. ${data?.number}`}</Text>
                        <Text color="gray.400" noOfLines={2}>{data?.name}</Text>
                    </Box>
                </Box>
            </Link>
        )
    }
}

export default EpisodeCard