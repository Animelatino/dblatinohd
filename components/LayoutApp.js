import React, { PureComponent } from 'react';
import { Box } from "@chakra-ui/react";

import NavNavigation from './NavNavigation';
import DetectAdBlock from './DetectAdblock';

class LayoutApp extends PureComponent {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Box bg="gray.800" minH="100vh">
                <NavNavigation/>
                <DetectAdBlock/>
                {this.props.children}
            </Box>
        )
    }
}

export default LayoutApp