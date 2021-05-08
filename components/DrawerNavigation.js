import React, { PureComponent } from 'react';

import {
    Box,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Flex,
    Link,
    Text
} from "@chakra-ui/react";

import { menuItems } from '../helpers/Functions';


export const DrawerNavigation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Flex display={{ base: "block", md: "none" }}>
            <Button bg="white" onClick={onOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </Button>
            <Drawer placement={"left"} isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader/>
                <DrawerBody>
                {menuItems()?.map((item,idx) => 
                    <Link _focus="none" href={item.link}>
                        <Box padding="1rem" bg="gray.100" marginBottom="1rem" rounded="lg" key={idx}>
                            <Text>{item.name}</Text>
                        </Box>
                    </Link>
                )}
                </DrawerBody>
            </DrawerContent>
            </Drawer>
        </Flex>
    )
  }



export default DrawerNavigation