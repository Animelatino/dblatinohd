import React, { PureComponent } from 'react';
import ReactPlayer from 'react-player';

import { AspectRatio } from "@chakra-ui/react";

class VideoPlayer extends PureComponent {

    constructor(props) {
        super(props);
    }
    
    render() {
        const { data } = this.props;
        return (
            <AspectRatio bg="black" ratio={16 / 9}>
                <ReactPlayer preload="metadata" url={data?.file} width='auto' height='auto' controls/>
            </AspectRatio>
        )
    }
}


export default VideoPlayer


