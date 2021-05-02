import React, { PureComponent } from 'react';
import VideoPlayer from '../../../components/VideoPlayer';

import { api } from '../../../lib/api';

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


export async function getServerSideProps(context) {
    const { id } = context.params;
    const res = await api.get(`stream/beta/${id}`);
    const file = res.data[0].file;
    console.log(file)
    return {
        props: {
            data: {
                file: file
            }
        }
    };
}

export default id