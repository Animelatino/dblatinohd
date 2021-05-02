import React, { PureComponent } from 'react';
import VideoPlayer from '../../../components/VideoPlayer';

class id extends PureComponent {

    constructor(props) {
        super(props)
    }
    
    render() {
        const { data } = this.props;
        return (
            <VideoPlayer data={data} />
        )
    }
}


export function getServerSideProps(context) {
    const file = `https://siasky.net/${Buffer.from(context.params.id, 'base64').toString()}`;
    return {
        props: {
            data: {
                file: file
            }
        }
    };
}

export default id