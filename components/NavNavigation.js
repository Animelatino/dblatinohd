import React, { PureComponent } from 'react';
import { Box, Heading, Flex, Text, Link } from "@chakra-ui/react";

import { menuItems } from '../helpers/Functions';
import DrawerNavigation from './DrawerNavigation';

class NavNavigation extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    handleToggle = () => {
        this.setState({ show: !this.state.show });
    };

    render() {
        const { show } = this.state;
        return (
            <Flex display="flex" as="nav" align="center" justify="space-between" wrap="wrap" padding="1rem" bg="gray.900" color="white" {...this.props}>
                <DrawerNavigation/>
                <Flex align="center" mr={5}>
                    <Heading color="white" as="h1" size="lg" letterSpacing={"-.1rem"}>
                        <Link _hover="none" _focus="none" href="/">
                            {process.env.SITENAME}
                        </Link>
                    </Heading>
                </Flex>
                <Box display={{ base: "none", md: "flex" }} width={{ sm: "full", md: "auto" }} alignItems="center" flexGrow={1}>
                    {menuItems()?.map((item,idx) => 
                        <Link _hover="none" _focus="none" marginRight="1.5rem" key={idx} href={item.link}>{item.name}</Link>
                    )}
                </Box>
            </Flex>
        )
    }
}

export default NavNavigation