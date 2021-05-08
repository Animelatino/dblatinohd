import React, { Component} from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Text } from "@chakra-ui/react"

class DetectAdBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usingAdblock: false
        }
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            this.setState({ usingAdblock: this.fakeAdBanner.offsetHeight === 0});
        }
    }

    noticeContentJSX() {
        return (
            <Modal motionPreset="slideInBottom" isOpen={true}>
                <ModalOverlay />
                <ModalContent pb={5}>
                    <ModalHeader>Adblock Detectado</ModalHeader>
                    <ModalBody>
                        <Text>Nuestro sitio que gusta esta libre de anuncios, pero usamos una network para costear Hosting y Dominio.</Text>
                        <Text>Por tanto te agradeceriamos muchos que desactivaras tu bloqueador de anuncios, asi podremos seguir brindandote un buen servicio.</Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }

    render() {
        if (this.state.usingAdblock === true) {
            return this.noticeContentJSX();
        }
        return (
            <div ref={r => (this.fakeAdBanner = r)} style={{ height: '1px', width: '1px', visiblity: 'none', pointerEvents: 'none' }} className="exo-native-widget"/>
        );
    }
}

export default DetectAdBlock;